import Aromanize from "aromanize";

export type HangulRule = "rr" | "rr-translit" | "skats" | "ebi";

type RuleMap = {
  cho: Record<string, string>;
  cho2?: Record<string, string>;
  jung: Record<string, string>;
  jong: Record<string, string>;
  hyphen?: string;
};

const SYLLABLE_BASE = 0xac00;
const SYLLABLE_COUNT = 11171;
const CHOSEONG_BASE = 0x1100;
const JUNGSEONG_BASE = 0x1161;
const JONGSEONG_BASE = 0x11a7;
const CHOSEONG_LAST = 0x1112;

export function romanizeHangul(text: string, rule: HangulRule = "rr", hyphen = ""): string {
  const rules = (Aromanize as unknown as { rules: { hangul: Record<string, RuleMap> } }).rules?.hangul;
  const rulemap = rules?.[rule] ?? rules?.rr;
  if (!rulemap) return text;

  let out = "";
  let current: string | null = null;
  let skipInitial = false;

  for (let i = 0; i <= text.length; i++) {
    const next = decompose(text, i);

    if (current !== null) {
      let piece = "";

      if (!skipInitial) {
        const cho2 = rulemap.cho2?.[current.charAt(0)];
        if (i > 0 && !/\s/.test(text.charAt(i - 2)) && cho2 !== undefined) piece += cho2;
        else piece += rulemap.cho[current.charAt(0)] ?? current.charAt(0);
      }
      skipInitial = false;

      if (current.length > 1) {
        piece += rulemap.jung[current.charAt(1)] ?? current.charAt(1);
        if (current.length === 2 && isChoseong(next.charAt(0))) piece += " ";
      }

      if (current.length > 2) {
        const coda = current.charAt(2);
        const withTwo = rulemap.jong[coda + next.charAt(0) + next.charAt(1)];
        const withOne = rulemap.jong[coda + next.charAt(0)];

        if (withTwo !== undefined) {
          piece += withTwo;
          skipInitial = true;
        } else if (withOne !== undefined) {
          piece += withOne;
          skipInitial = true;
        } else {
          piece += rulemap.jong[coda] ?? coda;
          if (isChoseong(next.charAt(0))) piece += " ";
        }
      }

      if (current.length > 1) {
        if (hyphen === "" && rulemap.hyphen != null) {
          piece = piece.replace(" ", rulemap.hyphen);
        } else {
          piece = piece.replace(" ", hyphen);
          if (hyphen !== "") piece = piece.replace("-", hyphen);
        }
      }

      out += piece;
    }

    current = next;
  }

  return out;
}

function decompose(text: string, index: number): string {
  const offset = text.charCodeAt(index) - SYLLABLE_BASE;
  if (Number.isNaN(offset) || offset < 0 || offset > SYLLABLE_COUNT) return text.charAt(index);

  const cho = String.fromCharCode(Math.floor(offset / 588) + CHOSEONG_BASE);
  const jung = String.fromCharCode(Math.floor((offset % 588) / 28) + JUNGSEONG_BASE);
  const jong = offset % 28 === 0 ? "" : String.fromCharCode((offset % 28) + JONGSEONG_BASE);
  return cho + jung + jong;
}

function isChoseong(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= CHOSEONG_BASE && code <= CHOSEONG_LAST;
}
