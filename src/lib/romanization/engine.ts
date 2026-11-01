import { detectHanScript } from "@/lib/romanization/detect";
import { romanizeHangul } from "@/lib/romanization/korean";
import {
  furiganaJapaneseLine,
  furiganaJapaneseWords,
  convertJapaneseLine,
  convertJapaneseWords,
  type JapaneseTextTarget,
} from "@/lib/romanization/japanese";
import type { RomanizationTarget } from "@/lib/romanization/modes";

const OPENCC_SCRIPT_URLS = [
  "https://cdn.jsdelivr.net/npm/opencc-js@1.4.1/dist/umd/full.js",
  "https://fastly.jsdelivr.net/npm/opencc-js@1.4.1/dist/umd/full.js",
  "https://unpkg.com/opencc-js@1.4.1/dist/umd/full.js",
];

const RESULT_CACHE_LIMIT = 900;
const resultCache = new Map<string, unknown>();

function cacheKey(target: RomanizationTarget, text: string): string {
  return `${target}\u0000${text}`;
}

function remember<T>(key: string, value: T): T {
  if (value === null) return value;
  if (resultCache.size >= RESULT_CACHE_LIMIT) {
    const oldest = resultCache.keys().next().value;
    if (oldest !== undefined) resultCache.delete(oldest);
  }
  resultCache.set(key, value);
  return value;
}

export async function convertWords(words: string[], target: RomanizationTarget): Promise<string[] | null> {
  if (words.length === 0) return [];

  const key = cacheKey(target, words.join(""));
  const cached = resultCache.get(key);
  if (cached) return cached as string[];

  return remember(key, await convertWordsUncached(words, target));
}

async function convertWordsUncached(words: string[], target: RomanizationTarget): Promise<string[] | null> {
  switch (target) {
    case "romaji":
    case "hiragana":
    case "katakana":
      return convertJapaneseWords(words, target as JapaneseTextTarget);
    case "furigana":
      return null;
    case "romaja":
      return words.map((word) => collapse(romanizeHangul(word)));
    case "simplified":
    case "traditional":
      return convertHanWords(words, target);
    default:
      return null;
  }
}

export async function convertLine(text: string, target: RomanizationTarget): Promise<string | null> {
  const source = collapse(text);
  if (!source) return "";

  const key = cacheKey(target, source);
  const cached = resultCache.get(key);
  if (cached) return cached as string;

  return remember(key, await convertLineUncached(source, target));
}

async function convertLineUncached(source: string, target: RomanizationTarget): Promise<string | null> {
  switch (target) {
    case "romaji":
    case "hiragana":
    case "katakana":
      return convertJapaneseLine(source, target as JapaneseTextTarget);
    case "furigana":
      return null;
    case "romaja":
      return collapse(romanizeHangul(source));
    case "simplified":
    case "traditional":
      return convertHanLine(source, target);
    default:
      return null;
  }
}

export async function convertRubyWords(words: string[], target: RomanizationTarget): Promise<(string | null)[] | null> {
  if (target !== "furigana") return null;

  const key = cacheKey(target, words.join(""));
  const cached = resultCache.get(key);
  if (cached) return cached as (string | null)[];

  return remember(key, await furiganaJapaneseWords(words));
}

export async function convertRubyLine(text: string, target: RomanizationTarget): Promise<string | null> {
  if (target !== "furigana") return null;

  const source = collapse(text);
  const key = cacheKey(target, source);
  const cached = resultCache.get(key);
  if (cached) return cached as string;

  return remember(key, await furiganaJapaneseLine(source));
}

type OpenCCConverter = (text: string) => string;
type OpenCCLocale = "cn" | "tw" | "hk" | "t";

let sourceLocale: OpenCCLocale = "cn";

export function prepareChinese(texts: string[]): void {
  sourceLocale = detectHanScript(texts) === "traditional" ? "t" : "cn";
}

async function convertHanLine(text: string, target: RomanizationTarget): Promise<string | null> {
  const convert = await getHanConverter(target);
  if (!convert) return null;
  return collapse(convert(text));
}

async function convertHanWords(words: string[], target: RomanizationTarget): Promise<string[] | null> {
  const convert = await getHanConverter(target);
  if (!convert) return null;

  const joined = words.join("");
  const converted = convert(joined);

  if (converted.length !== joined.length) {
    return words.map((word) => collapse(convert(word)));
  }

  const result: string[] = [];
  let cursor = 0;
  for (const word of words) {
    result.push(collapse(converted.slice(cursor, cursor + word.length)));
    cursor += word.length;
  }
  return result;
}

const converterCache = new Map<string, OpenCCConverter>();

async function getHanConverter(target: RomanizationTarget): Promise<OpenCCConverter | null> {
  const to: OpenCCLocale = target === "traditional" ? "tw" : "cn";
  if ((to === "cn" && sourceLocale === "cn") || (to === "tw" && sourceLocale === "t")) {
    return (text: string) => text;
  }

  const key = `${sourceLocale}->${to}`;
  const cached = converterCache.get(key);
  if (cached) return cached;

  const OpenCC = await loadOpenCC();
  if (!OpenCC) return null;

  try {
    const converter = OpenCC.Converter({ from: sourceLocale, to }) as OpenCCConverter;
    converterCache.set(key, converter);
    return converter;
  } catch (error) {
    console.warn("[Liquid Lyrics] OpenCC could not build a converter.", error);
    return null;
  }
}

async function loadOpenCC(): Promise<any | null> {
  const ready = () => Boolean((window as any).OpenCC?.Converter);
  const loaded = await loadAnyScript(OPENCC_SCRIPT_URLS, ready);
  if (!loaded) {
    console.warn("[Liquid Lyrics] Chinese conversion unavailable: OpenCC could not be loaded.");
    return null;
  }
  return (window as any).OpenCC;
}

const scriptPromises = new Map<string, Promise<boolean>>();

async function loadAnyScript(urls: string[], isReady: () => boolean): Promise<boolean> {
  for (const url of urls) {
    if (await loadScript(url, isReady)) return true;
  }
  return false;
}

function loadScript(url: string, isReady: () => boolean): Promise<boolean> {
  if (isReady()) return Promise.resolve(true);

  let promise = scriptPromises.get(url);
  if (!promise) {
    promise = new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve(isReady());
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
    scriptPromises.set(url, promise);
    void promise.then((ok) => {
      if (!ok) scriptPromises.delete(url);
    });
  }
  return promise;
}

function collapse(text: string): string {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}
