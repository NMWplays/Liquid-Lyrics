export const SETTINGS_EVENT = "liquid-lyrics:settings";

const STORAGE_KEY = "liquid-lyrics-settings";
const BG_IMAGE_KEY = "liquid-lyrics-bg-image";

export type SpotifyLyricsButtonMode = "keep" | "hide" | "override";

export type BackgroundMode = "transparent" | "color" | "image" | "animated" | "kawarp";
export type BackgroundSource = "albumArt" | "url" | "upload";
export type CardStyle = "default" | "cover" | "canvas";
export type CanvasPiece = "overlay" | "below" | "hidden";
export type ControlPosition = "bottom" | "top" | "left" | "right";
export type NoLyricsView = "message" | "card" | "vinyl";
export type TranslationLayout = "below" | "main" | "only";

export type Settings = {
  spotifyLyricsButton: SpotifyLyricsButtonMode;
  showOwnButton: boolean;

  showTitle: boolean;
  showHeaderLinks: boolean;

  autoHideUi: boolean;
  autoHideDelay: number;
  autoHideCursor: boolean;

  fontScale: number;
  fadeTop: number;
  fadeBottom: number;
  smoothScroll: boolean;
  smoothScrollDuration: number;
  simpleLyrics: boolean;
  minimalLyrics: boolean;
  wordGlow: boolean;
  lineDrag: boolean;
  translateLyrics: boolean;
  translationLayout: TranslationLayout;
  noLyricsView: NoLyricsView;

  bgMode: BackgroundMode;
  bgSource: BackgroundSource;
  bgUrl: string;
  bgColor: string;
  bgScale: number;
  bgBlur: number;
  bgSaturation: number;
  bgBrightness: number;
  bgContrast: number;
  bgOpacity: number;
  bgRotationSpeed: number;
  bgWarpIntensity: number;

  cardStyle: CardStyle;
  fsCardStyleSeparate: boolean;
  fsCardStyle: CardStyle;
  cardVolumeDefault: boolean;
  cardVolumeCover: boolean;
  cardVolumeCanvas: boolean;
  cardRadius: number;
  cardCoverRadius: number;
  cardCanvasTitle: CanvasPiece;
  cardCanvasVinyl: CanvasPiece;
  cardSide: "left" | "right";
  cardCenterText: boolean;
  cardHideTitle: boolean;
  cardHideArtist: boolean;
  cardHideAlbum: boolean;

  pageShowCredits: boolean;
  pageHideScrollbar: boolean;
  pageShowControls: boolean;
  pageControlPosition: ControlPosition;

  fsShowCredits: boolean;
  fsHideScrollbar: boolean;
  fsShowControls: boolean;
  fsControlPosition: ControlPosition;
  fsFadeTitle: boolean;
  fsFadeArtist: boolean;
  fsFadeAlbum: boolean;

  npvBackground: boolean;
  npvShowCard: boolean;
  npvReplaceSpotifyLyrics: boolean;
  npvCardHeight: number;
  npvCardMinHeight: number;
};

export const DEFAULT_SETTINGS: Settings = {
  spotifyLyricsButton: "hide",
  showOwnButton: true,

  showTitle: true,
  showHeaderLinks: true,

  autoHideUi: true,
  autoHideDelay: 3,
  autoHideCursor: true,

  fontScale: 100,
  fadeTop: 11,
  fadeBottom: 18,
  smoothScroll: true,
  smoothScrollDuration: 12,
  simpleLyrics: false,
  minimalLyrics: false,
  wordGlow: true,
  lineDrag: true,
  translateLyrics: false,
  translationLayout: "below",
  noLyricsView: "message",

  bgMode: "kawarp",
  bgSource: "albumArt",
  bgUrl: "",
  bgColor: "#101418",
  bgScale: 100,
  bgBlur: 20,
  bgSaturation: 150,
  bgBrightness: 60,
  bgContrast: 100,
  bgOpacity: 100,
  bgRotationSpeed: 100,
  bgWarpIntensity: 50,

  cardStyle: "default",
  fsCardStyleSeparate: false,
  fsCardStyle: "cover",
  cardVolumeDefault: true,
  cardVolumeCover: true,
  cardVolumeCanvas: true,
  cardRadius: 20,
  cardCoverRadius: 20,
  cardCanvasTitle: "overlay",
  cardCanvasVinyl: "overlay",
  cardSide: "left",
  cardCenterText: true,
  cardHideTitle: false,
  cardHideArtist: false,
  cardHideAlbum: false,

  pageShowCredits: true,
  pageHideScrollbar: false,
  pageShowControls: true,
  pageControlPosition: "bottom",

  fsShowCredits: true,
  fsHideScrollbar: false,
  fsShowControls: true,
  fsControlPosition: "bottom",
  fsFadeTitle: false,
  fsFadeArtist: false,
  fsFadeAlbum: false,

  npvBackground: true,
  npvShowCard: true,
  npvReplaceSpotifyLyrics: true,
  npvCardHeight: 25,
  npvCardMinHeight: 320,
};

