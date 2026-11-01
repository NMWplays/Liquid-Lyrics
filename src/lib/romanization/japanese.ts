import DynamicDictionaries from "kuromoji/src/dict/DynamicDictionaries";
import KuromojiTokenizer from "kuromoji/src/Tokenizer";
import {
  ROMANIZATION_SYSTEM,
  getStrType,
  hasJapanese,
  hasKanji,
  hasKatakana,
  isKanji,
  isKatakana,
  patchTokens,
  toRawHiragana,
  toRawKatakana,
  toRawRomaji,
  type KuroshiroToken,
} from "kuroshiro/src/util";

const DICT_URLS = [
  "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict",
  "https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict",
  "https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict",
  "https://unpkg.com/kuromoji@0.1.2/dict",
];
const DICT_FILES = [
  "base.dat.gz", "check.dat.gz",
  "tid.dat.gz", "tid_pos.dat.gz", "tid_map.dat.gz",
  "cc.dat.gz",
  "unk.dat.gz", "unk_pos.dat.gz", "unk_map.dat.gz", "unk_char.dat.gz", "unk_compat.dat.gz", "unk_invoke.dat.gz",
];

type AlignedToken = {
  start: number;
  end: number;
  surface: string;
  reading: string;
  pronunciation: string;
  pos: string;
  posDetail: string;
};

function attachesToPrevious(token: AlignedToken): boolean {
  if (token.pos === "助動詞") return true;
  if (token.pos === "助詞" && token.posDetail === "接続助詞") return true;
  if (token.posDetail === "接尾") return true;
  if (!HAS_WORD_CHARACTER.test(token.surface)) return true;
  return false;
}

const HAS_WORD_CHARACTER = /[\p{L}\p{N}]/u;

export type JapaneseTextTarget = "romaji" | "hiragana" | "katakana";

export async function convertJapaneseWords(
  words: string[],
  target: JapaneseTextTarget,
): Promise<string[] | null> {
  if (words.length === 0) return [];

  const tokens = await tokenize(words.join(""));
  if (!tokens) return null;

  const ranges = wordRanges(words);
  const pieces: Piece[][] = words.map(() => []);

  for (const token of tokens) {
    const owners = overlappingWords(token, ranges);

    if (owners.length <= 1) {
      const text = convertToken(token, target);
      if (text && owners.length === 1) pushPiece(pieces[owners[0]], text, token);
      continue;
    }

    for (const part of tokenParts(token, target === "romaji")) {
      distributePart(part, token, ranges, target, pieces);
    }
  }

  const converted = pieces.map((parts, index) => {
    if (!hasJapanese(words[index])) return words[index];
    return joinPieces(parts, target);
  });

  for (let index = 0; index < converted.length; index++) {
    if (!needsRepair(words[index], converted[index])) continue;
    const repaired = await convertStandalone(words[index], target);
    if (repaired) converted[index] = repaired;
  }

  return converted;
}

function needsRepair(source: string, result: string): boolean {
  if (!hasKanji(source)) return false;
  return !result || hasKanji(result);
}

async function convertStandalone(word: string, target: JapaneseTextTarget): Promise<string> {
  const tokens = await tokenize(word);
  if (!tokens || tokens.length === 0) return "";

  const separator = target === "romaji" ? " " : "";
  const text = collapse(tokens.map((token) => convertToken(token, target)).filter(Boolean).join(separator));
  return hasKanji(text) ? "" : text;
}

export async function convertJapaneseLine(text: string, target: JapaneseTextTarget): Promise<string | null> {
  const source = collapse(text);
  if (!source) return "";

  const tokens = await tokenize(source);
  if (!tokens) return null;

  const pieces: Piece[] = [];
  for (const token of tokens) pushPiece(pieces, convertToken(token, target), token);
  return joinPieces(pieces, target);
}

type Piece = { text: string; glue: boolean };

function pushPiece(pieces: Piece[], text: string, token: AlignedToken) {
  if (!text) return;
  const previous = pieceOwners.get(pieces);
  const glue = previous === token || attachesToPrevious(token);
  pieces.push({ text, glue });
  pieceOwners.set(pieces, token);
}

