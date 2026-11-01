import { currentItem, extractColors, onPlayer } from "@/lib/spotikit";

const AUTO_VAR = "--liquid-lyrics-accent-auto";
const MAX_SAMPLE_PIXELS = 1e6;

let lastUri = "";
let registered = false;

export function registerAccent() {
  if (registered) return;
  registered = true;

  void updateAccent();
  try {
    onPlayer("track", (state?: any) => void updateAccent(state?.item));
  } catch {
  }
}

async function updateAccent(preferredItem?: any) {
  const item = preferredItem ?? currentItem();
  const uri = item?.uri;
  if (!uri || uri === lastUri) return;
  lastUri = uri;

  const color = (await getDominantColor(coverUrlOf(item))) ?? (await extractPaletteColor(uri));
  if (!color) {
    lastUri = "";
    return;
  }
  document.documentElement.style.setProperty(AUTO_VAR, boost(color));
}

function coverUrlOf(item: any): string | null {
  const raw = item?.metadata?.image_url;
  if (typeof raw !== "string" || !raw) return null;
  return raw.replace("spotify:image:", "https://i.scdn.co/image/");
}

async function getDominantColor(url: string | null): Promise<string | null> {
  if (!url) return null;

  if (/^https?:/i.test(url)) {
    const cors = await loadImage(url, true);
    const color = cors && averageColorOf(cors);
    if (color) return color;
  }

  const plain = await loadImage(url, false);
  return plain ? averageColorOf(plain) : null;
}

function loadImage(url: string, anonymous: boolean): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    if (anonymous) img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function averageColorOf(img: HTMLImageElement): string | null {
  try {
    const scale = Math.min(1, Math.sqrt(MAX_SAMPLE_PIXELS / (img.width * img.height)));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    if (!count) return null;

    return `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
  } catch {
    return null;
  }
}

async function extractPaletteColor(uri: string): Promise<string | null> {
  const colors = await extractColors(uri);
  for (const value of [colors?.raw, colors?.light, colors?.dark]) {
    if (typeof value === "string" && toRgb(value)) return value.trim();
  }
  return null;
}

function boost(color: string): string {
  const rgb = toRgb(color);
  if (!rgb) return color;

  const { h, s, l } = rgbToHsl(rgb);
  return hslToCss({
    h,
    s: Math.min(1, s * 1.35 + 0.08),
    l: Math.min(0.72, Math.max(0.46, l * 1.15)),
  });
}

type Rgb = { r: number; g: number; b: number };

function toRgb(color: string): Rgb | null {
  const hex = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (hex) {
    const value = Number.parseInt(hex[1], 16);
    return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
  }

  const parts = color.match(/\d+(\.\d+)?/g);
  if (parts && parts.length >= 3) {
    return { r: Number(parts[0]), g: Number(parts[1]), b: Number(parts[2]) };
  }
  return null;
}

function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) return { h: 0, s: 0, l };

  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / delta) % 6;
  else if (max === gn) h = (bn - rn) / delta + 2;
  else h = (rn - gn) / delta + 4;

  h *= 60;
  if (h < 0) h += 360;
  return { h, s, l };
}

function hslToCss({ h, s, l }: { h: number; s: number; l: number }): string {
  return `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
}
