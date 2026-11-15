import { cachedTranslation, translate, translationLanguage, type Translation } from "@/lib/translate";
import type { TranslationLayout } from "@/lib/settings";
import type { LineRecord } from "@/ui/lyrics/render";

type Unit = { anchor: HTMLElement; text: string; background: boolean; el: HTMLElement | null };

export class Translator {
  private records: LineRecord[] = [];
  private readonly units = new Map<LineRecord, Unit[]>();
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
    for (const [record, units] of this.units) {
      for (const unit of units) {
        unit.el?.remove();
        unit.anchor.classList.remove("ll-translated");
      }
      record.el.classList.remove("ll-has-translation");
    }
    this.units.clear();
    this.records = [];
  }

  apply(enabled: boolean, allowFetch: boolean, layout: TranslationLayout) {
    this.enabled = enabled;
    const generation = this.generation;
    if (layout !== this.layout) {
      this.layout = layout;
      for (const [record, units] of this.units) {
        for (const unit of units) if (unit.el?.isConnected) this.place(unit);
        this.onContentChanged(record);
      }
    }

    for (const record of this.records) {
      for (const unit of this.unitsOf(record)) {
        if (!enabled) {
          this.hide(record, unit);
          continue;
        }
        const cached = cachedTranslation(unit.text);
        if (cached !== undefined) {
          this.show(record, unit, cached);
        } else if (allowFetch) {
          void translate(unit.text).then((result) => {
            if (generation === this.generation && this.enabled) this.show(record, unit, result);
          });
        }
      }
    }
  }

  reattach(record: LineRecord) {
    for (const unit of this.units.get(record) ?? []) if (unit.el?.isConnected) this.place(unit);
  }

  private unitsOf(record: LineRecord): Unit[] {
    let units = this.units.get(record);
    if (!units) {
      units = buildUnits(record);
      this.units.set(record, units);
    }
    return units;
  }

  private show(record: LineRecord, unit: Unit, result: Translation | null) {
    if (!result || result.language === translationLanguage() || same(result.text, unit.text)) {
      this.hide(record, unit);
      return;
    }
    if (!unit.el) {
      unit.el = document.createElement("div");
      unit.el.className = unit.background ? "ll-translation ll-translation-bg" : "ll-translation";
    }
    if (unit.el.textContent === result.text && unit.el.isConnected) {
      this.place(unit);
      return;
    }
    unit.el.lang = translationLanguage();
    unit.el.textContent = result.text;
    this.place(unit);
    unit.anchor.classList.add("ll-translated");
    record.el.classList.add("ll-has-translation");
    this.onContentChanged(record);
  }

  private place(unit: Unit) {
    const el = unit.el!;
    if (this.layout === "below") {
      if (unit.anchor.nextElementSibling !== el) unit.anchor.after(el);
    } else if (unit.anchor.previousElementSibling !== el) {
      unit.anchor.before(el);
    }
  }

  private hide(record: LineRecord, unit: Unit) {
    if (!unit.el?.isConnected) return;
    unit.el.remove();
    unit.anchor.classList.remove("ll-translated");
    if (!(this.units.get(record) ?? []).some((other) => other.el?.isConnected)) {
      record.el.classList.remove("ll-has-translation");
    }
    this.onContentChanged(record);
  }
}

function buildUnits(record: LineRecord): Unit[] {
  const line = record.line;
  if (line.kind === "interlude") return [];
  if (line.kind !== "syllable") {
    const text = cleanText(line.text);
    return text && record.textEl ? [{ anchor: record.textEl, text, background: false, el: null }] : [];
  }

  const units: Unit[] = [];
  const lead = cleanText(line.lead.words.map((word) => word.text).join(" "));
  if (lead && record.leadEl) units.push({ anchor: record.leadEl, text: lead, background: false, el: null });
  const backgrounds = record.el.querySelectorAll<HTMLElement>(":scope > .ll-background-vocal");
  line.backgrounds.forEach((vocal, index) => {
    const text = cleanText(vocal.words.map((word) => word.text).join(" "));
    const anchor = backgrounds[index];
    if (text && anchor) units.push({ anchor, text, background: true, el: null });
  });
  return units;
}

function cleanText(raw: string): string {
  const text = raw.replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();
  return text && !/^[♪♫\s]+$/.test(text) ? text : "";
}

function same(a: string, b: string): boolean {
  const normal = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  return normal(a) === normal(b);
}
