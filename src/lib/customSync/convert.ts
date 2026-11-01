import type {
  InterludeContent,
  LineContent,
  LineData,
  Lyrics,
  StaticData,
  Syllable,
  SyllableContent,
  SyllableData,
  VocalPart,
} from "@/lib/api/types";
import type { EditorBackground, EditorDraft, EditorLine, SyncMode } from "@/lib/customSync/types";
import { makeTokens } from "@/lib/customSync/parse";

const DEFAULT_LAST_LINE_MS = 4500;
const MIN_LINE_MS = 250;

export type TrackMeta = {
  trackId: string;
  trackUri: string;
  title: string;
  artist: string;
  durationMs: number;
};

export function createDraft(meta: TrackMeta, mode: SyncMode): EditorDraft {
  return {
    trackId: meta.trackId,
    trackUri: meta.trackUri,
    title: meta.title,
    artist: meta.artist,
    durationMs: meta.durationMs,
    mode,
    lines: [],
    endMs: null,
    updatedAt: Date.now(),
  };
}

type TimedEvent = { line: EditorLine; start: number; end: number };

function timeline(draft: EditorDraft): TimedEvent[] {
  const synced = draft.lines
    .map((line, index) => ({ line, index }))
    .filter((entry) => entry.line.start != null)
    .sort((a, b) => a.line.start! - b.line.start! || a.index - b.index);

  const lastStart = synced[synced.length - 1]?.line.start ?? 0;
  const finalEnd = draft.endMs != null
    ? Math.max(draft.endMs, lastStart + MIN_LINE_MS)
    : lastStart + DEFAULT_LAST_LINE_MS;

  return synced.map((entry, index) => {
    const start = entry.line.start!;
    const nextStart = synced[index + 1]?.line.start ?? finalEnd;
    const end = Math.max(nextStart, start + MIN_LINE_MS);
    return { line: entry.line, start, end };
  });
}

export function draftToLyrics(draft: EditorDraft): Lyrics {
  const events = timeline(draft);

  const lyrics = events.length === 0
    ? buildStaticData(draft)
    : draft.mode === "line"
      ? buildLineData(draft, events)
      : buildSyllableData(draft, events);
  const credit = String(draft.credit ?? "").trim();
  if (credit) (lyrics as { LiquidLyricsCredit?: string }).LiquidLyricsCredit = credit;
  return lyrics;
}

function buildStaticData(draft: EditorDraft): StaticData {
  return {
    Id: draft.trackId,
    Type: "Static",
    SongWriters: [],
    Lines: draft.lines
      .filter((line) => line.kind === "lyric")
      .map((line) => ({ Text: line.kind === "lyric" ? line.text : "", IsRTL: false }))
      .filter((line) => line.Text),
    Provider: "local",
  };
}

function buildLineData(draft: EditorDraft, events: TimedEvent[]): LineData {
  const content: LineContent[] = events.map(({ line, start, end }) => {
    if (line.kind === "interlude") {
      return {
        Type: "Interlude",
        Text: "♪",
        StartTime: start,
        EndTime: end,
        OppositeAligned: false,
        IsRTL: false,
      } satisfies InterludeContent as unknown as LineContent;
    }
    return {
      Type: "Line",
      Text: line.text,
      StartTime: start,
      EndTime: end,
      OppositeAligned: false,
      IsRTL: false,
    };
  });

  return {
    Id: draft.trackId,
    Type: "Line",
    SongWriters: [],
    Content: content,
    StartTime: content[0]?.StartTime ?? 0,
    EndTime: content[content.length - 1]?.EndTime ?? 0,
    Provider: "local",
  };
}

function buildSyllableData(draft: EditorDraft, events: TimedEvent[]): SyllableData {
  const content: SyllableContent[] = events
    .filter((event) => isLineWordSynced(event.line))
    .map((event) => buildVocalBlock(event));

  return {
    Id: draft.trackId,
    Type: "Syllable",
    SongWriters: [],
    Content: content,
    StartTime: content[0]?.Lead.StartTime ?? 0,
    EndTime: content[content.length - 1]?.Lead.EndTime ?? 0,
    Provider: "local",
  };
}

function isLineWordSynced(line: EditorLine): boolean {
  if (line.kind !== "lyric") return false;
  if (line.start == null || line.end == null) return false;
  return line.tokens.length > 0 && line.tokens.every((token) => token.start != null);
}

function buildVocalBlock({ line, start }: TimedEvent): SyllableContent {
  const tokens = line.kind === "lyric" ? line.tokens : [];
  const explicitEnd = line.kind === "lyric" && line.end != null ? line.end : start + DEFAULT_LAST_LINE_MS;
  const blockEnd = Math.max(explicitEnd, start + MIN_LINE_MS);

  const content: SyllableContent = {
    Type: "Vocal",
    OppositeAligned: false,
    IsRTL: false,
    Lead: buildVocalPart(tokens, start, blockEnd),
  };

  const backgrounds = line.kind === "lyric"
    ? line.backgrounds.filter(isBackgroundSynced).map((background) => buildBackgroundPart(background, start, blockEnd))
    : [];
  if (backgrounds.length > 0) content.Background = backgrounds;

  return content;
}