export const SETTING_RANGES = {
  autoHideDelay: { min: 1, max: 30, step: 1 },
  fontScale: { min: 50, max: 200, step: 5 },
  fadeTop: { min: 0, max: 45, step: 1 },
  fadeBottom: { min: 0, max: 45, step: 1 },
  smoothScrollDuration: { min: 2, max: 30, step: 1 },
  bgScale: { min: 10, max: 400, step: 5 },
  bgBlur: { min: 0, max: 150, step: 1 },
  bgSaturation: { min: 0, max: 500, step: 10 },
  bgBrightness: { min: 0, max: 200, step: 5 },
  bgContrast: { min: 0, max: 300, step: 5 },
  bgOpacity: { min: 0, max: 100, step: 5 },
  bgRotationSpeed: { min: 0, max: 400, step: 10 },
  bgWarpIntensity: { min: 0, max: 100, step: 5 },
  cardRadius: { min: 0, max: 48, step: 1 },
  cardCoverRadius: { min: 0, max: 48, step: 1 },
  npvCardHeight: { min: 20, max: 100, step: 5 },
  npvCardMinHeight: { min: 100, max: 1200, step: 20 },
} as const;

export type NumericSetting = keyof typeof SETTING_RANGES;

let cached: Settings | null = null;

export function getSettings(): Settings {
  if (cached) return cached;
  cached = { ...DEFAULT_SETTINGS, ...readStored() };
  return cached;
}

export function getSetting<K extends keyof Settings>(key: K): Settings[K] {
  return getSettings()[key];
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  const next = { ...getSettings(), [key]: value };
  writeSettings(next);
}

export function resetSettings() {
  writeSettings({ ...DEFAULT_SETTINGS });
}

const BLUR_PRESETS: Record<BackgroundMode, number> = {
  transparent: 0,
  color: 0,
  image: 0,
  animated: 51,
  kawarp: 20,
};

const SATURATION_PRESETS: Record<BackgroundMode, number> = {
  transparent: 100,
  color: 100,
  image: 100,
  animated: 100,
  kawarp: 150,
};

export function setBackgroundMode(mode: BackgroundMode) {
  const current = getSettings();
  if (current.bgMode === mode) return;
  const lastVisible = mode === "transparent" && current.bgMode !== "transparent" ? current.bgMode : lastVisibleMode;
  lastVisibleMode = lastVisible;
  writeSettings({
    ...current,
    bgMode: mode,
    bgBlur: BLUR_PRESETS[mode],
    bgSaturation: SATURATION_PRESETS[mode],
  });
}

let lastVisibleMode: BackgroundMode = "kawarp";

export function toggleBackgroundVisible() {
  const current = getSettings().bgMode;
  setBackgroundMode(current === "transparent" ? lastVisibleMode : "transparent");
}

export function isBackgroundVisible(): boolean {
  return getSettings().bgMode !== "transparent";
}

export function getLastVisibleBackgroundMode(): BackgroundMode {
  return lastVisibleMode === "transparent" ? "kawarp" : lastVisibleMode;
}

export function getBackgroundImage(): string {
  try {
    return localStorage.getItem(BG_IMAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function setBackgroundImage(dataUrl: string): boolean {
  try {
    localStorage.setItem(BG_IMAGE_KEY, dataUrl);
  } catch {
    return false;
  }
  applySettings();
  window.dispatchEvent(new Event(SETTINGS_EVENT));
  return true;
}

export function getBackgroundImageUrl(coverUrl: string, mode?: BackgroundMode): string {
  const settings = getSettings();
  const active = mode ?? settings.bgMode;
  if (active === "color" || active === "transparent") return "";
  if (settings.bgSource === "url") return settings.bgUrl.trim();
  if (settings.bgSource === "upload") return getBackgroundImage();
  return coverUrl;
}

export async function storeBackgroundFile(file: File): Promise<boolean> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });

  const maxEdge = 1600;
  const ratio = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return false;
  context.drawImage(image, 0, 0, width, height);

  for (const quality of [0.92, 0.85, 0.7, 0.5, 0.35]) {
    if (setBackgroundImage(canvas.toDataURL("image/jpeg", quality))) return true;
  }
  return false;
}

