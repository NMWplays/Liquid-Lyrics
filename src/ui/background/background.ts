import { Kawarp } from "@kawarp/core";
import {
  clamp,
  getBackgroundImageUrl,
  getLastVisibleBackgroundMode,
  getSettings,
  type BackgroundMode,
} from "@/lib/settings";

const CROSSFADE_MS = 600;
const FADE_MS = 600;
const MAX_KAWARP_PX = 1600;
const RESIZE_SETTLE_MS = 160;

const FORCED_LOOK = {
  canvasFilter: "brightness(62%) contrast(104%)",
  cssFilter: "blur(48px) saturate(150%) brightness(62%) contrast(104%)",
  warpIntensity: 0.5,
  blurPasses: 6,
  animationSpeed: 1,
  saturation: 1.5,
  scale: 1,
} as const;

export class LyricsBackground {
  readonly el: HTMLElement;

  private tiles: HTMLElement[] = [];
  private faces: HTMLElement[] = [];
  private imageLayer: HTMLElement | null = null;
  private kawarpLayers: Array<{ canvas: HTMLCanvasElement; renderer: Kawarp }> = [];
  private useKawarpA = true;
  private kawarpSwapTimer = 0;
  private animatedSwapTimer = 0;
  private resizeSettleTimer = 0;
  private fadeOutTimer = 0;
  private forceVisible = false;
  private nextCoverInstant = false;
  private instantSwap = false;
  private pendingReveal = false;
  private resizeObserver: ResizeObserver | null = null;

  private coverUrl = "";
  private useSetA = true;
  private lastAnimatedUrl = "";
  private lastKawarpUrl = "";
  private mode = "";
  private enabled = true;
  private lastKawarpOptions = "";
  private kawarpToken = 0;
  private animatedToken = 0;

  constructor(
    private readonly variant: "panel" | "sidebar",
    private readonly forcedMode?: BackgroundMode,
  ) {
    this.el = document.createElement("div");
    this.el.className = `liquid-lyrics-bg ll-bg-${variant}`;
    this.el.setAttribute("aria-hidden", "true");

    if (forcedMode) {
      this.el.style.setProperty("--ll-bg-canvas-filter", FORCED_LOOK.canvasFilter);
      this.el.style.setProperty("--ll-bg-filter", FORCED_LOOK.cssFilter);
      this.el.style.setProperty("--ll-bg-opacity", "1");
      this.el.style.setProperty("--ll-bg-scale", "1");
      this.el.style.setProperty("--ll-bg-spin-duration", "30000ms");
    }
  }

  private get activeMode(): BackgroundMode {
    const mode = this.forcedMode ?? getSettings().bgMode;
    if (mode === "transparent" && this.forceVisible) return getLastVisibleBackgroundMode();
    return mode;
  }

  setForcedVisible(forced: boolean) {
    if (this.forceVisible === forced) return;
    this.forceVisible = forced;
    this.render();
  }

  setCover(url: string, immediate = false) {
    if (!url) return;

    const instant = immediate || this.nextCoverInstant;
    this.nextCoverInstant = false;
    if (url === this.coverUrl) return;
    this.coverUrl = url;

    this.instantSwap = instant;
    if (instant) this.beginHiddenSwap();

    this.render();
  }

  private beginHiddenSwap() {
    this.pendingReveal = true;
    this.suppressTransitions();
    this.el.classList.remove("is-visible");
  }

  private finishHiddenSwap() {
    if (!this.pendingReveal) return;
    this.pendingReveal = false;
    requestAnimationFrame(() => this.el.classList.add("is-visible"));
  }

  markNextCoverInstant() {
    this.nextCoverInstant = true;
  }

  private suppressTransitions() {
    this.el.classList.add("ll-bg-instant");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.el.classList.remove("ll-bg-instant")),
    );
  }

  apply() {
    this.render();
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) return;
    this.enabled = enabled;
    if (this.kawarpLayers.length === 0) return;

    if (!enabled) {
      for (const layer of this.kawarpLayers) layer.renderer.stop();
      return;
    }
    for (const layer of this.kawarpLayers) {
      if (layer.canvas.classList.contains("is-front")) layer.renderer.start();
    }
  }

  destroy() {
    window.clearTimeout(this.fadeOutTimer);
    window.clearTimeout(this.animatedSwapTimer);
    this.animatedToken++;
    this.teardownKawarp();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.el.remove();
  }

