import { containsHan, lineLanguage } from "@/lib/romanization/detect";
import { convertLine, convertRubyLine, convertRubyWords, convertWords } from "@/lib/romanization/engine";
import {
  isLatinTarget,
  isRubyTarget,
  targetLanguage,
  type RomanizationLanguage,
  type RomanizationTarget,
} from "@/lib/romanization/modes";
import { cleanRomanizedCandidate, shouldAnimateLetters, type LyricWord } from "@/ui/lyrics/model";
import { createWordSpans, mergeWordRecords, type LineRecord } from "@/ui/lyrics/render";

const CONVERSION_SLICE_MS = 6;

export type RomanizerHost = {
  onContentChanged(record: LineRecord): void;
  onWordsRebuilt(record: LineRecord): void;
};

export class Romanizer {
  target: RomanizationTarget | null = null;
  language: RomanizationLanguage | null = null;

  private records: LineRecord[] = [];
  private generation = 0;

  constructor(private readonly host: RomanizerHost) {}

  setSong(records: LineRecord[], language: RomanizationLanguage | null) {
    this.generation++;
    this.records = records;
    this.language = language;
    this.target = null;
  }

  clear() {
    this.generation++;
    this.records = [];
    this.language = null;
    this.target = null;
  }

  apply(target: RomanizationTarget | null, allowFetch: boolean) {
    this.target = target;
    const jobs: LineRecord[] = [];

    for (const record of this.records) {
      const line = record.line;
      if (line.kind === "interlude" || !line.text) continue;

      const lineTarget = target && this.appliesTo(line.text, target) ? target : null;

      if (line.kind === "syllable") this.applyToWords(record, lineTarget, allowFetch, jobs);
      else this.applyToLine(record, lineTarget, allowFetch, jobs);
    }

    if (target && jobs.length > 0) void this.run(jobs, target);
  }

  async dump(): Promise<void> {
    const target = this.target;
    console.log(`[Liquid Lyrics] language=${this.language} target=${target} lines=${this.records.length}`);

    for (const record of this.records) {
      const line = record.line;
      if (line.kind === "interlude") continue;

      if (line.kind === "syllable") {
        const words = line.lead.words.map((word) => word.text);
        const cached = target ? record.convertedWords.get(target) : undefined;
        console.log(
          `  syllable  words=${JSON.stringify(words)}\n` +
            `            cached=${JSON.stringify(cached)}\n` +
            `            fresh =${JSON.stringify(target ? await convertWords(words, target) : null)}`,
        );
      } else {
        const cached = target ? record.convertedLine.get(target) : undefined;
        console.log(
          `  line      text=${JSON.stringify(line.text)}\n` +
            `            provider=${JSON.stringify(line.romanizedText)}\n` +
            `            cached=${JSON.stringify(cached)}`,
        );
      }
    }
  }

private appliesTo(text: string, target: RomanizationTarget): boolean {
    return lineLanguage(text, this.language) === targetLanguage(target);
  }

  private applyToLine(
    record: LineRecord,
    target: RomanizationTarget | null,
    allowFetch: boolean,
    jobs: LineRecord[],
  ) {
    const line = record.line;
    if (line.kind === "interlude" || line.kind === "syllable") return;
    const original = line.text;

    if (!target) {
      this.setText(record, `t:${original}`, original);
      return;
    }

    if (isRubyTarget(target)) {
      if (typeof record.rubyLine === "string" && record.rubyLine) {
        this.setHtml(record, record.rubyLine, original);
      } else {
        this.setText(record, `t:${original}`, original);
        if (allowFetch && record.rubyLine === null) jobs.push(record);
      }
      return;
    }

    const provider = isLatinTarget(target) ? cleanRomanizedCandidate(line.romanizedText) : "";
    const cached = record.convertedLine.get(target);

    if (typeof cached === "string" && cached && !(provider && containsHan(cached))) {
      this.setText(record, `${target}:${cached}`, cached);
      return;
    }

    if (provider) this.setText(record, `p:${provider}`, provider);
    else this.setText(record, `t:${original}`, original);

    if (allowFetch && cached === undefined) jobs.push(record);
  }

