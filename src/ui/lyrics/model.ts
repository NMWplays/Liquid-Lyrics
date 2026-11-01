import type { LineContent, Lyrics, Syllable, SyllableData, VocalPart } from "@/lib/api/types";

export const INTRO_THRESHOLD_MS = 500;
export const DEFAULT_LINE_DURATION_MS = 4500;
export const MIN_LINE_DURATION_MS = 250;
export const MIN_SYLLABLE_DURATION_MS = 80;
export const GAP_INTERLUDE_MS = 3000;

const SAME_START_EPSILON_MS = 12;
const LETTER_ANIMATION_MIN_DURATION_MS = 750;
const LETTER_ANIMATION_MIN_PER_LETTER_MS = 90;
const LETTER_ANIMATION_MIN_LETTERS = 3;

export type TimeRange = {
  start: number;
  end: number;
};

export type LyricWord = TimeRange & {
  text: string;
  romanizedText?: string;
  rubyHtml?: string;
  animateLetters: boolean;
};

export type LyricVocal = {
  range: TimeRange;
  sourceText: string;
  words: LyricWord[];
};

export type LyricLine =
  | { kind: "interlude"; range: TimeRange }
  | { kind: "static"; text: string; romanizedText: string }
  | { kind: "line"; range: TimeRange; text: string; romanizedText: string }
  | {
      kind: "syllable";
      range: TimeRange;
      text: string;
      romanizedText: string;
      lead: LyricVocal;
      backgrounds: LyricVocal[];
    };

export function buildLyricLines(lyrics: Lyrics): LyricLine[] {
  if (lyrics.Type === "Line") return buildFromLineData(lyrics.Content ?? []);
  if (lyrics.Type === "Syllable") return buildFromSyllableData(lyrics.Content ?? []);

  return (lyrics.Lines ?? [])
    .map((line) => ({
      kind: "static" as const,
      text: cleanText(line.Text),
      romanizedText: cleanText(line.RomanizedText),
    }))
    .filter((line) => line.text);
}

function buildFromLineData(content: LineContent[]): LyricLine[] {
  const lines: LyricLine[] = [];
  const firstStart = toTime(content[0]?.StartTime, 0);

  if (content.length > 0 && firstStart > INTRO_THRESHOLD_MS) {
    lines.push(createInterlude(0, firstStart));
  }

  content.forEach((line, index) => {
    const next = content[index + 1];
    const range = normalizeLineRange(line, next);

    if (line.Type === "Interlude") {
      lines.push(createInterlude(range.start, range.end));
    } else {
      lines.push({
        kind: "line",
        range,
        text: cleanText(line.Text),
        romanizedText: cleanText(line.RomanizedText),
      });
    }

    appendGapInterlude(lines, range.end, toTime(next?.StartTime, NaN));
  });

  return lines;
}

function buildFromSyllableData(content: SyllableData["Content"]): LyricLine[] {
  const lines: LyricLine[] = [];
  const blocks = content.map((item, index) => normalizeSyllableBlock(item, content[index + 1]));

  if (blocks.length > 0 && blocks[0].range.start > INTRO_THRESHOLD_MS) {
    lines.push(createInterlude(0, blocks[0].range.start));
  }

  blocks.forEach((block, index) => {
    lines.push({
      kind: "syllable",
      range: block.range,
      text: block.lead.sourceText || block.lead.words.map((word) => word.text).join(" ").trim(),
      romanizedText: getWordsRomanizedText(block.lead.words),
      lead: block.lead,
      backgrounds: block.backgrounds,
    });

    appendGapInterlude(lines, block.range.end, blocks[index + 1]?.range.start ?? NaN);
  });

  return lines;
}

function createInterlude(start: number, end: number): LyricLine {
  return { kind: "interlude", range: { start, end: Math.max(end, start + MIN_LINE_DURATION_MS) } };
}

function appendGapInterlude(lines: LyricLine[], previousEnd: number, nextStart: number) {
  if (!Number.isFinite(nextStart)) return;
  if (nextStart - previousEnd < GAP_INTERLUDE_MS) return;
  lines.push(createInterlude(previousEnd, nextStart));
}

