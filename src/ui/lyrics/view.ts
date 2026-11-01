import type { Lyrics } from "@/lib/api/types";
import { detectRomanizationLanguage } from "@/lib/romanization/detect";
import { prepareChinese } from "@/lib/romanization/engine";
import type { RomanizationLanguage, RomanizationTarget } from "@/lib/romanization/modes";
import { buildLyricLines, getLyricsCredits } from "@/ui/lyrics/model";
import { subscribeClock } from "@/ui/lyrics/clock";
import { getPlayerProgress, seekTo } from "@/ui/lyrics/playback";
import { SmoothScroller } from "@/ui/lyrics/smoothScroll";
import { AutoScroller, INTERLUDE_CLOSE_MS, type LineMetrics } from "@/ui/lyrics/autoScroll";
import { Animator } from "@/ui/lyrics/animator";
import { LineDrag } from "@/ui/lyrics/lineDrag";
import { Romanizer } from "@/ui/lyrics/romanizer";
import { Translator } from "@/ui/lyrics/translator";
import { Timeline } from "@/ui/lyrics/timeline";
import { Virtualizer } from "@/ui/lyrics/virtualizer";
import { createCreditsElement, createLineRecord, type LineRecord, type LyricsVariant } from "@/ui/lyrics/render";
import { getSettings, SETTINGS_EVENT } from "@/lib/settings";

const ROW_GAP_PX = 8;

export type LyricsViewOptions = {
  container: HTMLElement;
  scroller?: HTMLElement;
  variant: LyricsVariant;
  virtualize?: boolean;
  onRomanizationAvailability?: (hasRomanization: boolean) => void;
};

export class LyricsView {
  readonly container: HTMLElement;
  readonly scroller: HTMLElement;

  private readonly options: LyricsViewOptions;
  private readonly variant: LyricsVariant;
  private readonly smooth: SmoothScroller;
  private readonly autoScroll: AutoScroller;
  private readonly drag: LineDrag;
  private readonly detachDragFrame: () => void;
  private readonly animator: Animator;
  private readonly romanizer: Romanizer;
  private readonly translator: Translator;
  private translating = false;
  private translationLayout = "";

  private records: LineRecord[] = [];
  private recordByEl = new Map<HTMLElement, LineRecord>();
  private timeline = new Timeline([]);
  private virtual: Virtualizer | null = null;
  private unsubscribeClock: (() => void) | null = null;
  private enabled = false;
  private generation = 0;
  private hasRomanizationValue = false;
  private songLanguage: RomanizationLanguage | null = null;

  constructor(options: LyricsViewOptions) {
    this.container = options.container;
    this.scroller = options.scroller ?? options.container;
    this.options = options;
    this.variant = options.variant;

    this.smooth = new SmoothScroller(this.scroller);
    this.smooth.sync();
    this.smooth.setActive(false);

    this.animator = new Animator({
      variant: this.variant,
      forEachMounted: (visit) => this.forEachMounted(visit),
      onActiveChanged: (next, previous) => this.onActiveChanged(next, previous),
    });

    this.autoScroll = new AutoScroller(this.scroller, this.smooth, {
      metricsFor: (index) => this.metricsFor(index),
      activeIndex: () => this.animator.activeIndex,
      hasTimeline: () => this.timeline.timed,
    });

    this.drag = new LineDrag({
      forEachMounted: (visit) => this.forEachMounted(visit),
      rowsNear: (scroll, margin) => this.rowsNear(scroll, margin),
      pivot: () => this.autoScroll.aimed,
      autoScrolling: () => this.smooth.isAutoScrolling,
    });
    this.detachDragFrame = this.smooth.onFrame((time, scroll) => this.drag.frame(time, scroll));
    this.readLyricsModes();

    this.romanizer = new Romanizer({
      onContentChanged: (record) => this.onLineContentChanged(record),
      onWordsRebuilt: (record) => this.animator.refreshWords(record),
    });
    this.translator = new Translator((record) => this.virtual?.invalidate(record.index));

    window.addEventListener(SETTINGS_EVENT, this.onSettingsChange);
    this.scroller.addEventListener("click", this.onContainerClick);
  }

  get hasRomanization(): boolean {
    return this.hasRomanizationValue;
  }

