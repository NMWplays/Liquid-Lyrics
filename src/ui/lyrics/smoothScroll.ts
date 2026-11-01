import Lenis from "lenis";
import { clamp, getSettings } from "@/lib/settings";

const running = new Set<SmoothScroller>();
let sharedFrame = 0;

function driveLoop(time: number) {
  sharedFrame = requestAnimationFrame(driveLoop);
  for (const scroller of running) scroller.tick(time);
}

function joinLoop(scroller: SmoothScroller) {
  running.add(scroller);
  if (!sharedFrame) sharedFrame = requestAnimationFrame(driveLoop);
}

function leaveLoop(scroller: SmoothScroller) {
  running.delete(scroller);
  if (running.size === 0 && sharedFrame) {
    cancelAnimationFrame(sharedFrame);
    sharedFrame = 0;
  }
}

export class SmoothScroller {
  private lenis: Lenis | null = null;
  private enabled = false;
  private activeSurface = true;
  private draggingScrollbar = false;
  private autoScrolling = false;
  private autoScrollTimer = 0;
  private readonly gestureHandlers = new Set<() => void>();
  private readonly frameHandlers = new Set<(time: number, scroll: number) => void>();
  private detachLenisGesture: (() => void) | null = null;

  constructor(
    private readonly scroller: HTMLElement,
    private readonly alwaysOn = false,
    private readonly allowed = true,
  ) {
    this.scroller.addEventListener("pointerdown", this.onPointerDown, true);
    this.scroller.addEventListener("wheel", this.onNativeGesture, { passive: true });
    this.scroller.addEventListener("touchmove", this.onNativeGesture, { passive: true });
    this.scroller.addEventListener("keydown", this.onNativeKey);
  }

  onUserGesture(handler: () => void): () => void {
    this.gestureHandlers.add(handler);
    return () => this.gestureHandlers.delete(handler);
  }

  onFrame(handler: (time: number, scroll: number) => void): () => void {
    this.frameHandlers.add(handler);
    return () => this.frameHandlers.delete(handler);
  }

  get driving(): boolean {
    return this.lenis !== null;
  }

  sync() {
    const wanted = this.allowed && (this.alwaysOn || getSettings().smoothScroll);
    if (wanted === this.enabled) {
      if (this.lenis) this.lenis.options.duration = this.duration();
      return;
    }
    this.enabled = wanted;
    if (wanted) this.start();
    else this.stop();
  }

  setActive(active: boolean) {
    if (this.activeSurface === active) return;
    this.activeSurface = active;
    if (!this.lenis) return;
    if (active) joinLoop(this);
    else leaveLoop(this);
  }

  scrollTo(top: number, behavior: ScrollBehavior = "smooth") {
    if (this.draggingScrollbar) return;

    const lenis = this.lenis;
    if (!lenis) {
      this.markAutoScroll(behavior === "smooth");
      this.scroller.scrollTo({ top, behavior });
      return;
    }

    if (behavior !== "smooth") {
      this.markAutoScroll(false);
      lenis.scrollTo(top, { immediate: true, force: true });
      return;
    }

    this.markAutoScroll(true);
    lenis.scrollTo(top, {
      duration: this.duration(),
      onComplete: () => this.markAutoScroll(false),
    });
  }

  get isAutoScrolling(): boolean {
    return this.autoScrolling;
  }

  refresh() {
    this.lenis?.resize();
  }

  tick(time: number) {
    const lenis = this.lenis;
    if (!lenis) return;
    lenis.raf(time);
    if (this.frameHandlers.size === 0) return;
    const scroll = lenis.animatedScroll;
    for (const handler of this.frameHandlers) handler(time, scroll);
  }

  destroy() {
    this.scroller.removeEventListener("pointerdown", this.onPointerDown, true);
    this.scroller.removeEventListener("wheel", this.onNativeGesture);
    this.scroller.removeEventListener("touchmove", this.onNativeGesture);
    this.scroller.removeEventListener("keydown", this.onNativeKey);
    this.gestureHandlers.clear();
    this.frameHandlers.clear();
    this.stop();
  }

private markAutoScroll(running: boolean) {
    if (this.autoScrollTimer) {
      clearTimeout(this.autoScrollTimer);
      this.autoScrollTimer = 0;
    }
    this.autoScrolling = running;
    if (!running) return;
    this.autoScrollTimer = window.setTimeout(() => {
      this.autoScrollTimer = 0;
      this.autoScrolling = false;
    }, this.duration() * 1000 + 250);
  }

  private reportGesture = () => {
    this.markAutoScroll(false);
    for (const handler of this.gestureHandlers) handler();
  };

  private onNativeGesture = () => {
    if (!this.lenis) this.reportGesture();
  };

  private onNativeKey = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "PageUp":
      case "PageDown":
      case "Home":
      case "End":
      case " ":
        this.reportGesture();
        break;
      default:
        break;
    }
  };

  private onPointerDown = (event: PointerEvent) => {
    const gutter = this.scroller.offsetWidth - this.scroller.clientWidth;
    if (gutter <= 0) return;

    const rect = this.scroller.getBoundingClientRect();
    if (event.clientX < rect.right - gutter) return;

    this.reportGesture();
    this.draggingScrollbar = true;
    this.lenis?.stop();

    const onUp = () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      this.draggingScrollbar = false;
      this.reportGesture();
      this.lenis?.scrollTo(this.scroller.scrollTop, { immediate: true, force: true });
      this.lenis?.start();
    };

    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  private duration(): number {
    return clamp(getSettings().smoothScrollDuration, 2, 30) / 10;
  }

  private start() {
    if (this.lenis) return;

    try {
      this.lenis = new Lenis({
        wrapper: this.scroller,
        content: (this.scroller.firstElementChild as HTMLElement) ?? this.scroller,
        duration: this.duration(),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        naiveDimensions: true,
      });
    } catch (error) {
      console.warn("[Liquid Lyrics] Smooth scrolling unavailable, using native scrolling.", error);
      this.lenis = null;
      this.enabled = false;
      return;
    }

    this.detachLenisGesture = this.lenis.on("virtual-scroll", this.reportGesture);
    if (this.activeSurface) joinLoop(this);
  }

  private stop() {
    leaveLoop(this);
    this.detachLenisGesture?.();
    this.detachLenisGesture = null;
    this.lenis?.destroy();
    this.lenis = null;
  }
}
