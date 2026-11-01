import { estimateLineHeight, UNSET, type LineRecord, type LyricsVariant } from "@/ui/lyrics/render";

const MOUNT_OVERSCAN_PX = 700;
const KEEP_OVERSCAN_PX = 1500;
const ANCHOR_RADIUS = 3;
const REMEASURE_EPSILON = 0.5;
const SCALE_EPSILON = 0.06;

const WARMUP_BATCH = 6;
const WARMUP_SCROLL_QUIET_MS = 150;
const WARMUP_MAX_DEFER_MS = 500;
const WARMUP_MAX_SWEEPS = 3;

export type VirtualizerOptions = {
  container: HTMLElement;
  scroller: HTMLElement;
  records: LineRecord[];
  variant: LyricsVariant;
  rowGapPx: number;
  onMount: (record: LineRecord) => void;
  onLayoutChanged: () => void;
};

export class Virtualizer {
  readonly space: HTMLElement;

  private readonly options: VirtualizerOptions;
  private readonly records: LineRecord[];
  private readonly base: Float64Array;
  private readonly heights: Float64Array;
  private readonly offsets: Float64Array;
  private readonly measured: Uint8Array;
  private readonly counted: Uint8Array;
  private readonly mounted = new Set<number>();
  private readonly rowObserver: ResizeObserver;
  private readonly viewportObserver: ResizeObserver;
  private readonly spaceObserver: ResizeObserver;
  private readonly indexByElement = new Map<Element, number>();

  private scale = 1;
  private measuredSum = 0;
  private measuredBase = 0;
  private anchor = 0;
  private totalHeight = 0;
  private layoutDirty = false;
  private windowDirty = false;
  private frame = 0;
  private destroyed = false;

  private scrollTop = 0;
  private viewportHeight = 0;
  private spaceTop = 0;

  private warmupCursor = 0;
  private warmupSweeps = 0;
  private warmupHandle = 0;
  private warmupIsIdle = false;
  private warmupDeferredSince = 0;
  private warmupStarved = false;
  private lastScrollAt = 0;
  private settled = false;
  private readonly remeasureQueue = new Set<number>();
  private remeasureFrame = 0;

  constructor(options: VirtualizerOptions) {
    this.options = options;
    this.records = options.records;

    const count = this.records.length;
    this.base = new Float64Array(count);
    this.heights = new Float64Array(count);
    this.offsets = new Float64Array(count);
    this.measured = new Uint8Array(count);
    this.counted = new Uint8Array(count);

    this.space = document.createElement("div");
    this.space.className = "ll-syllable-virtual-space";

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < count; index++) {
      const record = this.records[index];
      const wrapper = document.createElement("div");
      wrapper.className = "ll-syllable-virtual-row";
      wrapper.style.contentVisibility = "hidden";
      wrapper.appendChild(record.el);
      record.wrapper = wrapper;
      record.rowOffset = UNSET;
      fragment.appendChild(wrapper);

      const estimate = estimateLineHeight(record, options.variant);
      this.base[index] = estimate;
      this.heights[index] = estimate;
      this.indexByElement.set(record.el, index);
    }
    this.space.appendChild(fragment);

    this.rowObserver = new ResizeObserver(this.onRowResize);
    this.viewportObserver = new ResizeObserver(this.onViewportResize);
    this.spaceObserver = new ResizeObserver(this.onSpaceResize);

    options.container.appendChild(this.space);
    options.container.classList.add("ll-syllable-virtualized");
    this.viewportObserver.observe(options.scroller);
    this.spaceObserver.observe(this.space);
    options.scroller.addEventListener("scroll", this.onScroll, { passive: true });

