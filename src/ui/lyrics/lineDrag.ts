import type { LineRecord } from "@/ui/lyrics/render";

const STAGGER_MS = 42;
const MAX_STEPS = 6;
const HISTORY_MS = MAX_STEPS * STAGGER_MS + 250;
const CATCH_UP_RATE = 2;
const MAX_DRAG_PX = 180;
const NEAR_MARGIN_PX = MAX_DRAG_PX + 60;
const WRITE_EPSILON_PX = 0.2;

export type LineDragHost = {
  forEachMounted(visit: (record: LineRecord) => void): void;
  rowsNear(scroll: number, margin: number): { first: number; last: number } | null;
  pivot(): number;
  autoScrolling(): boolean;
};

export class LineDrag {
  private readonly times: number[] = [];
  private readonly travels: number[] = [];
  private travel = 0;
  private lastScroll = Number.NaN;
  private lastTime = Number.NaN;
  private readonly shownAt = new Map<LineRecord, number>();
  private readonly applied = new Map<LineRecord, number>();
  private readonly visited = new Set<LineRecord>();
  private enabled = false;

  constructor(private readonly host: LineDragHost) {}

  setEnabled(enabled: boolean) {
    if (enabled === this.enabled) return;
    this.enabled = enabled;
    if (!enabled) this.reset();
  }

  reset() {
    for (const [record] of this.applied) release(targetOf(record));
    this.applied.clear();
    this.shownAt.clear();
    this.times.length = 0;
    this.travels.length = 0;
    this.travel = 0;
    this.lastScroll = Number.NaN;
    this.lastTime = Number.NaN;
  }

  frame(time: number, scroll: number) {
    if (!this.enabled) return;

    const dt = Number.isNaN(this.lastTime) ? 0 : Math.min(100, Math.max(0, time - this.lastTime));
    this.lastTime = time;
    if (!Number.isNaN(this.lastScroll) && this.host.autoScrolling()) this.travel += scroll - this.lastScroll;
    this.lastScroll = scroll;
    this.record(time);

    if (this.applied.size === 0 && this.travels[0] === this.travel) {
      if (this.shownAt.size > 0) this.shownAt.clear();
      return;
    }

    const pivot = this.host.pivot();
    const near = this.host.rowsNear(scroll, NEAR_MARGIN_PX);
    const visited = this.visited;
    visited.clear();
    this.host.forEachMounted((record) => {
      if (near && (record.index < near.first || record.index > near.last)) return;
      visited.add(record);
      this.update(record, time, dt, pivot);
    });

    if (this.applied.size > visited.size || this.shownAt.size > visited.size) {
      for (const [record] of this.applied) {
        if (visited.has(record)) continue;
        release(targetOf(record));
        this.applied.delete(record);
      }
      for (const [record] of this.shownAt) if (!visited.has(record)) this.shownAt.delete(record);
    }
  }

  private update(record: LineRecord, time: number, dt: number, pivot: number) {
    const steps = pivot >= 0 ? record.index - pivot : 0;
    const lag = steps > 0 ? Math.min(steps, MAX_STEPS) * STAGGER_MS : 0;
    const wanted = time - lag;

    let shown = this.shownAt.get(record);
    if (shown === undefined || shown > time) shown = wanted;
    else if (shown < wanted) shown = Math.min(wanted, shown + dt * CATCH_UP_RATE);
    this.shownAt.set(record, shown);

    const drag = Math.min(MAX_DRAG_PX, Math.max(0, this.travel - this.travelAt(shown)));
    const current = this.applied.get(record) ?? 0;
    if (Math.abs(drag - current) < WRITE_EPSILON_PX && !(drag === 0 && current !== 0)) return;

    const el = targetOf(record);
    if (drag < WRITE_EPSILON_PX) {
      release(el);
      this.applied.delete(record);
    } else {
      if (current === 0) el.style.willChange = "translate";
      el.style.translate = `0 ${drag.toFixed(1)}px`;
      this.applied.set(record, drag);
    }
  }

  private record(time: number) {
    this.times.push(time);
    this.travels.push(this.travel);
    let drop = 0;
    while (drop < this.times.length - 2 && this.times[drop + 1] < time - HISTORY_MS) drop++;
    if (drop > 0) {
      this.times.splice(0, drop);
      this.travels.splice(0, drop);
    }
  }

  private travelAt(time: number): number {
    const times = this.times;
    const last = times.length - 1;
    if (last < 0) return this.travel;
    if (time >= times[last]) return this.travels[last];
    if (time <= times[0]) return this.travels[0];

    let index = last;
    while (index > 0 && times[index - 1] > time) index--;
    const t0 = times[index - 1];
    const t1 = times[index];
    const v0 = this.travels[index - 1];
    const v1 = this.travels[index];
    return t1 === t0 ? v1 : v0 + ((v1 - v0) * (time - t0)) / (t1 - t0);
  }
}

function targetOf(record: LineRecord): HTMLElement {
  return record.wrapper ?? record.el;
}

function release(el: HTMLElement) {
  el.style.translate = "";
  el.style.willChange = "";
}