const pieceOwners = new WeakMap<Piece[], AlignedToken>();

function joinPieces(pieces: Piece[], target: JapaneseTextTarget): string {
  const spaced = target === "romaji";
  let result = "";
  for (const piece of pieces) {
    if (result && spaced && !piece.glue) result += " ";
    result += piece.text;
  }
  return collapse(result);
}

export async function furiganaJapaneseWords(words: string[]): Promise<(string | null)[] | null> {
  if (words.length === 0) return [];

  const tokens = await tokenize(words.join(""));
  if (!tokens) return null;

  const ranges = wordRanges(words);
  const html: string[][] = words.map(() => []);
  const annotated: boolean[] = words.map(() => false);

  for (const token of tokens) {
    const owners = overlappingWords(token, ranges);

    if (owners.length <= 1) {
      if (owners.length === 0) continue;
      const ruby = tokenRuby(token);
      html[owners[0]].push(ruby.html);
      annotated[owners[0]] ||= ruby.annotated;
      continue;
    }

    for (const part of tokenParts(token, false)) {
      const partOwners = overlappingWords(part, ranges);

      if (partOwners.length === 1 && isKanji(part.surface[0]) && isUsableReading(part.surface, part.reading)) {
        html[partOwners[0]].push(ruby(part.surface, part.reading));
        annotated[partOwners[0]] = true;
        continue;
      }

      for (const index of partOwners) {
        const [wordStart, wordEnd] = ranges[index];
        const from = Math.max(wordStart, part.start);
        const to = Math.min(wordEnd, part.end);
        html[index].push(escapeHtml(part.surface.slice(from - part.start, to - part.start)));
      }
    }
  }

  return words.map((_word, index) => (annotated[index] ? html[index].join("") : null));
}

export async function furiganaJapaneseLine(text: string): Promise<string | null> {
  const source = collapse(text);
  if (!source) return "";

  const tokens = await tokenize(source);
  if (!tokens) return null;

  let annotated = false;
  let html = "";
  for (const token of tokens) {
    const ruby = tokenRuby(token);
    html += ruby.html;
    annotated ||= ruby.annotated;
  }

  return annotated ? html : "";
}

export async function debugTokens(text: string): Promise<AlignedToken[] | null> {
  return tokenize(collapse(text));
}

function convertToken(token: AlignedToken, target: JapaneseTextTarget): string {
  if (target === "katakana") return token.reading;
  if (target === "hiragana") return tokenHiragana(token);

  const source = hasJapanese(token.surface) ? token.pronunciation || token.reading : token.surface;
  return toRawRomaji(source, ROMANIZATION_SYSTEM.HEPBURN);
}

function tokenHiragana(token: AlignedToken): string {
  if (!hasKanji(token.surface)) return token.surface;
  if (!hasKatakana(token.surface)) return toRawHiragana(token.reading);

  const reading = toRawHiragana(token.reading);
  let pattern = "";
  for (const char of token.surface) {
    pattern += isKanji(char) ? "(.*)" : isKatakana(char) ? toRawHiragana(char) : escapeRegExp(char);
  }

  const matches = safeMatch(pattern, reading);
  if (!matches) return reading;

  let result = "";
  let pick = 0;
  for (const char of token.surface) {
    if (isKanji(char)) {
      result += matches[pick + 1] ?? "";
      pick++;
    } else {
      result += char;
    }
  }
  return result;
}

type TokenPart = { start: number; end: number; surface: string; reading: string };

