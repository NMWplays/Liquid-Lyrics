declare module "kuromoji/src/dict/DynamicDictionaries" {
  const DynamicDictionaries: any;
  export = DynamicDictionaries;
}

declare module "kuromoji/src/Tokenizer" {
  const Tokenizer: any;
  export = Tokenizer;
}

declare module "kuroshiro/src/util" {
  export type KuroshiroToken = {
    surface_form: string;
    pos?: string;
    reading?: string;
    pronunciation?: string;
    [key: string]: unknown;
  };

  export const ROMANIZATION_SYSTEM: { NIPPON: string; PASSPORT: string; HEPBURN: string };

  export function isKanji(ch: string): boolean;
  export function isKatakana(ch: string): boolean;
  export function isKana(ch: string): boolean;
  export function isHiragana(ch: string): boolean;
  export function hasKanji(str: string): boolean;
  export function hasKatakana(str: string): boolean;
  export function hasJapanese(str: string): boolean;

  export function toRawHiragana(str: string): string;
  export function toRawKatakana(str: string): string;
  export function toRawRomaji(str: string, system?: string): string;

  export function getStrType(str: string): 0 | 1 | 2 | 3;

  export function patchTokens(tokens: KuroshiroToken[]): KuroshiroToken[];
}

declare module "aromanize" {
  export function hangulToLatin(text: string, rule?: string, hyphen?: string): string;
  const Aromanize: { hangulToLatin: typeof hangulToLatin };
  export default Aromanize;
}

declare module "traditional-or-simplified" {
  export function detect(str: string): {
    inputLength: number;
    simplifiedCharacters: number;
    traditionalCharacters: number;
    detectedCharacters?: "simplified" | "traditional" | "unknown";
    detectionRate?: number;
  } | undefined;
}
