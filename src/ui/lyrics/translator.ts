import { cachedTranslation, translate, translationLanguage, type Translation } from "@/lib/translate";
import type { TranslationLayout } from "@/lib/settings";
import type { LineRecord } from "@/ui/lyrics/render";

export class Translator {
  private records: LineRecord[] = [];
  private readonly elements = new Map<LineRecord, HTMLElement>();
  private enabled = false;
  private layout: TranslationLayout = "below";
  private generation = 0;

  constructor(private readonly onContentChanged: (record: LineRecord) => void) {}

  setSong(records: LineRecord[]) {
    this.clear();
    this.records = records;
  }

  clear() {
    this.generation++;
    for (const [record, el] of this.elements) {
      el.remove();
      record.el.classList.remove("ll-has-translation");
    }
    this.elements.clear();
    this.records = [];
  }

  apply(enabled: boolean, allowFetch: boolean, layout: TranslationLayout) {
    this.enabled = enabled;
    const generation = this.generation;
    if (layout !== this.layout) {
      this.layout = layout;
      for (const [record, el] of this.elements) {
        this.place(record, el);
        this.onContentChanged(record);
      }
    }

    for (const record of this.records) {
      if (!enabled) {
        this.remove(record);
        continue;
      }
      const text = sourceText(record);
      if (!text) continue;

      const cached = cachedTranslation(text);
      if (cached !== undefined) {
        this.show(record, text, cached);
      } else if (allowFetch) {
        void translate(text).then((result) => {
          if (generation === this.generation && this.enabled) this.show(record, text, result);
        });
      }
    }
  }

  reattach(record: LineRecord) {
    const el = this.elements.get(record);
    if (el) this.place(record, el);
  }

  private place(record: LineRecord, el: HTMLElement) {
    if (this.layout === "below") {
      if (record.el.lastElementChild !== el) record.el.appendChild(el);
    } else if (record.el.firstElementChild !== el) {
      record.el.prepend(el);
    }
  }

  private show(record: LineRecord, text: string, result: Translation | null) {
    if (!result || result.language === translationLanguage() || same(result.text, text)) {
      this.remove(record);
      return;
    }

    let el = this.elements.get(record);
    if (el?.textContent === result.text && el.parentElement === record.el) {
      this.place(record, el);
      return;
    }
    if (!el) {
      el = document.createElement("div");
      el.className = "ll-translation";
      this.elements.set(record, el);
    }
    el.lang = translationLanguage();
    el.textContent = result.text;
    this.place(record, el);
    record.el.classList.add("ll-has-translation");
    this.onContentChanged(record);
  }

  private remove(record: LineRecord) {
    const el = this.elements.get(record);
    if (!el) return;
    el.remove();
    this.elements.delete(record);
    record.el.classList.remove("ll-has-translation");
    this.onContentChanged(record);
  }
}

function sourceText(record: LineRecord): string {
  if (record.line.kind === "interlude") return "";
  // A word-synced line's text is Spotify's nearest line, cut differently; translate the words shown.
  const raw =
    record.line.kind === "syllable" ? record.line.lead.words.map((word) => word.text).join(" ") : record.line.text;
  const text = raw.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();
  return text && !/^[♪♫\s]+$/.test(text) ? text : "";
}

function same(a: string, b: string): boolean {
  const normal = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  return normal(a) === normal(b);
}
