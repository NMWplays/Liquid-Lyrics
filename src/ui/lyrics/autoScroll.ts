import type { SmoothScroller } from "@/ui/lyrics/smoothScroll";

const USER_HOLD_MS = 5000;
export const INTERLUDE_CLOSE_MS = 560;
const REANCHOR_EPSILON_PX = 6;
const REANCHOR_MIN_INTERVAL_MS = 200;
const RESUME_WINDOW = 0.12;

export type LineMetrics = { top: number; height: number };

export type ScrollGeometry = {
  metricsFor(index: number): LineMetrics | null;
  activeIndex(): number;
  hasTimeline(): boolean;
};

export class AutoScroller {
  private held = false;
  private holdTimer: ReturnType<typeof setTimeout> | null = null;
  private delayTimer: ReturnType<typeof setTimeout> | null = null;
  private reanchorTimer: ReturnType<typeof setTimeout> | null = null;
  private delayedIndex = -1;
  private aimedIndex = -1;
  private lastTarget = -1;
  private lastReanchorAt = 0;
  private cachedViewport = 0;
  private readonly viewportObserver: ResizeObserver;
  private readonly detachGesture: () => void;

  constructor(
    private readonly scroller: HTMLElement,
    private readonly smooth: SmoothScroller,
    private readonly geometry: ScrollGeometry,
  ) {
    this.cachedViewport = scroller.clientHeight;
    this.viewportObserver = new ResizeObserver(() => {
      this.cachedViewport = this.scroller.clientHeight;
    });
    this.viewportObserver.observe(scroller);
    this.detachGesture = smooth.onUserGesture(this.onUserGesture);
  }

  destroy() {
    this.detachGesture();
    this.viewportObserver.disconnect();
    this.clearHold();
    this.clearDelay();
    this.clearReanchor();
  }

  get suspended(): boolean {
    return this.held;
  }

  get aimed(): number {
    return this.aimedIndex;
  }

  get viewport(): number {
    return this.viewportHeight();
  }

  requestScroll(index: number, behavior: ScrollBehavior = "smooth", delayMs = 0) {
    this.clearDelay();
    if (index < 0) return;

    if (this.held) {
      if (!this.isNearTarget(index)) return;
      this.clearHold();
    }

    if (delayMs > 0) {
      this.clearReanchor();
      this.delayedIndex = index;
      this.delayTimer = setTimeout(() => {
        this.delayTimer = null;
        const wanted = this.delayedIndex;
        this.delayedIndex = -1;
        if (wanted === this.geometry.activeIndex()) this.apply(wanted, behavior);
      }, delayMs);
      return;
    }

    this.apply(index, behavior);
  }

  requestScrollAcross(index: number, collapsePx: number, holdMs: number) {
    this.clearDelay();
    if (index < 0) return;

    if (this.held) {
      if (!this.isNearTarget(index)) return;
      this.clearHold();
    }

    const target = this.targetFor(index);
    if (target === null) return;
    const settled = Math.max(0, target - Math.max(0, collapsePx));

    this.clearReanchor();
    this.lastReanchorAt = performance.now();
    this.aimedIndex = index;
    this.lastTarget = settled;
    this.scrollTo(settled, "smooth");

    this.delayTimer = setTimeout(() => {
      this.delayTimer = null;
      this.reanchor();
    }, holdMs);
  }

  settle(behavior: ScrollBehavior = "auto") {
    const index = this.geometry.activeIndex();
    if (index >= 0) this.apply(index, behavior);
    else if (!this.geometry.hasTimeline()) this.scrollTo(0, behavior);
  }

  recenter(behavior: ScrollBehavior = "auto") {
    this.clearHold();
    this.clearDelay();
    this.clearReanchor();
    this.smooth.refresh();
    const index = this.geometry.activeIndex();
    if (index >= 0) this.apply(index, behavior);
  }

  reanchor() {
    if (this.held || this.delayTimer) return;
    const index = this.geometry.activeIndex();
    if (index < 0) return;
    const target = this.targetFor(index);
    if (target === null) return;

    if (!this.smooth.isAutoScrolling) {
      if (Math.abs(target - this.lastTarget) < 1) return;
      this.aimedIndex = index;
      this.lastTarget = target;
      this.scrollTo(target, "auto");
      return;
    }

    const wait = REANCHOR_MIN_INTERVAL_MS - (performance.now() - this.lastReanchorAt);
    if (wait > 0) {
      if (!this.reanchorTimer) {
        this.reanchorTimer = setTimeout(() => {
          this.reanchorTimer = null;
          this.reanchor();
        }, wait);
      }
      return;
    }

    if (Math.abs(target - this.lastTarget) < REANCHOR_EPSILON_PX) return;

    this.lastReanchorAt = performance.now();
    this.aimedIndex = index;
    this.lastTarget = target;
    this.scrollTo(target, "smooth");
  }

  reset() {
    this.clearHold();
    this.clearDelay();
    this.clearReanchor();
    this.aimedIndex = -1;
    this.lastTarget = 0;
    this.scroller.scrollTop = 0;
    this.smooth.refresh();
    this.smooth.scrollTo(0, "auto");
  }

  release() {
    this.clearHold();
  }

private onUserGesture = () => {
    this.clearDelay();
    this.clearReanchor();
    this.held = true;
    if (this.holdTimer) clearTimeout(this.holdTimer);
    this.holdTimer = setTimeout(this.onHoldExpired, USER_HOLD_MS);
  };

  private onHoldExpired = () => {
    this.holdTimer = null;
    this.held = false;
    const index = this.geometry.activeIndex();
    if (index >= 0) this.apply(index, "smooth");
  };

  private apply(index: number, behavior: ScrollBehavior) {
    const target = this.targetFor(index);
    if (target === null) return;
    this.clearReanchor();
    this.lastReanchorAt = performance.now();
    this.aimedIndex = index;
    this.lastTarget = target;
    this.scrollTo(target, behavior);
  }

  private viewportHeight(): number {
    return this.cachedViewport > 0 ? this.cachedViewport : this.scroller.clientHeight;
  }

  private targetFor(index: number): number | null {
    const metrics = this.geometry.metricsFor(index);
    if (!metrics) return null;
    return Math.max(0, Math.round(metrics.top - this.viewportHeight() / 2 + metrics.height / 2));
  }

  private isNearTarget(index: number): boolean {
    const target = this.targetFor(index);
    if (target === null) return false;
    return Math.abs(this.scroller.scrollTop - target) <= this.viewportHeight() * RESUME_WINDOW;
  }

  private scrollTo(top: number, behavior: ScrollBehavior) {
    this.smooth.scrollTo(top, behavior);
  }

  private clearHold() {
    this.held = false;
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  }

  private clearDelay() {
    this.delayedIndex = -1;
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  private clearReanchor() {
    if (this.reanchorTimer) {
      clearTimeout(this.reanchorTimer);
      this.reanchorTimer = null;
    }
  }
}
