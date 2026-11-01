import type { EditorDraft, EditorLine } from "@/lib/customSync/types";
import { createDraft, type TrackMeta } from "@/lib/customSync/convert";
import { makeTokens, parseText } from "@/lib/customSync/parse";

export function textToDraft(text: string, meta: TrackMeta, mode: EditorDraft["mode"]): EditorDraft {
  const draft = createDraft(meta, mode);
  draft.lines = parseText(text);
  return draft;
}

const LRC_TAG_RE = /\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;

export function lrcToDraft(text: string, meta: TrackMeta): EditorDraft | null {
  const entries: { time: number; text: string }[] = [];

  for (const rawLine of text.split(/\r?\n/)) {
    LRC_TAG_RE.lastIndex = 0;
    const tags: number[] = [];
    let match: RegExpExecArray | null;
    while ((match = LRC_TAG_RE.exec(rawLine)) !== null) {
      tags.push(lrcTimeToMs(match[1], match[2], match[3]));
    }
    if (tags.length === 0) continue;

    const lyric = rawLine.replace(LRC_TAG_RE, "").trim();
    for (const time of tags) entries.push({ time, text: lyric });
  }

  if (entries.length === 0) return null;
  entries.sort((a, b) => a.time - b.time);

  const draft = createDraft(meta, "line");
  draft.lines = entries.map((entry): EditorLine => {
    if (!entry.text) return { kind: "interlude", start: entry.time };
    return { kind: "lyric", text: entry.text, tokens: makeTokens(entry.text), backgrounds: [], start: entry.time, end: null };
  });
  return draft;
}

function lrcTimeToMs(minutes: string, seconds: string, fraction?: string): number {
  const min = Number(minutes) || 0;
  const sec = Number(seconds) || 0;
  const frac = fraction ? Number(fraction.padEnd(3, "0").slice(0, 3)) : 0;
  return min * 60000 + sec * 1000 + frac;
}
