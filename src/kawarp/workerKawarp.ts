import WORKER_SOURCE from './kawarpWorker.ts?worker';
import { onStop } from '../lifecycle/runtime';

const MAX_SOURCE_PX = 512;
const LOAD_TIMEOUT_MS = 2000;

let worker: Worker | null = null;
let workerUrl = '';
let nextId = 0;
let nextSeq = 0;
const loads = new Map<number, () => void>();
const failures = new Map<number, () => void>();

function getWorker(): Worker {
  if (worker) return worker;
  workerUrl = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
  worker = new Worker(workerUrl);
  worker.onmessage = (event: MessageEvent) => {
    const msg = event.data;
    if (msg.type === 'loaded') {
      loads.get(msg.seq)?.();
      loads.delete(msg.seq);
    } else if (msg.type === 'failed') {
      failures.get(msg.id)?.();
    }
  };
  onStop(() => {
    worker?.terminate();
    worker = null;
    URL.revokeObjectURL(workerUrl);
    for (const done of loads.values()) done();
    loads.clear();
  });
  return worker;
}

export function canUseWorkerKawarp(): boolean {
  return typeof HTMLCanvasElement.prototype.transferControlToOffscreen === 'function' && typeof Worker === 'function';
}

export class WorkerKawarp {
  private readonly id = ++nextId;
  private width = 0;
  private height = 0;
  private framePending = false;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, options: object, group: string, onFail?: () => void) {
    const offscreen = canvas.transferControlToOffscreen();
    if (onFail) failures.set(this.id, onFail);
    getWorker().postMessage({ type: 'create', id: this.id, canvas: offscreen, options, group }, [offscreen]);
  }

  private post(message: object, transfer: Transferable[] = []): void {
    if (this.disposed || !worker) return;
    worker.postMessage({ ...message, id: this.id }, transfer);
  }

  setOptions(options: object): void {
    this.post({ type: 'options', options });
  }

  setSize(width: number, height: number): void {
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.post({ type: 'size', width, height });
  }

  play(on: boolean): void {
    this.post({ type: 'play', on });
  }

  render(): void {
    this.post({ type: 'render' });
  }

  async load(source: HTMLImageElement | HTMLVideoElement, frame = false): Promise<void> {
    if (this.disposed || (frame && this.framePending)) return;
    const w = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
    const h = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;
    if (!w || !h) return;
    const scale = Math.min(1, MAX_SOURCE_PX / Math.max(w, h));
    this.framePending = true;
    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(source, {
        imageOrientation: 'flipY',
        resizeWidth: Math.max(1, Math.round(w * scale)),
        resizeHeight: Math.max(1, Math.round(h * scale)),
        resizeQuality: 'medium',
      });
    } finally {
      this.framePending = false;
    }
    if (this.disposed || !worker) {
      bitmap.close();
      return;
    }
    if (frame) {
      this.post({ type: 'image', bitmap }, [bitmap]);
      return;
    }
    const seq = ++nextSeq;
    await new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => {
        loads.delete(seq);
        resolve();
      }, LOAD_TIMEOUT_MS);
      loads.set(seq, () => {
        window.clearTimeout(timer);
        resolve();
      });
      this.post({ type: 'image', bitmap, seq }, [bitmap]);
    });
  }

  dispose(): void {
    if (this.disposed) return;
    this.post({ type: 'dispose' });
    this.disposed = true;
    failures.delete(this.id);
  }
}
