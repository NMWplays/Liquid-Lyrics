import { clamp, rangeProgress, smoothstep } from "@/ui/lyrics/model";
import { DOT_LIFT_PX, UNSET, type LineRecord, type LyricsVariant, type WordRecord } from "@/ui/lyrics/render";
import { Timeline } from "@/ui/lyrics/timeline";

const GLOW_THRESHOLD = 0.92;

const LIFT_WRITE_INTERVAL_MS = 15;

const FINISHING_MS = 700;

const INTERLUDE_RISE_PX = 24;

export type AnimatorHost = {
  variant: LyricsVariant;
  forEachMounted(visit: (record: LineRecord) => void): void;
  onActiveChanged(next: number, previous: number): void;
};

export class Animator {
  activeIndex = -1;

  private records: LineRecord[] = [];
  private timeline = new Timeline([]);
  private readonly outgoing: LineRecord[] = [];
  private readonly finishing: LineRecord[] = [];
  private lastProgress = NaN;
  private pivot = 0;
  private simpleLyrics = false;
  private minimalLyrics = false;
  private wordGlow = true;
  private readonly dotLift: number;
  private frameNow = 0;

  constructor(private readonly host: AnimatorHost) {
    this.dotLift = DOT_LIFT_PX[host.variant];
  }

  setSong(records: LineRecord[], timeline: Timeline) {
    this.records = records;
    this.timeline = timeline;
    this.outgoing.length = 0;
    this.finishing.length = 0;
    this.activeIndex = -1;
    this.pivot = 0;
    this.lastProgress = NaN;
  }

  setModes(simple: boolean, minimal: boolean, glow: boolean) {
    this.simpleLyrics = simple;
    this.minimalLyrics = minimal;
    this.wordGlow = glow && !simple;
  }

  invalidate() {
    this.lastProgress = NaN;
  }

  tick(progress: number, now = performance.now()) {
    this.frameNow = now;
    if (progress === this.lastProgress) return;
    this.lastProgress = progress;

    const next = this.timeline.findActive(progress, this.activeIndex);
    if (next !== this.activeIndex) this.applyPosition(next, progress);

    if (next >= 0) this.updateActiveLine(this.records[next], progress);
    if (this.outgoing.length > 0) this.updateOutgoing(progress);
    if (this.finishing.length > 0) this.retireFinished();
  }

  dress(record: LineRecord) {
    this.syncLine(record, Number.isNaN(this.lastProgress) ? 0 : this.lastProgress);
  }

  refreshWords(record: LineRecord) {
    record.wordCursor = 0;
    record.lastProgress = Number.NEGATIVE_INFINITY;
    if (record.state !== "active" && !record.outgoing) return;
    if (Number.isNaN(this.lastProgress)) return;
    record.dirty = true;
    this.updateWords(record, this.lastProgress);
  }

private applyPosition(next: number, progress: number) {
    const previous = this.activeIndex;
    this.activeIndex = next;
    this.pivot = next >= 0 ? next : this.timeline.lastStarted(progress) + 1;

    this.host.onActiveChanged(next, previous);
    this.host.forEachMounted((record) => this.syncLine(record, progress));
  }

  private syncLine(record: LineRecord, progress: number) {
    const wasActive = record.state === "active";

    if (record.index === this.activeIndex) {
      if (!wasActive) this.activateLine(record, progress);
      return;
    }

    if (record.index < this.pivot) {
      if (wasActive && record.line.kind !== "interlude" && record.end > progress) {
        this.beginOutgoing(record);
      } else if (record.state !== "past") {
        this.completeLine(record, wasActive);
      }
      return;
    }

    if (record.state !== "future") this.resetLine(record);
  }

  private activateLine(record: LineRecord, progress: number) {
    record.state = "active";
    record.outgoing = false;
    record.progressUnit = UNSET;
    record.interludeVis = UNSET;
    record.interludeY = UNSET;
    record.interludeScale = UNSET;

    const classes = record.el.classList;
    classes.remove("past", "future", "ll-finishing", "ll-outgoing");
    classes.add("active");

    if (record.line.kind === "syllable") {
      record.dirty = true;
      record.wordCursor = 0;
      record.lastProgress = Number.NEGATIVE_INFINITY;
      this.updateWords(record, progress);
    } else if (record.line.kind === "interlude") {
      record.dirty = true;
      this.clearDots(record, false);
    }
  }

