export type RomanizationLanguage = "ja" | "ko" | "zh";

export type RomanizationTarget =
  | "romaji"
  | "furigana"
  | "hiragana"
  | "katakana"
  | "romaja"
  | "simplified"
  | "traditional";

export const TARGETS_BY_LANGUAGE: Record<RomanizationLanguage, readonly RomanizationTarget[]> = {
  ja: ["romaji", "furigana", "hiragana", "katakana"],
  ko: ["romaja"],
  zh: ["simplified", "traditional"],
};

const DEFAULT_TARGET: Record<RomanizationLanguage, RomanizationTarget> = {
  ja: "romaji",
  ko: "romaja",
  zh: "simplified",
};

export const TARGET_INFO: Record<RomanizationTarget, { label: string; hint: string }> = {
  romaji: { label: "Romaji", hint: "Latin letters, Hepburn" },
  furigana: { label: "Furigana", hint: "Kana printed above the kanji" },
  hiragana: { label: "Hiragana", hint: "Kanji spelled out in hiragana" },
  katakana: { label: "Katakana", hint: "Kanji spelled out in katakana" },
  romaja: { label: "Romaja", hint: "Latin letters, Revised Romanization" },
  simplified: { label: "Simplified", hint: "Han characters as 简化字" },
  traditional: { label: "Traditional", hint: "Han characters as 正體字" },
};

export const LANGUAGE_LABELS: Record<RomanizationLanguage, string> = {
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
};

export function isLatinTarget(target: RomanizationTarget): boolean {
  return target === "romaji" || target === "romaja";
}

export function isRubyTarget(target: RomanizationTarget): boolean {
  return target === "furigana";
}

export function targetLanguage(target: RomanizationTarget): RomanizationLanguage {
  for (const language of Object.keys(TARGETS_BY_LANGUAGE) as RomanizationLanguage[]) {
    if (TARGETS_BY_LANGUAGE[language].includes(target)) return language;
  }
  return "ja";
}

const ENABLED_KEY = "liquid-lyrics-romanization-enabled";
const TARGET_KEYS: Record<RomanizationLanguage, string> = {
  ja: "liquid-lyrics-romanization-ja",
  ko: "liquid-lyrics-romanization-ko",
  zh: "liquid-lyrics-romanization-zh",
};
const LEGACY_MODE_KEY = "liquid-lyrics-romanization-display";
const LEGACY_FLAG_KEY = "liquid-lyrics-romanization";

export const ROMANIZATION_EVENT = "liquid-lyrics:romanization";

let enabled = readEnabled();
const chosen: Record<RomanizationLanguage, RomanizationTarget> = {
  ja: readTarget("ja"),
  ko: readTarget("ko"),
  zh: readTarget("zh"),
};

function readEnabled(): boolean {
  const stored = localStorage.getItem(ENABLED_KEY);
  if (stored === "true") return true;
  if (stored === "false") return false;
  const legacy = localStorage.getItem(LEGACY_MODE_KEY);
  if (legacy) return legacy !== "off";
  const legacyFlag = localStorage.getItem(LEGACY_FLAG_KEY);
  if (legacyFlag !== null) return legacyFlag === "true";
  return true;
}

function readTarget(language: RomanizationLanguage): RomanizationTarget {
  const stored = localStorage.getItem(TARGET_KEYS[language]) as RomanizationTarget | null;
  if (stored && TARGETS_BY_LANGUAGE[language].includes(stored)) return stored;
  if (language === "ja" && localStorage.getItem(LEGACY_MODE_KEY) === "furigana") return "furigana";
  return DEFAULT_TARGET[language];
}

export function isRomanizationEnabled(): boolean {
  return enabled;
}

export function setRomanizationEnabled(next: boolean): void {
  if (enabled === next) return;
  enabled = next;
  localStorage.setItem(ENABLED_KEY, String(next));
  emitRomanizationChange();
}

export function getTargetFor(language: RomanizationLanguage): RomanizationTarget {
  return chosen[language];
}

export function setTargetFor(language: RomanizationLanguage, target: RomanizationTarget): void {
  if (!TARGETS_BY_LANGUAGE[language].includes(target)) return;

  const changed = chosen[language] !== target || !enabled;
  chosen[language] = target;
  localStorage.setItem(TARGET_KEYS[language], target);

  if (!enabled) {
    enabled = true;
    localStorage.setItem(ENABLED_KEY, "true");
  }
  if (changed) emitRomanizationChange();
}

export function getActiveTarget(language: RomanizationLanguage | null): RomanizationTarget | null {
  if (!enabled || !language) return null;
  return chosen[language];
}

export function emitRomanizationChange(): void {
  window.dispatchEvent(new Event(ROMANIZATION_EVENT));
}
