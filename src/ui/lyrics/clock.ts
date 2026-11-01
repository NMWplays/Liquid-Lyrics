import { getPlayerProgress } from "@/ui/lyrics/playback";

type TickHandler = (progressMs: number, frameNow: number) => void;

const subscribers = new Set<TickHandler>();
let frameId: number | null = null;

export function subscribeClock(handler: TickHandler): () => void {
  subscribers.add(handler);
  if (frameId === null) {
    frameId = requestAnimationFrame(tick);
  }

  return () => {
    subscribers.delete(handler);
    if (subscribers.size === 0 && frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };
}

function tick(now: number) {
  if (subscribers.size === 0) {
    frameId = null;
    return;
  }

  frameId = requestAnimationFrame(tick);
  const progress = getPlayerProgress();
  for (const handler of subscribers) {
    handler(progress, now);
  }
}