    this.scrollTop = options.scroller.scrollTop;
    this.viewportHeight = options.scroller.clientHeight;
    this.spaceTop = this.space.offsetTop;
    this.recomputeOffsets();
    this.scheduleWindow();
    this.scheduleWarmup();
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.remeasureFrame) cancelAnimationFrame(this.remeasureFrame);
    this.remeasureFrame = 0;
    this.remeasureQueue.clear();
    this.cancelWarmup();
    this.options.scroller.removeEventListener("scroll", this.onScroll);
    this.rowObserver.disconnect();
    this.viewportObserver.disconnect();
    this.spaceObserver.disconnect();
    this.options.container.classList.remove("ll-syllable-virtualized");
    this.mounted.clear();
    this.indexByElement.clear();
  }

  topOf(index: number): number {
    return this.spaceTop + (this.offsets[index] ?? 0);
  }

  heightOf(index: number): number {
    return this.heights[index] ?? 0;
  }

  rangeNear(scrollTop: number, margin: number): { first: number; last: number } | null {
    const count = this.records.length;
    if (count === 0) return null;
    const viewTop = scrollTop - this.spaceTop;
    const bottom = viewTop + this.viewportHeight + margin;
    const first = this.indexAt(viewTop - margin);
    let last = first;
    while (last + 1 < count && this.offsets[last + 1] <= bottom) last++;
    return { first, last };
  }

  spanOf(index: number): number {
    const height = this.heights[index] ?? 0;
    return height + rowSpacing(height, this.options.rowGapPx);
  }

  isMounted(index: number): boolean {
    return this.mounted.has(index);
  }

  forEachMounted(visit: (record: LineRecord) => void) {
    for (const index of this.mounted) visit(this.records[index]);
  }

  setAnchor(index: number) {
    this.anchor = index;
    if (index < 0) return;

    const from = Math.max(0, index - 1);
    const to = Math.min(this.records.length - 1, index + 1);
    let changed = false;
    for (let near = from; near <= to; near++) changed = this.mount(near) || changed;
    if (changed) this.layoutRows();
    this.scheduleWindow();
  }

  invalidate(index: number) {
    const estimate = estimateLineHeight(this.records[index], this.options.variant);

    if (this.mounted.has(index)) {
      this.base[index] = estimate;
      if (this.settled) this.queueRemeasure(index);
      return;
    }

    if (this.measured[index]) {
      if (this.counted[index]) {
        this.measuredSum -= this.heights[index];
        this.measuredBase -= this.base[index];
        this.counted[index] = 0;
      }
      this.measured[index] = 0;
    }
    this.base[index] = estimate;
    if (index < this.warmupCursor) this.warmupCursor = index;
    this.scheduleWarmup();
    this.setHeight(index, estimate * this.scale);
  }

  private queueRemeasure(index: number) {
    this.remeasureQueue.add(index);
    if (this.remeasureFrame || this.destroyed) return;
    this.remeasureFrame = requestAnimationFrame(this.flushRemeasure);
  }

  private flushRemeasure = () => {
    this.remeasureFrame = 0;
    if (this.destroyed || this.remeasureQueue.size === 0) return;

    if (this.options.scroller.clientHeight === 0) {
      this.remeasureFrame = requestAnimationFrame(this.flushRemeasure);
      return;
    }

    const pending = Array.from(this.remeasureQueue);
    this.remeasureQueue.clear();
    const heights = pending.map((index) => this.records[index].el.offsetHeight);
    for (let i = 0; i < pending.length; i++) {
      if (heights[i] > 0) this.recordMeasurement(pending[i], heights[i]);
    }
  };

private mount(index: number): boolean {
    const record = this.records[index];
    if (!record?.wrapper || this.mounted.has(index)) return false;

    this.mounted.add(index);
    record.rowOffset = UNSET;
    record.wrapper.style.contentVisibility = "";
    this.options.onMount(record);
    this.rowObserver.observe(record.el);
    return true;
  }

  private unmount(index: number) {
    const record = this.records[index];
    if (!record?.wrapper || !this.mounted.has(index)) return;

    this.rowObserver.unobserve(record.el);
    record.wrapper.style.contentVisibility = "hidden";
    this.mounted.delete(index);
  }

