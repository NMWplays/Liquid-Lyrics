import {
  containsRomanizableScript,
  type LyricLine,
  type LyricsCredits,
  type LyricWord,
} from "@/ui/lyrics/model";
import type { RomanizationTarget } from "@/lib/romanization/modes";

export type LyricsVariant = "panel" | "sidebar";

export const UNSET = -999;

export type WordState = "idle" | "singing" | "sung";
export type LineState = "idle" | "future" | "active" | "past";

export type WordRecord = {
  el: HTMLElement;
  start: number;
  end: number;
  animateLetters: boolean;
  letters: HTMLElement[];
  state: WordState;
  fill: number;
  lift: number;
  liftAt: number;
  glow: number;
  glowAt: number;
  letterFill: Int16Array | null;
  letterLift: Float32Array | null;
  letterGlow: Float32Array | null;
};

export type LineRecord = {
  index: number;
  el: HTMLElement;
  line: LyricLine;
  start: number;
  end: number;
  state: LineState;
  dirty: boolean;
  outgoing: boolean;
  finishAt: number;
  glow: boolean;
  wordCursor: number;
  lastProgress: number;
  leadEl: HTMLElement | null;
  textEl: HTMLElement | null;
  words: WordRecord[];
  bgWords: WordRecord[];
  dots: HTMLElement[];
  dotLift: Float32Array;
  dotLit: boolean[];
  progressUnit: number;
  interludeVis: number;
  interludeY: number;
  interludeScale: number;
  displayText: string;
  displayKey: string;
  convertedWords: Map<RomanizationTarget, string[] | false>;
  convertedLine: Map<RomanizationTarget, string | false>;
  rubyWords: (string | null)[] | false | null;
  rubyLine: string | false | null;
  wrapper: HTMLElement | null;
  rowOffset: number;
};

export const DOT_LIFT_PX: Record<LyricsVariant, number> = { panel: 12, sidebar: 10 };

export function createLineRecord(line: LyricLine, index: number): LineRecord {
  const timed = line.kind !== "static";
  const el = document.createElement("div");
  el.className = "liquid-lyrics-line";

  const record: LineRecord = {
    index,
    el,
    line,
    start: timed ? line.range.start : Number.POSITIVE_INFINITY,
    end: timed ? line.range.end : Number.POSITIVE_INFINITY,
    state: "idle",
    dirty: false,
    outgoing: false,
    finishAt: 0,
    glow: false,
    wordCursor: 0,
    lastProgress: Number.NEGATIVE_INFINITY,
    leadEl: null,
    textEl: null,
    words: [],
    bgWords: [],
    dots: [],
    dotLift: EMPTY_LIFTS,
    dotLit: [],
    progressUnit: UNSET,
    interludeVis: UNSET,
    interludeY: UNSET,
    interludeScale: UNSET,
    displayText: line.kind === "interlude" ? "" : line.text,
    displayKey: "orig",
    convertedWords: new Map(),
    convertedLine: new Map(),
    rubyWords: null,
    rubyLine: null,
    wrapper: null,
    rowOffset: UNSET,
  };

  if (line.kind === "interlude") {
    el.classList.add("liquid-lyrics-interlude");
    if (index === 0) el.classList.add("ll-intro-interlude");
    el.setAttribute("aria-hidden", "true");

    record.dotLift = new Float32Array(INTERLUDE_DOTS);
    for (let dot = 0; dot < INTERLUDE_DOTS; dot++) {
      const dotEl = document.createElement("span");
      dotEl.className = "ll-interlude-dot";
      el.appendChild(dotEl);
      record.dots.push(dotEl);
      record.dotLit.push(false);
    }
    return record;
  }

  if (line.kind === "static") {
    el.classList.add("liquid-lyrics-static");
    record.textEl = appendLineText(el, line.text);
    return record;
  }

  el.setAttribute("role", "button");
  el.tabIndex = -1;

  if (line.kind === "line") {
    record.textEl = appendLineText(el, line.text);
    return record;
  }

  el.classList.add("ll-syllable-line");
  const lead = document.createElement("div");
  lead.className = "ll-vocal-line ll-lead-vocal";
  el.appendChild(lead);
  record.leadEl = lead;

  const leadWords = createWordSpans(lead, line.lead.words, "");
  for (const background of line.backgrounds) {
    const bgEl = document.createElement("div");
    bgEl.className = "ll-vocal-line ll-background-vocal";
    el.appendChild(bgEl);
    pushAll(record.bgWords, createWordSpans(bgEl, background.words, "ll-bg-syllable"));
  }
  record.words = mergeWordRecords(leadWords, record.bgWords);

  return record;
}