  get language(): RomanizationLanguage | null {
    return this.songLanguage;
  }

  get hasLyrics(): boolean {
    return this.records.length > 0;
  }

  setLyrics(lyrics: Lyrics | null) {
    this.clear();
    if (!lyrics) return;

    const lines = buildLyricLines(lyrics);
    if (lines.length === 0) return;

    this.records = lines.map((line, index) => createLineRecord(line, index));
    for (const record of this.records) this.recordByEl.set(record.el, record);
    this.timeline = new Timeline(this.records);
    this.animator.setSong(this.records, this.timeline);

    const texts = lines.map((line) => (line.kind === "interlude" ? "" : line.text));
    this.songLanguage = detectRomanizationLanguage(texts);
    if (this.songLanguage === "zh") prepareChinese(texts);
    this.romanizer.setSong(this.records, this.songLanguage);

    if (this.options.virtualize !== false && lines.some((line) => line.kind === "syllable")) {
      this.virtual = new Virtualizer({
        container: this.container,
        scroller: this.scroller,
        records: this.records,
        variant: this.variant,
        rowGapPx: ROW_GAP_PX,
        onMount: (record) => this.animator.dress(record),
        onLayoutChanged: () => this.onLayoutChanged(),
      });
    } else {
      const fragment = document.createDocumentFragment();
      for (const record of this.records) fragment.appendChild(record.el);
      this.container.appendChild(fragment);
    }

    this.translator.setSong(this.records);
    this.applyTranslation();
    this.appendCredits(lyrics);

    this.autoScroll.reset();

    this.syncClock();
    this.forceSync();
    this.autoScroll.settle("auto");
    requestAnimationFrame(() => this.smooth.refresh());
  }

  clear() {
    this.generation++;
    this.container.classList.remove("ll-settling");
    this.stopClock();
    this.drag.reset();
    this.virtual?.destroy();
    this.virtual = null;
    this.records = [];
    this.recordByEl.clear();
    this.timeline = new Timeline([]);
    this.animator.setSong([], this.timeline);
    this.romanizer.clear();
    this.translator.clear();
    this.autoScroll.release();
    this.hasRomanizationValue = false;
    this.songLanguage = null;
    this.container.replaceChildren();
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) return;
    this.enabled = enabled;
    this.syncClock();
    this.smooth.setActive(enabled);
    if (enabled) this.applyTranslation();
    if (!enabled) {
      this.drag.reset();
      return;
    }

    this.autoScroll.release();
    this.smooth.refresh();
    this.forceSync();
    this.autoScroll.settle("auto");

    this.revealAfterLayout();
  }

  setRomanized(target: RomanizationTarget | null, allowFetch: boolean) {
    this.romanizer.apply(target, allowFetch);

    const convertible = this.songLanguage !== null;
    this.hasRomanizationValue = convertible;
    this.options.onRomanizationAvailability?.(convertible);
  }

  debugDump(): Promise<void> {
    return this.romanizer.dump();
  }

  recenter(behavior: ScrollBehavior = "auto") {
    this.autoScroll.recenter(behavior);
  }

  resetScroll() {
    this.autoScroll.reset();
  }

  destroy() {
    this.clear();
    this.scroller.removeEventListener("click", this.onContainerClick);
    window.removeEventListener(SETTINGS_EVENT, this.onSettingsChange);
    this.detachDragFrame();
    this.autoScroll.destroy();
    this.smooth.destroy();
  }

private appendCredits(lyrics: Lyrics) {
    const credits = getLyricsCredits(lyrics);
    if (!credits) return;
    this.container.appendChild(createCreditsElement(credits));
  }

  private onLineContentChanged(record: LineRecord) {
    this.translator.reattach(record);
    this.virtual?.invalidate(record.index);
  }

  private onLayoutChanged() {
    this.autoScroll.reanchor();
  }

