import { detect as detectHanVariant } from "traditional-or-simplified";
import type { RomanizationLanguage } from "@/lib/romanization/modes";

const KANA = /[぀-ヿㇰ-ㇿ･-ﾟ]/;
const HANGUL = /[가-힯ᄀ-ᇿ㄰-㆏]/;
const HAN = /[㐀-䶿一-鿿豈-﫿]/;
const HAN_GLOBAL = /[㐀-䶿一-鿿豈-﫿]/g;

export function containsKana(text: string): boolean {
  return KANA.test(text);
}

export function containsHangul(text: string): boolean {
  return HANGUL.test(text);
}

export function containsHan(text: string): boolean {
  return HAN.test(text);
}

export function detectRomanizationLanguage(texts: string[]): RomanizationLanguage | null {
  let sawHan = false;
  for (const text of texts) {
    if (KANA.test(text)) return "ja";
    if (HANGUL.test(text)) return "ko";
    if (!sawHan && HAN.test(text)) sawHan = true;
  }
  return sawHan ? "zh" : null;
}

export function lineLanguage(text: string, songLanguage: RomanizationLanguage | null): RomanizationLanguage | null {
  if (KANA.test(text)) return "ja";
  if (HANGUL.test(text)) return "ko";
  if (HAN.test(text)) return songLanguage === "ja" ? "ja" : "zh";
  return null;
}

export type HanVariant = "simplified" | "traditional";

export function detectHanScript(texts: string[]): HanVariant {
  const seen = new Set<string>();
  for (const text of texts) {
    for (const char of text.match(HAN_GLOBAL) ?? []) seen.add(char);
  }
  if (seen.size === 0) return "simplified";

  try {
    const result = detectHanVariant(Array.from(seen).join(""));
    return result?.detectedCharacters === "traditional" ? "traditional" : "simplified";
  } catch {
    return "simplified";
  }
}
