import type { LineRecord } from "@/ui/lyrics/render";

export const GAP_HOLD_MS = 900;

const OVERLAP_LOOKBACK = 4;

export class Timeline {
  private readonly starts: Float64Array;
  private readonly ends: Float64Array;
  readonly length: number;
  readonly timed: boolean;

  constructor(records: LineRecord[]) {
    this.length = records.length;
    this.starts = new Float64Array(records.length);
    this.ends = new Float64Array(records.length);

    let timed = false;
    for (let index = 0; index < records.length; index++) {
      const record = records[index];
      this.starts[index] = record.start;
      this.ends[index] = record.end;
      if (Number.isFinite(record.start)) timed = true;
    }
    this.timed = timed;
  }

  lastStarted(progress: number): number {
    const starts = this.starts;
    let low = 0;
    let high = this.length - 1;
    let found = -1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (starts[mid] <= progress) {
        found = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return found;
  }

  findActive(progress: number, previous: number): number {
    if (this.length === 0) return -1;

    const lastStarted = this.lastStarted(progress);
    if (lastStarted < 0) return -1;

    const from = Math.max(0, lastStarted - OVERLAP_LOOKBACK);
    for (let index = lastStarted; index >= from; index--) {
      if (progress >= this.starts[index] && progress < this.ends[index]) return index;
    }

    if (previous >= 0 && previous < this.length) {
      if (progress >= this.starts[previous] && progress < this.ends[previous] + GAP_HOLD_MS) return previous;
    }

    if (this.ends[lastStarted] <= progress && progress - this.ends[lastStarted] <= GAP_HOLD_MS) return lastStarted;

    return -1;
  }
}