  private beginOutgoing(record: LineRecord) {
    record.state = "past";
    record.outgoing = true;
    const classes = record.el.classList;
    classes.remove("active", "future", "ll-finishing");
    classes.add("past", "ll-outgoing");
    if (record.glow) {
      classes.remove("ll-glow");
      record.glow = false;
    }
    if (!this.outgoing.includes(record)) this.outgoing.push(record);
  }

  private finishOutgoing(record: LineRecord) {
    record.outgoing = false;
    const classes = record.el.classList;
    classes.remove("ll-outgoing");
    classes.add("ll-finishing");
    this.clearLineInline(record);
    this.clearWords(record);
    this.beginFinishing(record);
  }

  private completeLine(record: LineRecord, smooth: boolean) {
    record.state = "past";
    record.outgoing = false;
    const classes = record.el.classList;
    classes.remove("active", "future", "ll-outgoing");
    classes.add("past");
    classes.toggle("ll-finishing", smooth);
    if (record.glow) {
      classes.remove("ll-glow");
      record.glow = false;
    }
    this.clearWords(record);
    this.clearLineInline(record);
    this.clearDots(record, true);

    if (smooth && record.line.kind !== "interlude") this.beginFinishing(record);
  }

  private beginFinishing(record: LineRecord) {
    record.finishAt = performance.now() + FINISHING_MS;
    if (!this.finishing.includes(record)) this.finishing.push(record);
  }

  private retireFinished() {
    const now = performance.now();
    for (let index = this.finishing.length - 1; index >= 0; index--) {
      const record = this.finishing[index];
      if (record.state !== "past" || record.outgoing) {
        this.finishing.splice(index, 1);
        continue;
      }
      if (now < record.finishAt) continue;
      this.finishing.splice(index, 1);
      record.el.classList.remove("ll-finishing");
    }
  }

  private resetLine(record: LineRecord) {
    record.state = "future";
    record.outgoing = false;
    const classes = record.el.classList;
    classes.remove("active", "past", "ll-finishing", "ll-outgoing");
    classes.add("future");
    if (record.glow) {
      classes.remove("ll-glow");
      record.glow = false;
    }
    this.clearLineInline(record);
    this.clearWords(record);
    this.clearDots(record, false);
  }

  private clearLineInline(record: LineRecord) {
    const style = record.el.style;
    if (record.progressUnit !== UNSET) {
      style.removeProperty("--line-progress");
      record.progressUnit = UNSET;
    }
    if (record.interludeVis !== UNSET) {
      style.removeProperty("--interlude-visibility");
      style.removeProperty("--interlude-y");
      style.removeProperty("--interlude-scale");
      record.interludeVis = UNSET;
      record.interludeY = UNSET;
      record.interludeScale = UNSET;
    }
  }

  private clearWords(record: LineRecord) {
    if (!record.dirty) return;
    record.dirty = false;
    record.wordCursor = 0;
    record.lastProgress = Number.NEGATIVE_INFINITY;

    const words = record.words;
    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      if (word.state !== "idle") this.clearWord(word);
    }
  }

  private clearWord(word: WordRecord) {
    if (word.state === "singing") word.el.classList.remove("singing");
    else if (word.state === "sung") word.el.classList.remove("sung");
    word.state = "idle";
    this.clearWordInline(word);
  }

  private clearDots(record: LineRecord, lit: boolean) {
    const dots = record.dots;
    if (dots.length === 0) return;

    for (let index = 0; index < dots.length; index++) {
      const dot = dots[index];
      record.dotLit[index] = lit;
      dot.classList.toggle("lit", lit);
      if (dot.style.transform) dot.style.transform = "";
      if (dot.style.opacity) dot.style.opacity = "";
      record.dotLift[index] = 0;
    }
  }

