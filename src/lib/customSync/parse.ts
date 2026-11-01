import type { EditorLine, EditorToken } from "@/lib/customSync/types";

const CJK_RE = /[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿가-힯]/;
const INTERLUDE_RE = /^#\s*interlude\b/i;
const BACKGROUND_RE = /^\[(.+)\]$/;

export function isInterludeMarker(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  return INTERLUDE_RE.test(trimmed);
}

export function backgroundMarkerText(line: string): string | null {
  const match = line.trim().match(BACKGROUND_RE);
  if (!match) return null;
  const inner = match[1].trim();
  return inner.length ? inner : null;
}

export function tokenizeWords(text: string): string[] {
  const chunks = text.split(/\s+/).filter((chunk) => chunk.length > 0);
  const tokens: string[] = [];

  for (const chunk of chunks) {
    if (!CJK_RE.test(chunk)) {
      tokens.push(chunk);
      continue;
    }
    let latin = "";
    for (const char of Array.from(chunk)) {
      if (CJK_RE.test(char)) {
        if (latin) {
          tokens.push(latin);
          latin = "";
        }
        tokens.push(char);
      } else {
        latin += char;
      }
    }
    if (latin) tokens.push(latin);
  }

  return tokens;
}

export function makeTokens(text: string): EditorToken[] {
  return tokenizeWords(text).map((token) => ({ text: token, start: null }));
}

export function parseText(raw: string): EditorLine[] {
  const lines: EditorLine[] = [];

  for (const rawLine of raw.split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    if (isInterludeMarker(trimmed)) {
      lines.push({ kind: "interlude", start: null });
      continue;
    }

    const background = backgroundMarkerText(trimmed);
    if (background != null) {
      const previous = lines[lines.length - 1];
      if (previous?.kind === "lyric") {
        previous.backgrounds.push({ text: background, tokens: makeTokens(background), start: null, end: null });
      }
      continue;
    }

    lines.push({ kind: "lyric", text: trimmed, tokens: makeTokens(trimmed), backgrounds: [], start: null, end: null });
  }

  return lines;
}

export function linesToText(lines: EditorLine[]): string {
  const out: string[] = [];
  for (const line of lines) {
    if (line.kind === "interlude") {
      out.push("#interlude");
      continue;
    }
    out.push(line.text);
    for (const background of line.backgrounds) out.push(`[${background.text}]`);
  }
  return out.join("\n");
}