function normalizeLineRange(line: LineContent, next?: LineContent): TimeRange {
  const start = toTime(line.StartTime, 0);
  const nextStart = toTime(next?.StartTime, NaN);
  const rawEnd = toTime(line.EndTime, start + DEFAULT_LINE_DURATION_MS);
  const end = extendEndAcrossSmallGap(rawEnd, nextStart);

  return { start, end: normalizeEnd(end, start, end, MIN_LINE_DURATION_MS) };
}

function normalizeSyllableBlock(
  item: SyllableData["Content"][number],
  next?: SyllableData["Content"][number],
): { range: TimeRange; lead: LyricVocal; backgrounds: LyricVocal[] } {
  const lead = normalizeVocalPart(item.Lead);
  const backgrounds = (item.Background ?? []).map((part) => normalizeVocalPart(part));
  const nextStart = toTime(next?.Lead?.StartTime, NaN);

  const start = lead.range.start;
  const fallbackEnd = Number.isFinite(nextStart) && nextStart > start ? nextStart : start + DEFAULT_LINE_DURATION_MS;
  const naturalEnd = Math.max(lead.range.end, ...backgrounds.map((part) => part.range.end));
  const end = extendEndAcrossSmallGap(naturalEnd, nextStart);

  const hasRealEnd = hasVocalEndTime(item.Lead) || (item.Background ?? []).some(hasVocalEndTime);
  const hardMaxEnd = hasRealEnd ? Number.POSITIVE_INFINITY : fallbackEnd;

  return {
    range: { start, end: normalizeEnd(end, start, fallbackEnd, MIN_LINE_DURATION_MS, hardMaxEnd) },
    lead,
    backgrounds,
  };
}

function hasVocalEndTime(part?: VocalPart | null): boolean {
  const start = toTime(part?.StartTime, 0);
  const end = Number(part?.EndTime);
  return Number.isFinite(end) && end > start;
}

function normalizeVocalPart(part: VocalPart): LyricVocal {
  const start = toTime(part?.StartTime, 0);
  const rawEnd = Number(part?.EndTime);
  const end = Number.isFinite(rawEnd) && rawEnd > start ? toTime(rawEnd, start) : start + DEFAULT_LINE_DURATION_MS;
  const range = { start, end };

  return {
    range,
    sourceText: getVocalPartOriginalText(part),
    words: normalizeWordTimeline(groupSyllablesIntoWords(part?.Syllables ?? [], range), range),
  };
}

function groupSyllablesIntoWords(syllables: Syllable[], lineRange: TimeRange): LyricWord[] {
  const words: LyricWord[] = [];
  let pending: LyricWord | null = null;
  let previousWasPart = false;

  syllables.forEach((syl, index) => {
    const part: LyricWord = {
      text: cleanText(syl.Text),
      romanizedText: cleanText(syl.RomanizedText),
      start: toTime(syl.StartTime, lineRange.start),
      end: toTime(syl.EndTime, lineRange.start + MIN_SYLLABLE_DURATION_MS),
      animateLetters: false,
    };
    const joinsWord =
      Boolean(syl.IsPartOfWord || previousWasPart) &&
      !containsRomanizableScript(part.text) &&
      !containsRomanizableScript(pending?.text ?? "");

    if (joinsWord && pending) {
      pending.text += part.text;
      pending.romanizedText = mergeWordText(pending.romanizedText, part.romanizedText, " ");
      pending.start = Math.min(pending.start, part.start);
      pending.end = Math.max(pending.end, part.end);
    } else {
      if (pending && !joinsWord) words.push(pending);
      pending = part;
    }

    previousWasPart = Boolean(syl.IsPartOfWord);

    if (!syl.IsPartOfWord || index === syllables.length - 1) {
      if (pending) {
        words.push(pending);
        pending = null;
      }
    }
  });

  return words.filter((word) => word.text);
}

