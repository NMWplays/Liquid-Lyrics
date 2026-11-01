import { clamp } from "@/lib/settings";
import { isOwnMutation } from "@/lib/dom/mutations";
import { MAIN_VIEW, NPV_LYRICS_SECTION, NPV_SECTION } from "@/lib/dom/spotifySelectors";

const ADOPTED_CLASS = "ll-theme-adopted";
const LIQUIFY_GLASS_CLASS = "ll-liquify-glass";
const LIQUIFY_GLASS_ID = "glass-filter--r1-7";
const FALLBACK_BACKDROP = "blur(32px)";
const SECTION_SELECTOR = NPV_SECTION;
// Our sidebar card is one of the NPV sections too.
const OWN_SURFACES = '[class*="liquid-lyrics"]';
const ACCENT_EDGE = "var(--liquid-lyrics-accent-outline)";

const RESYNC_DEBOUNCE_MS = 350;
const RESYNC_MIN_INTERVAL_MS = 1500;

let observer: MutationObserver | null = null;
let retryTimer = 0;
let lastSignature = "";
let pendingSync = 0;
let lastSyncAt = 0;
let cachedSurface: HTMLElement | null = null;

export function registerThemeBridge() {
  syncThemeSurface();

  let attempts = 0;
  retryTimer = window.setInterval(() => {
    attempts++;
    syncThemeSurface();
    if (attempts > 40 || document.querySelector(SECTION_SELECTOR)) {
      window.clearInterval(retryTimer);
      retryTimer = 0;
    }
  }, 400);

  if (!observer) {
    observer = new MutationObserver((records) => {
      if (pendingSync) return;
      if (isOwnMutation(records)) return;
      scheduleSync();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function scheduleSync() {
  if (pendingSync) return;
  const sinceLast = performance.now() - lastSyncAt;
  const wait = Math.max(RESYNC_DEBOUNCE_MS, RESYNC_MIN_INTERVAL_MS - sinceLast);
  pendingSync = window.setTimeout(() => {
    pendingSync = 0;
    syncThemeSurface();
  }, wait);
}

export function syncThemeSurface() {
  lastSyncAt = performance.now();
  const root = document.documentElement;

  const liquifyGlass = document.getElementById(LIQUIFY_GLASS_ID) !== null;
  root.classList.toggle(LIQUIFY_GLASS_CLASS, liquifyGlass);

  if (hasSupportedTheme(liquifyGlass)) {
    if (root.classList.contains(ADOPTED_CLASS)) {
      root.classList.remove(ADOPTED_CLASS);
      for (const name of ADOPTED_VARS) root.style.removeProperty(name);
      lastSignature = "";
    }
    return;
  }

  const section = pickSurface();
  const styles = section ? getComputedStyle(section) : null;

  const shadow = usable(styles?.boxShadow);
  const backdrop = usable(styles?.backdropFilter) ?? usable((styles as any)?.webkitBackdropFilter);
  const background = usable(styles?.backgroundColor);
  const radius = styles ? usableRadius(styles.borderRadius) : undefined;
  const border = shadow ? undefined : readBorder(styles);
  const mainView = document.querySelector<HTMLElement>(MAIN_VIEW);
  const mainRadius = mainView ? usableRadius(getComputedStyle(mainView).borderRadius) : undefined;

  const signature = `${shadow}|${border}|${backdrop}|${background}|${radius}|${mainRadius}`;
  if (signature === lastSignature && root.classList.contains(ADOPTED_CLASS)) return;
  lastSignature = signature;

  root.classList.add(ADOPTED_CLASS);
  const set = (name: string, value: string) => root.style.setProperty(name, value);

  const edge = shadow ?? border ?? ACCENT_EDGE;
  const cardEdge = shadow ?? border ?? (background ? "none" : ACCENT_EDGE);
  const cardBackdrop = backdrop ?? (background ? "none" : FALLBACK_BACKDROP);
  set("--liquid-lyrics-surface-shadow", edge);
  set("--liquid-lyrics-song-card-shadow", edge);
  set("--liquid-lyrics-rim-shadow", edge);
  set("--liquid-lyrics-flat-rim", edge);
  set("--liquid-lyrics-surface-backdrop", backdrop ?? FALLBACK_BACKDROP);
  set("--liquid-lyrics-settings-backdrop", backdrop ?? FALLBACK_BACKDROP);
  set("--ll-theme-card-bg", background ?? "transparent");
  set("--ll-theme-card-radius", radius ?? "20px");
  set("--ll-theme-card-edge", cardEdge);
  set("--ll-theme-card-backdrop", cardBackdrop);
  set("--ll-main-radius", mainRadius ?? "20px");
}

const ADOPTED_VARS = [
  "--ll-theme-card-edge",
  "--ll-theme-card-backdrop",
  "--ll-main-radius",
  "--liquid-lyrics-surface-shadow",
  "--liquid-lyrics-song-card-shadow",
  "--liquid-lyrics-rim-shadow",
  "--liquid-lyrics-flat-rim",
  "--liquid-lyrics-surface-backdrop",
  "--liquid-lyrics-settings-backdrop",
  "--ll-theme-card-bg",
  "--ll-theme-card-radius",
];

function pickSurface(): HTMLElement | null {
  if (cachedSurface?.isConnected) return cachedSurface;
  cachedSurface = searchForSurface();
  return cachedSurface;
}

function searchForSurface(): HTMLElement | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)).filter(
    (section) =>
      !section.matches(NPV_LYRICS_SECTION) &&
      !section.matches(OWN_SURFACES) &&
      section.getBoundingClientRect().width > 0,
  );
  let fallback: HTMLElement | null = null;

  for (const section of sections) {
    fallback ??= section;
    if (isStyledSurface(section)) return section;

    const width = section.getBoundingClientRect().width;
    for (const child of Array.from(section.children) as HTMLElement[]) {
      if (child.getBoundingClientRect().width < width * 0.9) continue;
      if (isStyledSurface(child)) return child;
    }
  }

  return fallback;
}

function isStyledSurface(element: HTMLElement): boolean {
  const styles = getComputedStyle(element);
  return Boolean(
    usable(styles.boxShadow) ||
      readBorder(styles) ||
      usable(styles.backgroundColor) ||
      usable(styles.borderRadius),
  );
}

function hasSupportedTheme(liquifyGlass: boolean): boolean {
  if (liquifyGlass) return true;

  const root = getComputedStyle(document.documentElement);
  return (
    isSet(root.getPropertyValue("--liquify-shadow")) ||
    isSet(root.getPropertyValue("--glass-shadow")) ||
    isSet(root.getPropertyValue("--glowify-shadow"))
  );
}

function readBorder(styles: CSSStyleDeclaration | null): string | undefined {
  if (!styles) return undefined;

  const width = Number.parseFloat(styles.borderTopWidth || "0");
  const style = styles.borderTopStyle;
  const color = styles.borderTopColor;
  if (!Number.isFinite(width) || width <= 0) return undefined;
  if (!style || style === "none" || style === "hidden") return undefined;
  if (!usable(color)) return undefined;

  return `inset 0 0 0 ${width}px ${color}`;
}

function isSet(value: string): boolean {
  const trimmed = value.trim();
  return trimmed !== "" && trimmed !== "none";
}

function usable(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "none" || trimmed === "auto") return undefined;
  if (/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(trimmed)) return undefined;
  if (trimmed === "0px") return undefined;
  return trimmed;
}

function usableRadius(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "none" || trimmed === "auto") return undefined;
  return trimmed;
}

export function themeBlurPx(fallback = 32): number {
  const root = getComputedStyle(document.documentElement);
  const match = /blur\(([\d.]+)px\)/.exec(root.getPropertyValue("--liquid-lyrics-surface-backdrop"));
  return match ? clamp(Number(match[1]), 0, 200) : fallback;
}