private updateActiveLine(record: LineRecord, progress: number) {
    const lineProgress = rangeProgress(record, progress);

    if (record.line.kind === "interlude") {
      this.updateInterlude(record, lineProgress);
      return;
    }

    const glow = lineProgress > GLOW_THRESHOLD;
    if (glow !== record.glow) {
      record.glow = glow;
      record.el.classList.toggle("ll-glow", glow);
    }

    if (record.line.kind === "syllable") this.updateWords(record, progress);
    else this.writeLineProgress(record, lineProgress * 100);
  }

  private updateOutgoing(progress: number) {
    for (let index = this.outgoing.length - 1; index >= 0; index--) {
      const record = this.outgoing[index];

      if (!record.outgoing || record.state !== "past") {
        this.outgoing.splice(index, 1);
        continue;
      }
      if (progress >= record.end) {
        this.finishOutgoing(record);
        this.outgoing.splice(index, 1);
        continue;
      }
      if (progress < record.start) {
        this.outgoing.splice(index, 1);
        this.resetLine(record);
        continue;
      }

      if (record.line.kind === "syllable") this.updateWords(record, progress);
      else this.writeLineProgress(record, rangeProgress(record, progress) * 100);
    }
  }

  private writeLineProgress(record: LineRecord, value: number) {
    const quantized = Math.round(value * 2) / 2;
    if (quantized === record.progressUnit) return;
    record.progressUnit = quantized;
    record.el.style.setProperty("--line-progress", String(quantized));
  }

  private updateWords(record: LineRecord, progress: number) {
    const words = record.words;
    const count = words.length;
    if (count === 0) return;

    if (progress < record.lastProgress) this.rewindWords(record);
    record.lastProgress = progress;
    record.dirty = true;

    let cursor = record.wordCursor;
    while (cursor < count && words[cursor].state === "sung") cursor++;
    record.wordCursor = cursor;

    for (let index = cursor; index < count; index++) {
      const word = words[index];
      if (progress < word.start) break;

      if (progress >= word.end) {
        if (word.state !== "sung") {
          if (word.state === "singing") word.el.classList.remove("singing");
          word.el.classList.add("sung");
          word.state = "sung";
          this.clearWordInline(word);
        }
        continue;
      }

      if (word.state !== "singing") {
        if (word.state === "sung") word.el.classList.remove("sung");
        word.el.classList.add("singing");
        word.state = "singing";
      }
      this.updateSingingWord(word, progress);
    }
  }

  private rewindWords(record: LineRecord) {
    const words = record.words;
    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      if (word.state !== "idle") this.clearWord(word);
    }
    record.wordCursor = 0;
  }

  private clearWordInline(word: WordRecord) {
    const style = word.el.style;
    if (word.fill !== UNSET) {
      style.removeProperty("--syl-progress");
      word.fill = UNSET;
    }
    if (word.lift !== 0) {
      style.transform = "";
      word.lift = 0;
    }
    if (word.glow !== 0) {
      style.removeProperty("--ll-glow");
      word.glow = 0;
    }

    const letterFill = word.letterFill;
    const letterLift = word.letterLift;
    const letterGlow = word.letterGlow;
    if (!letterFill || !letterLift || !letterGlow) return;

    const letters = word.letters;
    for (let index = 0; index < letters.length; index++) {
      if (letterFill[index] !== UNSET) {
        letters[index].style.removeProperty("--letter-progress");
        letterFill[index] = UNSET;
      }
      if (letterLift[index] !== 0) {
        letters[index].style.transform = "";
        letterLift[index] = 0;
      }
      if (letterGlow[index] !== 0) {
        letters[index].style.removeProperty("--ll-glow");
        letterGlow[index] = 0;
      }
    }
  }

  private updateSingingWord(word: WordRecord, progress: number) {
    const wordProgress = clamp((progress - word.start) / Math.max(1, word.end - word.start));

    if (word.animateLetters) {
      this.updateLetters(word, wordProgress);
      if (this.minimalLyrics && !this.simpleLyrics) this.applyWordLift(word, wordProgress);
      return;
    }

    const quantized = Math.round(-20 + 120 * wordProgress);
    if (quantized !== word.fill) {
      word.fill = quantized;
      word.el.style.setProperty("--syl-progress", String(quantized));
    }

    this.applyWordGlow(word, wordProgress);
    this.applyWordLift(word, wordProgress);
  }

  private applyWordGlow(word: WordRecord, wordProgress: number) {
    const target = this.wordGlow
      ? Math.round(smoothstep(0, 0.15, wordProgress) * (1 - smoothstep(0.6, 1, wordProgress)) * 50) / 50
      : 0;
    if (target === word.glow) return;
    if (target !== 0 && this.frameNow - word.glowAt < LIFT_WRITE_INTERVAL_MS) return;

    word.glow = target;
    word.glowAt = this.frameNow;
    if (target === 0) word.el.style.removeProperty("--ll-glow");
    else word.el.style.setProperty("--ll-glow", String(target));
  }

  private applyWordLift(word: WordRecord, wordProgress: number) {
    if (this.simpleLyrics) {
      if (word.lift !== 0) {
        word.lift = 0;
        word.liftAt = this.frameNow;
        word.el.style.transform = "";
      }
      return;
    }

    const lift = Math.sin(wordProgress * Math.PI);
    if (Math.abs(lift - word.lift) <= 0.01) return;
    if (!this.mayWriteLift(word)) return;

    word.lift = lift;
    word.liftAt = this.frameNow;
    word.el.style.transform = `translate3d(0, ${(-5 * lift).toFixed(2)}px, 0) scale(${(1 + 0.018 * lift).toFixed(4)})`;
  }

  private mayWriteLift(word: WordRecord): boolean {
    return this.frameNow - word.liftAt >= LIFT_WRITE_INTERVAL_MS;
  }

  private updateLetters(word: WordRecord, wordProgress: number) {
    const letters = word.letters;
    const count = letters.length;
    if (count === 0) return;

    let letterFill = word.letterFill;
    let letterLift = word.letterLift;
    let letterGlow = word.letterGlow;
    if (!letterFill || !letterLift || !letterGlow) {
      letterFill = word.letterFill = new Int16Array(count).fill(UNSET);
      letterLift = word.letterLift = new Float32Array(count);
      letterGlow = word.letterGlow = new Float32Array(count);
    }

    const width = Math.max(0.16, 1.8 / count);
    const center = wordProgress + width * smoothstep(0.7, 1, wordProgress);
    const flat = this.simpleLyrics || this.minimalLyrics;
    const writeLift = !flat && this.mayWriteLift(word);
    const writeGlow = this.frameNow - word.glowAt >= LIFT_WRITE_INTERVAL_MS;
    if (writeLift) word.liftAt = this.frameNow;
    if (writeGlow) word.glowAt = this.frameNow;

    for (let index = 0; index < count; index++) {
      const letter = letters[index];

      const fill = Math.round(-20 + 120 * clamp(wordProgress * count - index));
      const lastFill = letterFill[index];
      if (Math.abs(fill - lastFill) >= 4 || (fill !== lastFill && (fill === 100 || fill === -20))) {
        letterFill[index] = fill;
        letter.style.setProperty("--letter-progress", String(fill));
      }

      if (flat && letterLift[index] !== 0) {
        letterLift[index] = 0;
        letter.style.transform = "";
      }
      if (!writeLift && !writeGlow) continue;

      const influence = 1 - clamp(Math.abs(center - (index + 0.5) / count) / width);
      const eased = influence <= 0 ? 0 : smoothstep(0, 1, influence);
      if (writeLift && Math.abs(eased - letterLift[index]) > 0.008) {
        letterLift[index] = eased;
        letter.style.transform = eased === 0
          ? ""
          : `translate3d(0, ${(-5.5 * eased).toFixed(2)}px, 0) scale(${(1 + 0.02 * eased).toFixed(4)})`;
      }

      if (writeGlow) {
        const glow = this.wordGlow ? Math.round(eased * 50) / 50 : 0;
        if (glow !== letterGlow[index]) {
          letterGlow[index] = glow;
          if (glow === 0) letter.style.removeProperty("--ll-glow");
          else letter.style.setProperty("--ll-glow", String(glow));
        }
      }
    }
  }

  private updateInterlude(record: LineRecord, lineProgress: number) {
    const fadeIn = smoothstep(0, 0.22, lineProgress);
    const visibility = Math.round(fadeIn * 200) / 200;
    const y = Math.round(-INTERLUDE_RISE_PX * smoothstep(0.76, 1, lineProgress) * 10) / 10;

    const scale = Math.round((0.72 + 0.28 * fadeIn) * 500) / 500;

    const style = record.el.style;
    if (visibility !== record.interludeVis) {
      record.interludeVis = visibility;
      style.setProperty("--interlude-visibility", String(visibility));
    }
    if (y !== record.interludeY) {
      record.interludeY = y;
      style.setProperty("--interlude-y", `${y}px`);
    }
    if (scale !== record.interludeScale) {
      record.interludeScale = scale;
      style.setProperty("--interlude-scale", String(scale));
    }

    const dots = record.dots;
    const count = dots.length;
    const peak = this.dotLift;

    for (let index = 0; index < count; index++) {
      const dot = dots[index];
      const start = index / count;
      const end = (index + 1) / count;

      const lit = lineProgress >= start;
      if (lit !== record.dotLit[index]) {
        record.dotLit[index] = lit;
        dot.classList.toggle("lit", lit);
      }

      let lift = 0;
      if (lit && lineProgress < end) {
        lift = Math.sin(((lineProgress - start) / (end - start)) * Math.PI) * peak;
      }

      const last = record.dotLift[index];
      if (Math.abs(lift - last) < 0.1 && !(lift === 0 && last !== 0)) continue;

      record.dotLift[index] = lift;
      dot.style.transform = lift === 0 ? "" : `translateY(${(-lift).toFixed(2)}px)`;
    }
  }
}
