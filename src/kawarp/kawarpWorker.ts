import { Kawarp } from '@kawarp/core';

type Group = { clock: number; speed: number; last: number };
type Slot = { canvas: OffscreenCanvas; renderer: Kawarp; group: Group; playing: boolean };

const TARGET_FPS = 60;
const MAX_STEP_MS = 250;

const groups = new Map<string, Group>();
const slots = new Map<number, Slot>();
let raf = 0;

function draw(slot: Slot): void {
  try {
    slot.renderer.renderFrame(slot.group.clock);
  } catch {
  }
}

function tick(now: number): void {
  raf = 0;
  const playing = [...slots.values()].filter((slot) => slot.playing);
  if (!playing.length) return;
  raf = requestAnimationFrame(tick);
  const advanced = new Set<Group>();
  for (const slot of playing) {
    const group = slot.group;
    if (advanced.has(group)) continue;
    const elapsed = now - group.last;
    if (elapsed < 1000 / TARGET_FPS - 4) continue;
    group.last = now;
    group.clock += (Math.min(elapsed, MAX_STEP_MS) / 1000) * group.speed;
    advanced.add(group);
  }
  for (const slot of playing) if (advanced.has(slot.group)) draw(slot);
}

function kick(): void {
  if (!raf) raf = requestAnimationFrame(tick);
}

self.onmessage = (event: MessageEvent) => {
  const msg = event.data;
  const slot = slots.get(msg.id);
  switch (msg.type) {
    case 'create': {
      let group = groups.get(msg.group);
      if (!group) {
        group = { clock: 0, speed: msg.options?.animationSpeed ?? 1, last: 0 };
        groups.set(msg.group, group);
      }
      try {
        slots.set(msg.id, { canvas: msg.canvas, renderer: new Kawarp(msg.canvas, msg.options), group, playing: false });
      } catch (error) {
        (self as any).postMessage({ type: 'failed', id: msg.id, error: String(error) });
      }
      break;
    }
    case 'options':
      if (!slot) break;
      slot.renderer.setOptions(msg.options);
      if (typeof msg.options?.animationSpeed === 'number') slot.group.speed = msg.options.animationSpeed;
      if (!slot.playing) draw(slot);
      break;
    case 'size':
      if (!slot) break;
      slot.canvas.width = msg.width;
      slot.canvas.height = msg.height;
      slot.renderer.resize();
      draw(slot);
      break;
    case 'image':
      if (!slot) {
        msg.bitmap?.close?.();
        break;
      }
      slot.renderer.loadImageElement(msg.bitmap);
      msg.bitmap.close();
      if (!slot.playing) draw(slot);
      if (msg.seq) (self as any).postMessage({ type: 'loaded', id: msg.id, seq: msg.seq });
      break;
    case 'play':
      if (!slot || slot.playing === msg.on) break;
      slot.playing = msg.on;
      if (msg.on) {
        if (![...slots.values()].some((other) => other !== slot && other.playing && other.group === slot.group)) {
          slot.group.last = performance.now();
        }
        kick();
      }
      break;
    case 'render':
      if (slot) draw(slot);
      break;
    case 'dispose':
      if (!slot) break;
      slots.delete(msg.id);
      try {
        slot.renderer.stop();
        slot.renderer.dispose();
      } catch {
      }
      slot.canvas.getContext('webgl')?.getExtension('WEBGL_lose_context')?.loseContext();
      break;
  }
};