private syncClock() {
    const shouldRun = this.enabled && this.timeline.timed && this.records.length > 0;
    if (shouldRun && !this.unsubscribeClock) {
      this.unsubscribeClock = subscribeClock(this.tick);
    } else if (!shouldRun) {
      this.stopClock();
    }
  }

  private stopClock() {
    this.unsubscribeClock?.();
    this.unsubscribeClock = null;
  }

  private forceSync() {
    if (!this.timeline.timed || this.records.length === 0) return;
    this.animator.invalidate();
    this.animator.tick(getPlayerProgress(), performance.now());
  }

  private tick = (progress: number, now: number) => {
    this.animator.tick(progress, now);
  };

  private onActiveChanged(next: number, previous: number) {
    if (next < 0) return;

    const previousRecord = previous >= 0 ? this.records[previous] : null;
    if (previousRecord?.line.kind === "interlude" && previous < next) {
      this.autoScroll.requestScrollAcross(next, this.collapseOf(previous), INTERLUDE_CLOSE_MS);
    } else {
      this.autoScroll.requestScroll(next, "smooth");
    }

    this.virtual?.setAnchor(next);
  }

  private forEachMounted(visit: (record: LineRecord) => void) {
    if (this.virtual) {
      this.virtual.forEachMounted(visit);
      return;
    }
    for (const record of this.records) visit(record);
  }

private metricsFor(index: number): LineMetrics | null {
    if (index < 0 || index >= this.records.length) return null;

    if (this.virtual) {
      return { top: this.virtual.topOf(index), height: this.virtual.heightOf(index) };
    }

    const el = this.records[index].el;
    if (!el.isConnected) return null;
    return { top: offsetTopWithin(el, this.scroller), height: el.offsetHeight };
  }

  private rowsNear(scroll: number, margin: number): { first: number; last: number } | null {
    if (this.virtual) return this.virtual.rangeNear(scroll, margin);

    const count = this.records.length;
    if (count === 0) return null;
    const top = scroll - margin;
    const bottom = scroll + this.autoScroll.viewport + margin;

    let low = 0;
    let high = count - 1;
    let first = high;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const metrics = this.metricsFor(mid);
      if (!metrics) return null;
      if (metrics.top + metrics.height >= top) {
        first = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    let last = first;
    while (last + 1 < count) {
      const metrics = this.metricsFor(last + 1);
      if (!metrics || metrics.top > bottom) break;
      last++;
    }
    return { first, last };
  }

  private collapseOf(index: number): number {
    if (this.virtual) return this.virtual.spanOf(index);

    const el = this.records[index]?.el;
    if (!el?.isConnected) return 0;
    const style = getComputedStyle(el);
    return el.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
  }

  private revealAfterLayout() {
    const generation = this.generation;
    this.container.classList.add("ll-settling");

    const recenter = () => {
      if (generation !== this.generation || !this.enabled || this.autoScroll.suspended) return;
      this.smooth.refresh();
      this.autoScroll.settle("auto");
    };

    const reveal = () => this.container.classList.remove("ll-settling");

    requestAnimationFrame(() => {
      recenter();
      window.setTimeout(() => {
        recenter();
        reveal();
      }, 120);
    });

    window.setTimeout(reveal, 400);
  }

private onSettingsChange = () => {
    this.smooth.sync();
    this.readLyricsModes();
    const settings = getSettings();
    if (settings.translateLyrics !== this.translating || settings.translationLayout !== this.translationLayout) {
      this.applyTranslation();
    }
  };

  private applyTranslation() {
    const settings = getSettings();
    this.translating = settings.translateLyrics;
    this.translationLayout = settings.translationLayout;
    this.translator.apply(this.translating, this.enabled, settings.translationLayout);
  }

  private readLyricsModes() {
    const settings = getSettings();
    this.animator.setModes(settings.simpleLyrics, settings.minimalLyrics, settings.wordGlow);
    this.drag.setEnabled(settings.lineDrag && !prefersReducedMotion());
  }

  private onContainerClick = (event: MouseEvent) => {
    const lineEl = (event.target as HTMLElement | null)?.closest<HTMLElement>(".liquid-lyrics-line");
    if (!lineEl) return;

    const record = this.recordByEl.get(lineEl);
    if (!record || !Number.isFinite(record.start)) return;

    this.autoScroll.release();
    seekTo(record.start);
    this.forceSync();
    this.autoScroll.requestScroll(record.index, "smooth");
  };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function offsetTopWithin(el: HTMLElement, container: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;

  while (node && node !== container) {
    top += node.offsetTop;
    const parent: Element | null = node.offsetParent;
    node = parent instanceof HTMLElement && container.contains(parent) ? parent : null;
  }

  return top;
}