  private applyToWords(
    record: LineRecord,
    target: RomanizationTarget | null,
    allowFetch: boolean,
    jobs: LineRecord[],
  ) {
    if (!target) {
      this.restoreOriginalWords(record);
      return;
    }

    if (isRubyTarget(target)) {
      if (Array.isArray(record.rubyWords)) this.applyWordRuby(record);
      else {
        this.restoreOriginalWords(record);
        if (allowFetch && record.rubyWords === null) jobs.push(record);
      }
      return;
    }

    const cached = record.convertedWords.get(target);
    if (Array.isArray(cached)) {
      this.applyConvertedWords(record, cached, target);
      return;
    }

    this.restoreOriginalWords(record);
    if (allowFetch && cached === undefined) jobs.push(record);
  }

  private applyConvertedWords(record: LineRecord, converted: string[], target: RomanizationTarget) {
    if (record.line.kind !== "syllable") return;
    const latin = isLatinTarget(target);

    const words = record.line.lead.words.map((word, index) => {
      let text = converted[index] ?? "";

      if (latin && (!text || containsHan(text))) {
        const provider = cleanRomanizedCandidate(word.romanizedText);
        if (provider) text = provider;
      }
      if (!text) text = word.text;

      if (text === word.text) return word;
      return { ...word, text, animateLetters: shouldAnimateLetters(text, word.start, word.end) };
    });

    this.rebuildLead(record, words, `c:${target}`, !isRubyTarget(target));
  }

  private applyWordRuby(record: LineRecord) {
    if (record.line.kind !== "syllable" || !Array.isArray(record.rubyWords)) return;

    const ruby = record.rubyWords;
    let anyRuby = false;
    const words = record.line.lead.words.map((word, index) => {
      const html = ruby[index];
      if (!html) return word;
      anyRuby = true;
      return { ...word, rubyHtml: html, animateLetters: false };
    });

    if (!anyRuby) {
      this.restoreOriginalWords(record);
      return;
    }

    this.rebuildLead(record, words, "ruby", false);
  }

  private restoreOriginalWords(record: LineRecord) {
    if (record.line.kind !== "syllable") return;
    this.rebuildLead(record, record.line.lead.words, "orig", false);
  }

private setText(record: LineRecord, key: string, text: string) {
    if (record.displayKey === key) return;
    record.displayKey = key;
    record.displayText = text;
    (record.textEl ?? record.el).textContent = text;
    this.host.onContentChanged(record);
  }

  private setHtml(record: LineRecord, html: string, plainText: string) {
    const key = `h:${html}`;
    if (record.displayKey === key) return;
    record.displayKey = key;
    record.displayText = plainText;
    (record.textEl ?? record.el).innerHTML = html;
    this.host.onContentChanged(record);
  }

  private rebuildLead(record: LineRecord, words: LyricWord[], key: string, contextRomanized: boolean) {
    if (record.displayKey === key || !record.leadEl) return;
    record.displayKey = key;
    record.el.classList.toggle("ll-context-romanized", contextRomanized);

    record.leadEl.replaceChildren();
    const leadWords = createWordSpans(record.leadEl, words, "");
    record.words = mergeWordRecords(leadWords, record.bgWords);
    record.displayText = words.map((word) => word.text).join(" ").trim();

    this.host.onWordsRebuilt(record);
    this.host.onContentChanged(record);
  }

private async run(records: LineRecord[], target: RomanizationTarget) {
    const generation = this.generation;
    let sliceStart = performance.now();

    for (const record of records) {
      if (generation !== this.generation || this.target !== target) return;

      const line = record.line;
      if (line.kind === "interlude") continue;

      if (line.kind === "syllable") {
        const words = line.lead.words.map((word) => word.text);

        if (isRubyTarget(target)) {
          const result = await convertRubyWords(words, target);
          if (generation !== this.generation) return;
          record.rubyWords = result ?? false;
          if (this.target === target && result) this.applyWordRuby(record);
        } else {
          const result = await convertWords(words, target);
          if (generation !== this.generation) return;
          record.convertedWords.set(target, result ?? false);
          if (this.target === target && result) this.applyConvertedWords(record, result, target);
        }
      } else if (isRubyTarget(target)) {
        const result = await convertRubyLine(line.text, target);
        if (generation !== this.generation) return;
        record.rubyLine = result || false;
        if (this.target === target && result) this.setHtml(record, result, line.text);
      } else {
        const result = await convertLine(line.text, target);
        if (generation !== this.generation) return;
        record.convertedLine.set(target, result || false);
        if (this.target === target && result) this.setText(record, `${target}:${result}`, result);
      }

      if (performance.now() - sliceStart >= CONVERSION_SLICE_MS) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        if (generation !== this.generation) return;
        sliceStart = performance.now();
      }
    }
  }
}