private onScroll = () => {
    this.scrollTop = this.options.scroller.scrollTop;
    this.lastScrollAt = performance.now();
    if (!this.settled) this.scheduleWindow();
  };

  private onViewportResize = () => {
    this.viewportHeight = this.options.scroller.clientHeight;
    this.spaceTop = this.space.offsetTop;
    this.scheduleWindow();
  };

  private onSpaceResize = () => {
    const top = this.space.offsetTop;
    if (top === this.spaceTop) return;
    this.spaceTop = top;
    this.scheduleWindow();
  };

  private scheduleWindow() {
    this.windowDirty = true;
    this.schedule();
  }

  private schedule() {
    if (this.frame || this.destroyed) return;
    this.frame = requestAnimationFrame(this.flush);
  }

  private flush = () => {
    this.frame = 0;
    if (this.destroyed) return;

    const layoutMoved = this.layoutDirty;
    if (layoutMoved) {
      this.layoutDirty = false;
      this.recomputeOffsets();
    }
    if (this.windowDirty || layoutMoved) {
      this.windowDirty = false;
      this.updateWindow();
    }
    if (layoutMoved) this.options.onLayoutChanged();
  };

  private updateWindow() {
    const count = this.records.length;
    if (count === 0 || this.settled) return;

    const viewTop = this.scrollTop - this.spaceTop;
    const viewBottom = viewTop + this.viewportHeight;

    const first = this.indexAt(viewTop - MOUNT_OVERSCAN_PX);
    let last = first;
    const mountBottom = viewBottom + MOUNT_OVERSCAN_PX;
    while (last + 1 < count && this.offsets[last + 1] <= mountBottom) last++;

    const anchorFrom = this.anchor >= 0 ? Math.max(0, this.anchor - ANCHOR_RADIUS) : -1;
    const anchorTo = this.anchor >= 0 ? Math.min(count - 1, this.anchor + ANCHOR_RADIUS) : -1;

    const keepTop = viewTop - KEEP_OVERSCAN_PX;
    const keepBottom = viewBottom + KEEP_OVERSCAN_PX;
    for (const index of this.mounted) {
      const rowTop = this.offsets[index];
      if (rowTop + this.heights[index] >= keepTop && rowTop <= keepBottom) continue;
      if (anchorFrom >= 0 && index >= anchorFrom && index <= anchorTo) continue;
      this.unmount(index);
    }

    let changed = false;
    for (let index = first; index <= last; index++) changed = this.mount(index) || changed;
    if (anchorFrom >= 0) {
      for (let index = anchorFrom; index <= anchorTo; index++) changed = this.mount(index) || changed;
    }

    this.layoutRows();
    if (changed) this.options.onLayoutChanged();
  }

  private indexAt(y: number): number {
    const offsets = this.offsets;
    let low = 0;
    let high = this.records.length - 1;
    let found = Math.max(0, high);

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (offsets[mid] + this.heights[mid] >= y) {
        found = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return found;
  }

  private layoutRows() {
    for (const index of this.mounted) {
      const record = this.records[index];
      if (!record?.wrapper) continue;
      const offset = Math.round(this.offsets[index]);
      if (offset === record.rowOffset) continue;
      record.rowOffset = offset;
      record.wrapper.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  }

private scheduleWarmup() {
    if (this.warmupHandle || this.destroyed) return;
    if (this.warmupCursor >= this.records.length) return;

    const idle = (window as { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback;
    if (typeof idle === "function" && !this.warmupStarved) {
      this.warmupIsIdle = true;
      this.warmupHandle = idle(this.warmup, { timeout: 500 });
    } else {
      this.warmupIsIdle = false;
      this.warmupHandle = window.setTimeout(this.warmup, 60);
    }
  }

  private everyRowMeasured(): boolean {
    for (let index = 0; index < this.records.length; index++) {
      if (!this.measured[index]) return false;
    }
    return true;
  }

  private cancelWarmup() {
    if (!this.warmupHandle) return;
    const cancelIdle = (window as { cancelIdleCallback?: typeof cancelIdleCallback }).cancelIdleCallback;
    if (this.warmupIsIdle && typeof cancelIdle === "function") cancelIdle(this.warmupHandle);
    else clearTimeout(this.warmupHandle);
    this.warmupHandle = 0;
  }

  private warmup = (deadline?: IdleDeadline) => {
    this.warmupHandle = 0;
    if (this.destroyed) return;

    const now = performance.now();
    if (this.options.scroller.clientHeight === 0) {
      this.scheduleWarmup();
      return;
    }

    const scrolling = now - this.lastScrollAt < WARMUP_SCROLL_QUIET_MS;
    if (scrolling && !this.warmupStarved) {
      if (this.warmupDeferredSince === 0) this.warmupDeferredSince = now;
      else if (now - this.warmupDeferredSince >= WARMUP_MAX_DEFER_MS) this.warmupStarved = true;

      if (!this.warmupStarved) {
        this.scheduleWarmup();
        return;
      }
    }
    if (!scrolling) this.warmupDeferredSince = 0;

    const budget = deadline?.timeRemaining() ?? 16;
    if (budget < 3) {
      this.scheduleWarmup();
      return;
    }
    const size = scrolling ? 2 : budget >= 8 ? WARMUP_BATCH : 2;

    const count = this.records.length;
    const batch: LineRecord[] = [];
    while (batch.length < size && this.warmupCursor < count) {
      const index = this.warmupCursor++;
      if (this.measured[index]) continue;
      if (this.records[index].wrapper) batch.push(this.records[index]);
    }

    if (batch.length > 0) {
      for (const record of batch) {
        const offset = Math.round(this.offsets[record.index]);
        record.rowOffset = offset;
        record.wrapper!.style.transform = `translate3d(0, ${offset}px, 0)`;
        record.wrapper!.style.contentVisibility = "";
      }
      for (const record of batch) this.recordMeasurement(record.index, record.el.offsetHeight);
      for (const record of batch) {
        const hidden = !this.settled && !this.mounted.has(record.index);
        record.wrapper!.style.contentVisibility = hidden ? "hidden" : "";
      }
    }

    if (this.warmupCursor >= count) {
      if (this.everyRowMeasured() || ++this.warmupSweeps >= WARMUP_MAX_SWEEPS) this.settle();
      else this.warmupCursor = 0;
    }
    this.scheduleWarmup();
  };

  private settle() {
    if (this.settled) return;
    this.settled = true;
    this.rowObserver.disconnect();

    for (const record of this.records) {
      if (!record.wrapper) continue;
      record.wrapper.style.contentVisibility = "";
      if (record.line.kind === "interlude") this.rowObserver.observe(record.el);
      if (this.mounted.has(record.index)) continue;
      this.mounted.add(record.index);
      this.options.onMount(record);
    }

    this.layoutRows();
    this.options.onLayoutChanged();
  }

private onRowResize = (entries: ResizeObserverEntry[]) => {
    if (this.options.scroller.clientHeight === 0) return;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const index = this.indexByElement.get(entry.target);
      if (index === undefined || !this.mounted.has(index)) continue;

      const box = entry.borderBoxSize?.[0];
      const height = Math.max(0, Math.round(box ? box.blockSize : (entry.target as HTMLElement).offsetHeight));
      if (this.settled && height === 0 && this.records[index].line.kind !== "interlude") continue;
      this.recordMeasurement(index, height);
    }
  };

  private recordMeasurement(index: number, height: number) {
    const wasMeasured = this.measured[index] === 1;
    if (wasMeasured && Math.abs(this.heights[index] - height) < REMEASURE_EPSILON) return;

    const shouldCount = height > 0 && this.records[index].line.kind !== "interlude";
    const wasCounted = this.counted[index] === 1;
    if (wasCounted && !shouldCount) {
      this.measuredSum -= this.heights[index];
      this.measuredBase -= this.base[index];
      this.counted[index] = 0;
    } else if (shouldCount) {
      if (wasCounted) {
        this.measuredSum += height - this.heights[index];
      } else {
        this.measuredSum += height;
        this.measuredBase += this.base[index];
        this.counted[index] = 1;
      }
    }

    this.measured[index] = 1;
    this.heights[index] = height;
    this.layoutDirty = true;
    this.schedule();
    if (shouldCount) this.updateScale();
  }

  private updateScale() {
    if (this.measuredBase <= 0) return;
    const next = clamp(this.measuredSum / this.measuredBase, 0.35, 4);
    if (Math.abs(next - this.scale) / this.scale < SCALE_EPSILON) return;

    this.scale = next;
    for (let index = 0; index < this.records.length; index++) {
      if (this.measured[index]) continue;
      this.heights[index] = Math.round(this.base[index] * next);
    }
    this.layoutDirty = true;
    this.schedule();
  }

  private setHeight(index: number, height: number) {
    const next = Math.max(0, Math.round(height));
    if (Math.abs(this.heights[index] - next) < REMEASURE_EPSILON) return;
    this.heights[index] = next;
    this.layoutDirty = true;
    this.schedule();
  }

  private recomputeOffsets() {
    const gap = this.options.rowGapPx;
    let offset = 0;
    let end = 0;
    for (let index = 0; index < this.records.length; index++) {
      this.offsets[index] = offset;
      const height = this.heights[index];
      if (height <= 0) continue;
      end = offset + height;
      offset = end + rowSpacing(height, gap);
    }

    const total = Math.max(1, end);
    if (total !== this.totalHeight) {
      this.totalHeight = total;
      this.space.style.height = `${total}px`;
    }

    this.layoutRows();
  }
}

function rowSpacing(height: number, gap: number): number {
  return Math.min(gap, Math.max(0, height));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