function normalizeWordTimeline(words: LyricWord[], lineRange: TimeRange): LyricWord[] {
  if (words.length === 0) return [];

  const lineStart = lineRange.start;
  const lineEnd = Math.max(lineRange.end, lineStart + MIN_LINE_DURATION_MS);
  const clamped = words
    .map((word) => ({
      ...word,
      start: clamp(word.start, lineStart, lineEnd),
      end: clamp(word.end, lineStart, lineEnd),
    }))
    .filter((word) => word.text.trim().length > 0);

  let previousStart = lineStart;
  clamped.forEach((word) => {
    word.start = Math.max(previousStart, word.start);
    previousStart = word.start;
  });

  const groups: LyricWord[][] = [];
  clamped.forEach((word) => {
    const group = groups[groups.length - 1];
    const groupStart = group?.[0]?.start;
    if (group && groupStart !== undefined && Math.abs(word.start - groupStart) <= SAME_START_EPSILON_MS) {
      word.start = groupStart;
      group.push(word);
    } else {
      groups.push([word]);
    }
  });

  const normalized: LyricWord[] = [];
  groups.forEach((group, groupIndex) => {
    const groupStart = group[0].start;
    const nextGroupStart = groups[groupIndex + 1]?.[0]?.start ?? lineEnd;
    const groupEnd = Math.max(groupStart + 1, nextGroupStart);

    if (group.length === 1) {
      normalized.push({ ...group[0], start: groupStart, end: getWordEnd(group[0].end, groupStart, groupEnd) });
      return;
    }

    distributeSameStartWords(group, groupStart, groupEnd).forEach((word) => normalized.push(word));
  });

  return normalized.map((word, index) => {
    const nextStart = normalized[index + 1]?.start ?? lineEnd;
    const hardEnd = Math.max(word.start + 1, nextStart);
    const end = Math.min(Math.max(word.end, word.start + 1), hardEnd);
    return { ...word, end, animateLetters: shouldAnimateLetters(word.text, word.start, end) };
  });
}

function distributeSameStartWords(words: LyricWord[], groupStart: number, groupEnd: number): LyricWord[] {
  const usableEnd = Math.max(groupEnd, groupStart + words.length * MIN_SYLLABLE_DURATION_MS);
  const totalWeight = words.reduce((sum, word) => sum + getWordWeight(word.text), 0) || words.length;
  let cursor = groupStart;

  return words.map((word, index) => {
    const isLast = index === words.length - 1;
    const remainingWords = words.length - index;
    const remainingTime = Math.max(1, usableEnd - cursor);
    const weightedDuration = ((usableEnd - groupStart) * getWordWeight(word.text)) / totalWeight;
    const maxDuration = Math.max(1, remainingTime - (remainingWords - 1));
    const start = cursor;
    const end = isLast ? usableEnd : cursor + clamp(weightedDuration, 1, maxDuration);
    cursor = end;
    return { ...word, start, end };
  });
}

function getWordEnd(rawEnd: number, start: number, nextStart: number): number {
  if (Number.isFinite(rawEnd) && rawEnd > start) return Math.min(rawEnd, nextStart);
  return nextStart;
}

function getWordWeight(text: string): number {
  return Math.max(1, Array.from(text.trim()).length);
}

export function shouldAnimateLetters(text: string, start: number, end: number): boolean {
  const letters = Array.from(text.trim());
  if (letters.length < LETTER_ANIMATION_MIN_LETTERS) return false;

  const duration = end - start;
  if (duration < LETTER_ANIMATION_MIN_DURATION_MS) return false;
  if (duration / letters.length < LETTER_ANIMATION_MIN_PER_LETTER_MS) return false;

  return letters.some((letter) => /[A-Za-z0-9]/.test(letter));
}

export function getWordsRomanizedText(words: LyricWord[]): string {
  return words
    .map((word) => cleanRomanizedCandidate(word.romanizedText))
    .filter(Boolean)
    .join(" ")
    .trim();
}

export type LyricsCredits = {
  writers: string[];
  source: string;
};

export function getLyricsCredits(lyrics: Lyrics): LyricsCredits | null {
  const writers = Array.isArray(lyrics.SongWriters)
    ? Array.from(new Set(lyrics.SongWriters.map((writer) => cleanText(writer)).filter(Boolean)))
    : [];
  const source = creditSourceLine(lyrics);
  if (writers.length === 0 && !source) return null;
  return { writers, source };
}