function appendLineText(parent: HTMLElement, text: string): HTMLElement {
  const span = document.createElement("span");
  span.className = "ll-line-text";
  span.textContent = text;
  parent.appendChild(span);
  return span;
}

export function createWordSpans(parent: HTMLElement, words: LyricWord[], extraClass: string): WordRecord[] {
  const spans: WordRecord[] = new Array(words.length);
  const last = words.length - 1;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index <= last; index++) {
    const word = words[index];
    const el = document.createElement("span");
    let className = extraClass ? `ll-syllable ${extraClass}` : "ll-syllable";
    if (word.animateLetters) className += " ll-long-syllable";
    if (containsRomanizableScript(word.text)) className += " ll-cjk-syllable";
    if (index === last) className += " LastWordInLine";
    if (word.rubyHtml) className += " ll-ruby-syllable";
    el.className = className;

    const letters: HTMLElement[] = [];
    if (word.rubyHtml) {
      el.setAttribute("aria-label", word.text);
      el.innerHTML = word.rubyHtml;
    } else if (word.animateLetters) {
      el.setAttribute("aria-label", word.text);
      for (const char of word.text) {
        const letter = document.createElement("span");
        letter.className = "ll-letter";
        letter.textContent = char;
        el.appendChild(letter);
        letters.push(letter);
      }
    } else {
      el.textContent = word.text;
    }

    fragment.appendChild(el);
    spans[index] = {
      el,
      start: word.start,
      end: word.end,
      animateLetters: word.animateLetters,
      letters,
      state: "idle",
      fill: UNSET,
      lift: 0,
      liftAt: 0,
      glow: 0,
      glowAt: 0,
      letterFill: null,
      letterLift: null,
      letterGlow: null,
    };
  }

  parent.appendChild(fragment);
  return spans;
}

export function mergeWordRecords(lead: WordRecord[], backgrounds: WordRecord[]): WordRecord[] {
  if (backgrounds.length === 0) return lead;
  const merged = lead.concat(backgrounds);
  merged.sort(byStart);
  return merged;
}

function byStart(a: WordRecord, b: WordRecord): number {
  return a.start - b.start;
}

export function createCreditsElement(credits: LyricsCredits): HTMLElement {
  const el = document.createElement("div");
  el.className = "liquid-lyrics-credits";

  if (credits.writers.length > 0) {
    const writers = document.createElement("div");
    writers.className = "ll-credits-writers";
    writers.textContent = `Written by ${credits.writers.join(", ")}`;
    el.appendChild(writers);
  }
  if (credits.source) {
    const source = document.createElement("div");
    source.className = "ll-credits-source";
    source.textContent = credits.source;
    el.appendChild(source);
  }

  return el;
}

type HeightModel = {
  charsPerLine: number;
  lineHeight: number;
  padding: number;
  background: number;
  interlude: number;
};

const HEIGHT_MODELS: Record<LyricsVariant, HeightModel> = {
  panel: { charsPerLine: 42, lineHeight: 45, padding: 18, background: 24, interlude: 54 },
  sidebar: { charsPerLine: 26, lineHeight: 26, padding: 6, background: 16, interlude: 34 },
};

export function estimateLineHeight(record: LineRecord, variant: LyricsVariant): number {
  const model = HEIGHT_MODELS[variant];
  if (record.line.kind === "interlude") return model.interlude;

  const textLength = Math.max(1, record.displayText.length);
  const wrappedLines = Math.max(1, Math.ceil(textLength / model.charsPerLine));
  const backgroundLines = record.line.kind === "syllable" ? record.line.backgrounds.length : 0;
  return model.padding + wrappedLines * model.lineHeight + backgroundLines * model.background;
}

const INTERLUDE_DOTS = 3;
const EMPTY_LIFTS = new Float32Array(0);

function pushAll<T>(target: T[], items: T[]) {
  for (let index = 0; index < items.length; index++) target.push(items[index]);
}