private render() {
    const mode = this.activeMode;

    if (mode !== this.mode) {
      const previous = this.mode;
      this.mode = mode;
      window.clearTimeout(this.fadeOutTimer);

      if (mode === "transparent" && previous !== "") {
        this.el.classList.remove("is-visible");
        this.pendingReveal = false;
        this.fadeOutTimer = window.setTimeout(() => {
          this.rebuild(mode);
          this.el.dataset.mode = mode;
          this.el.classList.add("is-visible");
        }, FADE_MS);
        return;
      }

      this.rebuild(mode);
    }

    this.el.dataset.mode = mode;
    if (!this.pendingReveal) this.el.classList.add("is-visible");

    switch (mode) {
      case "transparent":
      case "color":
        this.finishHiddenSwap();
        break;
      case "image":
        this.renderImage();
        this.finishHiddenSwap();
        break;
      case "animated":
        this.renderAnimated();
        break;
      case "kawarp":
        this.renderKawarp();
        break;
    }
  }

  private rebuild(mode: string) {
    window.clearTimeout(this.animatedSwapTimer);
    this.animatedToken++;
    this.teardownKawarp();
    this.el.replaceChildren();
    this.tiles = [];
    this.faces = [];
    this.imageLayer = null;
    this.lastAnimatedUrl = "";
    this.lastKawarpUrl = "";

    if (mode === "image") {
      this.imageLayer = document.createElement("div");
      this.imageLayer.className = "ll-bg-image";
      this.el.appendChild(this.imageLayer);
      return;
    }

    if (mode === "animated") {
      for (let index = 0; index < 2; index++) {
        const tile = document.createElement("div");
        tile.className = "ll-bg-tile";
        for (let face = 0; face < 2; face++) {
          const layer = document.createElement("div");
          layer.className = "ll-bg-tile-face";
          tile.appendChild(layer);
          this.faces.push(layer);
        }
        this.el.appendChild(tile);
        this.tiles.push(tile);
      }
      return;
    }

    if (mode === "kawarp") {
      for (let index = 0; index < 2; index++) {
        const canvas = document.createElement("canvas");
        canvas.className = "ll-bg-canvas";
        this.el.appendChild(canvas);
      }
    }
  }

  private renderImage() {
    const url = getBackgroundImageUrl(this.coverUrl, this.activeMode);
    if (!this.imageLayer) return;
    this.imageLayer.style.backgroundImage = url ? `url("${cssUrl(url)}")` : "";
  }

  private renderAnimated() {
    const url = getBackgroundImageUrl(this.coverUrl, this.activeMode);
    if (this.faces.length < 4) {
      this.finishHiddenSwap();
      return;
    }

    if (!url) {
      this.animatedToken++;
      window.clearTimeout(this.animatedSwapTimer);
      for (const face of this.faces) face.classList.remove("active", "is-front");
      this.lastAnimatedUrl = "";
      this.finishHiddenSwap();
      return;
    }

    if (url === this.lastAnimatedUrl) {
      this.finishHiddenSwap();
      return;
    }
    this.lastAnimatedUrl = url;

    const instant = this.instantSwap;
    this.instantSwap = false;
    void this.crossfadeAnimated(url, instant);
  }

  private async crossfadeAnimated(url: string, instant: boolean) {
    const token = ++this.animatedToken;

    try {
      await preloadImage(url);
    } catch {
      if (token === this.animatedToken) this.lastAnimatedUrl = "";
      this.finishHiddenSwap();
      return;
    }
    if (token !== this.animatedToken || this.faces.length < 4) return;

    const setA = this.faces.filter((_, index) => index % 2 === 0);
    const setB = this.faces.filter((_, index) => index % 2 === 1);
    const incoming = this.useSetA ? setA : setB;
    const outgoing = this.useSetA ? setB : setA;

    this.primeAnimatedSwap(incoming);

    if (instant) this.suppressTransitions();

    for (const face of incoming) {
      face.style.backgroundImage = `url("${cssUrl(url)}")`;
      face.classList.add("active", "is-front");
    }
    for (const face of outgoing) face.classList.remove("is-front");
    this.useSetA = !this.useSetA;

    this.finishHiddenSwap();

    window.clearTimeout(this.animatedSwapTimer);
    this.animatedSwapTimer = window.setTimeout(() => {
      if (token !== this.animatedToken) return;
      for (const face of outgoing) face.classList.remove("active");
    }, CROSSFADE_MS + 80);
  }

  private primeAnimatedSwap(incoming: HTMLElement[]) {
    window.clearTimeout(this.animatedSwapTimer);

    for (const face of this.faces) face.style.setProperty("transition", "none", "important");
    for (const face of incoming) face.classList.remove("active", "is-front");
    void this.el.offsetWidth;
    for (const face of this.faces) face.style.removeProperty("transition");
  }

  private renderKawarp() {
    const canvases = Array.from(this.el.querySelectorAll<HTMLCanvasElement>(".ll-bg-canvas"));
    if (canvases.length < 2) {
      this.finishHiddenSwap();
      return;
    }

    if (this.kawarpLayers.length === 0) {
      try {
        this.kawarpLayers = canvases.map((canvas) => ({
          canvas,
          renderer: new Kawarp(canvas, { ...this.kawarpOptions(), transitionDuration: 0 }),
        }));
      } catch (error) {
        console.warn("[Liquid Lyrics] Kawarp unavailable, falling back to the animated background.", error);
        this.disposeKawarpLayers();
        this.mode = "animated";
        this.rebuild("animated");
        this.el.dataset.mode = "animated";
        this.renderAnimated();
        return;
      }

      for (const layer of this.kawarpLayers) this.sizeKawarpCanvas(layer);
      this.observeResize();
      this.lastKawarpOptions = JSON.stringify(this.kawarpOptions());
      if (this.enabled) this.kawarpLayers[0].renderer.start();
    } else {
      const next = JSON.stringify(this.kawarpOptions());
      if (next !== this.lastKawarpOptions) {
        this.lastKawarpOptions = next;
        for (const layer of this.kawarpLayers) {
          layer.renderer.setOptions({ ...this.kawarpOptions(), transitionDuration: 0 });
        }
      }
    }

    const url = getBackgroundImageUrl(this.coverUrl, this.activeMode);
    if (!url || url === this.lastKawarpUrl) {
      this.finishHiddenSwap();
      return;
    }
    this.lastKawarpUrl = url;
    const instant = this.instantSwap;
    this.instantSwap = false;
    void this.crossfadeKawarp(url, instant);
  }

  private async crossfadeKawarp(url: string, instant = false) {
    const token = ++this.kawarpToken;

    let source: HTMLImageElement;
    try {
      source = await this.decodeImage(url);
    } catch {
      if (token === this.kawarpToken) this.lastKawarpUrl = "";
      this.finishHiddenSwap();
      return;
    }
    if (token !== this.kawarpToken || this.kawarpLayers.length < 2) return;

    const incoming = this.useKawarpA ? this.kawarpLayers[0] : this.kawarpLayers[1];
    const outgoing = this.useKawarpA ? this.kawarpLayers[1] : this.kawarpLayers[0];

    this.sizeKawarpCanvas(incoming);
    incoming.renderer.loadImageElement(source);
    if (this.enabled) {
      incoming.renderer.start();
    } else {
      try {
        incoming.renderer.renderFrame();
      } catch {
      }
    }

    await nextFrame();
    await nextFrame();
    if (token !== this.kawarpToken) return;

    if (instant) this.suppressTransitions();

    incoming.canvas.classList.add("active", "is-front");
    outgoing.canvas.classList.remove("is-front");
    this.useKawarpA = !this.useKawarpA;

    this.finishHiddenSwap();

    window.clearTimeout(this.kawarpSwapTimer);
    this.kawarpSwapTimer = window.setTimeout(() => {
      if (token !== this.kawarpToken) return;
      outgoing.canvas.classList.remove("active");
      outgoing.renderer.stop();
    }, CROSSFADE_MS + 80);
  }

  private async decodeImage(url: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    await image.decode();
    return image;
  }

  private kawarpOptions() {
    if (this.forcedMode) {
      return {
        warpIntensity: FORCED_LOOK.warpIntensity,
        blurPasses: FORCED_LOOK.blurPasses,
        animationSpeed: FORCED_LOOK.animationSpeed,
        transitionDuration: 0,
        saturation: FORCED_LOOK.saturation,
        scale: FORCED_LOOK.scale,
      };
    }

    const settings = getSettings();
    return {
      warpIntensity: clamp(settings.bgWarpIntensity, 0, 100) / 100,
      blurPasses: Math.max(1, Math.round(clamp(settings.bgBlur, 0, 150) / 150 * 40)),
      animationSpeed: clamp(settings.bgRotationSpeed, 0, 400) / 100,
      transitionDuration: 0,
      saturation: clamp(settings.bgSaturation, 0, 500) / 100,
      scale: clamp(clamp(settings.bgScale, 10, 400) / 100, 0.01, 4),
    };
  }

  private observeResize() {
    if (this.resizeObserver) return;
    this.resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(this.resizeSettleTimer);
      this.resizeSettleTimer = window.setTimeout(() => {
        for (const layer of this.kawarpLayers) this.sizeKawarpCanvas(layer);
      }, RESIZE_SETTLE_MS);
    });
    this.resizeObserver.observe(this.el);
  }

  private sizeKawarpCanvas(layer: { canvas: HTMLCanvasElement; renderer: Kawarp }) {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    if (width < 2 || height < 2) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const longest = Math.max(width, height) * dpr;
    const factor = longest > MAX_KAWARP_PX ? (MAX_KAWARP_PX / longest) * dpr : dpr;
    const target = { width: Math.round(width * factor), height: Math.round(height * factor) };

    if (layer.canvas.width === target.width && layer.canvas.height === target.height) return;
    layer.canvas.width = target.width;
    layer.canvas.height = target.height;
    layer.renderer.resize();
    try {
      layer.renderer.renderFrame();
    } catch {
    }
  }

  private teardownKawarp() {
    this.kawarpToken++;
    window.clearTimeout(this.kawarpSwapTimer);
    this.kawarpSwapTimer = 0;
    window.clearTimeout(this.resizeSettleTimer);
    this.resizeSettleTimer = 0;
    this.disposeKawarpLayers();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  private disposeKawarpLayers() {
    for (const layer of this.kawarpLayers) {
      try {
        layer.renderer.stop();
        layer.renderer.dispose();
      } catch {
      }
    }
    this.kawarpLayers = [];
    this.useKawarpA = true;
  }
}

function cssUrl(url: string): string {
  return url.replace(/["\\]/g, "\\$&").replace(/\r?\n/g, "");
}

function preloadImage(url: string): Promise<void> {
  const image = new Image();
  image.src = url;
  return image.decode();
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