function creditSourceLine(lyrics: Lyrics): string {
  const provider = (lyrics as { Provider?: string }).Provider;
  const custom = cleanText((lyrics as { LiquidLyricsCredit?: unknown }).LiquidLyricsCredit);

  if (provider === "local") return custom ? `Synced by ${custom}` : "Custom sync";
  if (custom) return `Synced by ${custom}`;
  if (provider === "spicy") {
    if (lyrics.source === "spl") {
      const maker = cleanText(lyrics.TTMLUploadMetadata?.Maker?.username) ||
        cleanText(lyrics.TTMLUploadMetadata?.Uploader?.username);
      return maker ? `via Spicy Lyrics (community) · Made by @${maker}` : "via Spicy Lyrics (community)";
    }
    return "via Spicy Lyrics";
  }
  if (provider === "spotify") return "via Spotify";
  return "";
}

export function cleanText(value: unknown): string {
  return canonicalize(String(value ?? "").replace(/\s+/g, " ").trim());
}

const LOOKALIKE = /[⺀-⻿⼀-⿟豈-﫿︰-﹏＀-￯]/;

function canonicalize(text: string): string {
  if (!LOOKALIKE.test(text)) return text;

  let result = "";
  for (const char of text) {
    const normalized = char.normalize("NFKC");
    result += Array.from(normalized).length === 1 ? normalized : char;
  }
  return result;
}

export function cleanRomanizedCandidate(value: unknown): string {
  const text = cleanText(value);
  return text && !containsRomanizableScript(text) ? text : "";
}

export function containsRomanizableScript(text: string): boolean {
  return /[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(text);
}

export function getRomanizationSourceLanguage(text: string): string {
  if (/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(text)) return "ja";
  if (/[가-힯]/.test(text)) return "ko";
  return "auto";
}

function getVocalPartOriginalText(part?: VocalPart | null): string {
  const enriched = cleanText((part as any)?.LiquidLyricsOriginalText);
  return enriched || getRawSyllableText(part?.Syllables ?? []);
}

function getRawSyllableText(syllables: Syllable[]): string {
  let result = "";
  let previousText = "";
  let previousWasPart = false;

  syllables.forEach((syl) => {
    const text = cleanText(syl.Text);
    if (!text) return;

    const joinWithoutSpace =
      !result || syl.IsPartOfWord || previousWasPart || shouldJoinRawSyllableText(previousText, text);

    result += joinWithoutSpace ? text : ` ${text}`;
    previousText = text;
    previousWasPart = Boolean(syl.IsPartOfWord);
  });

  return result.trim();
}

function shouldJoinRawSyllableText(left: string, right: string): boolean {
  if (!left || !right) return true;
  if (/^[,.;:!?)]/.test(right)) return true;
  if (/[(]$/.test(left)) return true;
  return containsRomanizableScript(left) || containsRomanizableScript(right);
}

function mergeWordText(left: string | undefined, right: string | undefined, separator: string): string | undefined {
  const leftText = cleanText(left);
  const rightText = cleanText(right);
  if (!leftText) return rightText || undefined;
  if (!rightText) return leftText;
  return `${leftText}${separator}${rightText}`;
}

function extendEndAcrossSmallGap(end: number, nextStart: number): number {
  if (!Number.isFinite(nextStart) || nextStart <= end) return end;
  return nextStart - end < GAP_INTERLUDE_MS ? nextStart : end;
}

function normalizeEnd(
  rawEnd: unknown,
  start: number,
  fallbackEnd: number,
  minDuration: number,
  hardMaxEnd = Number.POSITIVE_INFINITY,
): number {
  const end = toTime(rawEnd, fallbackEnd);
  const normalizedEnd = end >= start + minDuration ? end : Math.max(fallbackEnd, start + minDuration);
  return Math.min(normalizedEnd, hardMaxEnd);
}

export function toTime(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, numeric);
}

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function rangeProgress(range: TimeRange, progress: number): number {
  return clamp((progress - range.start) / Math.max(1, range.end - range.start));
}

export function smoothstep(edge0: number, edge1: number, value: number): number {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}