function tokenParts(token: AlignedToken, spoken: boolean): TokenPart[] {
  const surface = token.surface;
  const type = getStrType(surface);
  const reading = toRawHiragana(token.reading);

  if (type === 0) {
    const source = spoken ? toRawHiragana(token.pronunciation) || reading : reading;
    return [{ start: token.start, end: token.end, surface, reading: source }];
  }

  if (type === 2 || type === 3) {
    return [{ start: token.start, end: token.end, surface, reading: surface }];
  }

  const chunks: string[] = [];
  let pattern = "";
  let lastWasKanji = false;
  let first = true;

  for (const char of surface) {
    const kanji = isKanji(char);
    if (kanji) {
      if (lastWasKanji) chunks[chunks.length - 1] += char;
      else {
        pattern += "(.+)";
        chunks.push(char);
      }
    } else {
      if (!lastWasKanji && !first) chunks[chunks.length - 1] += char;
      else chunks.push(char);
      pattern += isKatakana(char) ? toRawHiragana(char) : escapeRegExp(char);
    }
    lastWasKanji = kanji;
    first = false;
  }

  const matches = safeMatch(`^${pattern}$`, reading);
  if (!matches) return [{ start: token.start, end: token.end, surface, reading }];

  const parts: TokenPart[] = [];
  let offset = token.start;
  let pick = 1;

  for (const chunk of chunks) {
    const isKanjiRun = isKanji(chunk[0]);
    parts.push({
      start: offset,
      end: offset + chunk.length,
      surface: chunk,
      reading: isKanjiRun ? matches[pick] ?? "" : chunk,
    });
    if (isKanjiRun) pick++;
    offset += chunk.length;
  }

  return parts;
}

function distributePart(
  part: TokenPart,
  token: AlignedToken,
  ranges: Array<[number, number]>,
  target: JapaneseTextTarget,
  pieces: Piece[][],
) {
  const length = part.end - part.start;
  if (length <= 0 || !part.reading) return;

  const slices: Array<{ index: number; kana: string }> = [];

  for (let index = 0; index < ranges.length; index++) {
    const [wordStart, wordEnd] = ranges[index];
    const from = Math.max(wordStart, part.start);
    const to = Math.min(wordEnd, part.end);
    if (to <= from) continue;

    const covered = to - from >= length;
    const kana = covered
      ? part.reading
      : part.reading.slice(
          snapToMora(part.reading, Math.round((part.reading.length * (from - part.start)) / length)),
          snapToMora(part.reading, Math.round((part.reading.length * (to - part.start)) / length)),
        );
    if (!kana) continue;

    slices.push({ index, kana });
  }

  moveTrailingSokuon(slices, pieces, target);

  for (const slice of slices) {
    if (slice.kana) pushPiece(pieces[slice.index], convertKana(slice.kana, target), token);
  }
}

function moveTrailingSokuon(
  slices: Array<{ index: number; kana: string }>,
  pieces: Piece[][],
  target: JapaneseTextTarget,
) {
  if (target !== "romaji") return;

  for (let index = 0; index < slices.length - 1; index++) {
    const { index: word, kana } = slices[index];
    if (!/[っッ]$/.test(kana)) continue;
    if (kana.length < 2 && pieces[word].length === 0) continue;

    slices[index].kana = kana.slice(0, -1);
    slices[index + 1].kana = kana.slice(-1) + slices[index + 1].kana;
  }
}

const MORA_CONTINUATION = /[ーゝゞヽヾぁぃぅぇぉゃゅょゎっァィゥェォャュョヮッ]/;

function snapToMora(reading: string, index: number): number {
  let snapped = index;
  while (snapped > 0 && snapped < reading.length && MORA_CONTINUATION.test(reading[snapped])) snapped--;
  return snapped;
}

function convertKana(kana: string, target: JapaneseTextTarget): string {
  if (target === "katakana") return toRawKatakana(kana);
  if (target === "hiragana") return toRawHiragana(kana);
  return toRawRomaji(kana, ROMANIZATION_SYSTEM.HEPBURN);
}

function tokenRuby(token: AlignedToken): { html: string; annotated: boolean } {
  let html = "";
  let annotated = false;

  for (const part of tokenParts(token, false)) {
    if (isKanji(part.surface[0]) && isUsableReading(part.surface, part.reading)) {
      html += ruby(part.surface, part.reading);
      annotated = true;
    } else {
      html += escapeHtml(part.surface);
    }
  }

  return { html, annotated };
}

function isUsableReading(base: string, reading: string): boolean {
  if (!reading || reading === "*" || reading === base) return false;
  return !hasKanji(reading);
}

function ruby(base: string, reading: string): string {
  if (!reading) return escapeHtml(base);
  return `<ruby>${escapeHtml(base)}<rt>${escapeHtml(reading)}</rt></ruby>`;
}