export function applySettings() {
  const settings = getSettings();
  const root = document.documentElement;

  const setVar = (name: string, value: string) => root.style.setProperty(name, value);

  setVar("--ll-font-scale", String((clamp(settings.fontScale, 50, 200) / 100) * 1.2));
  const fadeTop = clamp(settings.fadeTop, 0, 45);
  const fadeBottom = clamp(settings.fadeBottom, 0, 45);
  setVar("--ll-fade-top", `${fadeTop}%`);
  setVar("--ll-fade-bottom", `${fadeBottom}%`);
  root.classList.toggle("ll-no-lyrics-fade", fadeTop === 0 && fadeBottom === 0);

  setVar("--ll-bg-color", settings.bgColor);
  setVar("--ll-bg-scale", String(clamp(settings.bgScale, 10, 400) / 100));
  setVar("--ll-bg-opacity", String(clamp(settings.bgOpacity, 0, 100) / 100));
  setVar(
    "--ll-bg-spin-duration",
    settings.bgRotationSpeed <= 0 ? "0s" : `${Math.round(30000 / (settings.bgRotationSpeed / 100))}ms`,
  );
  setVar("--ll-bg-backdrop-blur", `${clamp(settings.bgBlur, 0, 150)}px`);
  setVar(
    "--ll-bg-filter",
    [
      `blur(${clamp(settings.bgBlur, 0, 150)}px)`,
      `saturate(${clamp(settings.bgSaturation, 0, 500)}%)`,
      `brightness(${clamp(settings.bgBrightness, 0, 200)}%)`,
      `contrast(${clamp(settings.bgContrast, 0, 300)}%)`,
    ].join(" "),
  );
  setVar(
    "--ll-bg-canvas-filter",
    `brightness(${clamp(settings.bgBrightness, 0, 200)}%) contrast(${clamp(settings.bgContrast, 0, 300)}%)`,
  );

  setVar("--ll-card-radius", `${clamp(settings.cardRadius, 0, 48)}px`);
  setVar("--ll-card-cover-radius", `${clamp(settings.cardCoverRadius, 0, 48)}px`);
  setVar("--ll-npv-card-height", `${clamp(settings.npvCardHeight, 20, 100)}vh`);
  setVar("--ll-npv-card-min-height", `${clamp(settings.npvCardMinHeight, 100, 1200)}px`);

  root.classList.toggle("ll-hide-own-button", !settings.showOwnButton);
  root.classList.toggle("ll-hide-spotify-lyrics-button", settings.spotifyLyricsButton === "hide");
  root.classList.toggle("ll-hide-title", !settings.showTitle);
  root.classList.toggle("ll-hide-header-links", !settings.showHeaderLinks);
  root.classList.toggle("ll-npv-background", settings.npvBackground);
  root.classList.toggle("ll-npv-hide-card", !settings.npvShowCard);
  root.classList.toggle("ll-npv-replace-spotify-lyrics", settings.npvShowCard && settings.npvReplaceSpotifyLyrics);
  root.classList.toggle("ll-simple-lyrics", settings.simpleLyrics);
  root.classList.toggle("ll-no-word-glow", !settings.wordGlow || settings.simpleLyrics);
  root.classList.toggle("ll-minimal-lyrics", settings.minimalLyrics);
  root.classList.toggle("ll-translation-main", settings.translationLayout === "main");
  root.classList.toggle("ll-translation-only", settings.translationLayout === "only");
}

function writeSettings(next: Settings) {
  cached = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
  }
  applySettings();
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

function readStored(): Partial<Settings> {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return {};
  }
  if (!raw) return {};

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};

  const source = parsed as Record<string, unknown>;
  const result: Partial<Settings> = {};

  for (const key of Object.keys(DEFAULT_SETTINGS) as Array<keyof Settings>) {
    const value = source[key];
    const fallback = DEFAULT_SETTINGS[key];

    if (typeof fallback === "boolean") {
      if (typeof value === "boolean") (result as any)[key] = value;
      continue;
    }
    if (typeof fallback === "number") {
      const range = SETTING_RANGES[key as NumericSetting];
      if (typeof value === "number" && Number.isFinite(value) && range) {
        (result as any)[key] = clamp(Math.round(value), range.min, range.max);
      }
      continue;
    }
    if (typeof value === "string" && isValidEnum(key, value)) {
      (result as any)[key] = value;
    }
  }

  return result;
}

const ENUM_VALUES: Partial<Record<keyof Settings, readonly string[]>> = {
  spotifyLyricsButton: ["keep", "hide", "override"],
  bgMode: ["transparent", "color", "image", "animated", "kawarp"],
  bgSource: ["albumArt", "url", "upload"],
  cardStyle: ["default", "cover", "canvas"],
  fsCardStyle: ["default", "cover", "canvas"],
  translationLayout: ["below", "main", "only"],
  cardCanvasTitle: ["overlay", "below", "hidden"],
  cardCanvasVinyl: ["overlay", "below", "hidden"],
  cardSide: ["left", "right"],
  pageControlPosition: ["bottom", "top", "left", "right"],
  fsControlPosition: ["bottom", "top", "left", "right"],
};

function isValidEnum(key: keyof Settings, value: string): boolean {
  const allowed = ENUM_VALUES[key];
  if (!allowed) return value.length <= 2048;
  return allowed.includes(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