function isBackgroundSynced(background: EditorBackground): boolean {
  if (background.end == null) return false;
  return background.tokens.length > 0 && background.tokens.every((token) => token.start != null);
}

function buildBackgroundPart(background: EditorBackground, lineStart: number, lineEnd: number): VocalPart {
  const bgStart = background.start ?? background.tokens[0]?.start ?? lineStart;
  const bgEnd = Math.max(background.end ?? lineEnd, bgStart + MIN_LINE_MS);
  return buildVocalPart(background.tokens, bgStart, bgEnd);
}

function buildVocalPart(
  tokens: { text: string; start: number | null }[],
  start: number,
  end: number,
): VocalPart {
  const count = tokens.length;
  const syllables: Syllable[] = tokens.map((token, index) => {
    const rawStart = token.start ?? start;
    const sylStart = clamp(rawStart, start, end);
    const rawNext = tokens[index + 1]?.start ?? end;
    const sylEnd = clamp(Math.max(rawNext, sylStart + 1), start, end);
    return {
      Text: token.text,
      IsPartOfWord: false,
      StartTime: sylStart,
      EndTime: index === count - 1 ? end : sylEnd,
    };
  });

  return { StartTime: start, EndTime: end, Syllables: syllables };
}

export function lyricsToDraft(lyrics: Lyrics, meta: TrackMeta): EditorDraft {
  if (lyrics.Type === "Static") return staticToDraft(lyrics, meta);
  if (lyrics.Type === "Line") return lineToDraft(lyrics, meta);
  return syllableToDraft(lyrics, meta);
}

function staticToDraft(lyrics: StaticData, meta: TrackMeta): EditorDraft {
  const draft = createDraft(meta, "line");
  draft.lines = (lyrics.Lines ?? [])
    .map((line) => cleanLine(line.Text))
    .filter(Boolean)
    .map((text) => ({ kind: "lyric", text, tokens: makeTokens(text), backgrounds: [], start: null, end: null }) as EditorLine);
  return draft;
}

function lineToDraft(lyrics: LineData, meta: TrackMeta): EditorDraft {
  const draft = createDraft(meta, "line");
  draft.lines = (lyrics.Content ?? []).map((line): EditorLine => {
    if (line.Type === "Interlude") {
      return { kind: "interlude", start: toNum(line.StartTime) };
    }
    const text = cleanLine(line.Text);
    return { kind: "lyric", text, tokens: makeTokens(text), backgrounds: [], start: toNum(line.StartTime), end: null };
  });
  const content = lyrics.Content ?? [];
  draft.endMs = toNum(content[content.length - 1]?.EndTime);
  return draft;
}

function syllableToDraft(lyrics: SyllableData, meta: TrackMeta): EditorDraft {
  const draft = createDraft(meta, "word");
  draft.lines = (lyrics.Content ?? []).map((item): EditorLine => {
    const syllables = item.Lead?.Syllables ?? [];
    const original = cleanLine((item as any).LiquidLyricsOriginalText || (item.Lead as any)?.LiquidLyricsOriginalText);
    const tokens = syllables
      .map((syl) => ({ text: cleanLine(syl.Text), start: toNum(syl.StartTime) }))
      .filter((token) => token.text.length > 0);
    const text = original || tokens.map((token) => token.text).join(" ");
    const backgrounds = (item.Background ?? []).map((part): EditorBackground => {
      const bgTokens = (part.Syllables ?? [])
        .map((syl) => ({ text: cleanLine(syl.Text), start: toNum(syl.StartTime) }))
        .filter((token) => token.text.length > 0);
      return {
        text: bgTokens.map((token) => token.text).join(" "),
        tokens: bgTokens,
        start: toNum(part.StartTime),
        end: toNum(part.EndTime),
      };
    });
    return { kind: "lyric", text, tokens, backgrounds, start: toNum(item.Lead?.StartTime), end: toNum(item.Lead?.EndTime) };
  });
  const content = lyrics.Content ?? [];
  draft.endMs = toNum(content[content.length - 1]?.Lead?.EndTime);
  return draft;
}

export function lyricLineCount(draft: EditorDraft): number {
  return draft.lines.filter((line) => line.kind === "lyric").length;
}

export function syncedLineCount(draft: EditorDraft): number {
  return draft.lines.filter((line) => line.start != null).length;
}

export function isDraftFullySynced(draft: EditorDraft): boolean {
  for (const line of draft.lines) {
    if (line.start == null) return false;
    if (draft.mode === "word" && line.kind === "lyric") {
      if (line.tokens.some((token) => token.start == null)) return false;
      if (line.end == null) return false;
      for (const background of line.backgrounds) {
        if (background.end == null) return false;
        if (background.tokens.some((token) => token.start == null)) return false;
      }
    }
  }
  return draft.lines.length > 0;
}

function cleanLine(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function toNum(value: unknown): number | null {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.max(0, numeric) : null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