let tokenizerPromise: Promise<any | null> | null = null;

const TOKEN_CACHE_LIMIT = 600;
const tokenCache = new Map<string, AlignedToken[]>();

async function tokenize(text: string): Promise<AlignedToken[] | null> {
  if (!text) return [];

  const cached = tokenCache.get(text);
  if (cached) return cached;

  const tokenizer = await getTokenizer();
  if (!tokenizer) return null;

  let raw: KuroshiroToken[];
  try {
    raw = patchTokens(tokenizer.tokenize(text) as KuroshiroToken[]);
  } catch {
    return null;
  }

  const tokens: AlignedToken[] = [];
  let cursor = 0;

  for (const token of raw) {
    const surface = String(token.surface_form ?? "");
    if (!surface) continue;

    const reading = String(token.reading ?? "") || surface;
    tokens.push({
      start: cursor,
      end: cursor + surface.length,
      surface,
      reading,
      pronunciation: String(token.pronunciation ?? "") || reading,
      pos: String(token.pos ?? ""),
      posDetail: String((token as Record<string, unknown>).pos_detail_1 ?? ""),
    });
    cursor += surface.length;
  }

  if (tokenCache.size >= TOKEN_CACHE_LIMIT) {
    const oldest = tokenCache.keys().next().value;
    if (oldest !== undefined) tokenCache.delete(oldest);
  }
  tokenCache.set(text, tokens);

  return tokens;
}

function getTokenizer(): Promise<any | null> {
  if (!tokenizerPromise) {
    tokenizerPromise = (async () => {
      for (const url of DICT_URLS) {
        const tokenizer = await buildTokenizer(url);
        if (tokenizer) return tokenizer;
        console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${url}, trying next source…`);
      }
      console.warn("[Liquid Lyrics] Japanese conversion unavailable: no dictionary source worked.");
      return null;
    })();

    void tokenizerPromise.then((tokenizer) => {
      if (!tokenizer) tokenizerPromise = null;
    });
  }

  return tokenizerPromise;
}

async function buildTokenizer(baseUrl: string): Promise<any | null> {
  try {
    const buffers = await Promise.all(DICT_FILES.map((file) => fetchBinary(`${baseUrl}/${file}`)));

    const dictionaries = new DynamicDictionaries();
    dictionaries.loadTrie(new Int32Array(buffers[0]), new Int32Array(buffers[1]));
    dictionaries.loadTokenInfoDictionaries(
      new Uint8Array(buffers[2]),
      new Uint8Array(buffers[3]),
      new Uint8Array(buffers[4]),
    );
    dictionaries.loadConnectionCosts(new Int16Array(buffers[5]));
    dictionaries.loadUnknownDictionaries(
      new Uint8Array(buffers[6]),
      new Uint8Array(buffers[7]),
      new Uint8Array(buffers[8]),
      new Uint8Array(buffers[9]),
      new Uint32Array(buffers[10]),
      new Uint8Array(buffers[11]),
    );

    return new KuromojiTokenizer(dictionaries);
  } catch {
    return null;
  }
}

async function fetchBinary(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);

  const raw = new Uint8Array(await response.arrayBuffer());
  if (raw[0] === 0x1f && raw[1] === 0x8b) {
    const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream("gzip"));
    return await new Response(stream).arrayBuffer();
  }
  return raw.buffer;
}

function wordRanges(words: string[]): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  let position = 0;
  for (const word of words) {
    ranges.push([position, position + word.length]);
    position += word.length;
  }
  return ranges;
}

function overlappingWords(span: { start: number; end: number }, ranges: Array<[number, number]>): number[] {
  const owners: number[] = [];
  if (span.end <= span.start) return owners;

  for (let index = 0; index < ranges.length; index++) {
    const [wordStart, wordEnd] = ranges[index];
    if (Math.min(wordEnd, span.end) > Math.max(wordStart, span.start)) owners.push(index);
  }
  return owners;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function safeMatch(pattern: string, text: string): RegExpExecArray | null {
  try {
    return new RegExp(pattern).exec(text);
  } catch {
    return null;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function collapse(text: string): string {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}
