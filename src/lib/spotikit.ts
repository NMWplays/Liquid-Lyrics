export type PlayerEvent = "track" | "playpause" | "state" | "progress";

const kit = (): any => (window as any).SpotiKit;

export const isSpotiKitReady = (): boolean => Boolean(kit()?.Player && kit()?.Platform && kit()?.Http);

export const player = (): any => kit()?.Player;

export const platform = (): any => kit()?.Platform;

export const http = (): any => kit()?.Http;

export function currentItem(): any {
  return player()?.track ?? null;
}

export function currentUri(): string {
  return String(currentItem()?.uri ?? "");
}

export function onPlayer(type: PlayerEvent, listener: (state?: any) => void): () => void {
  return player()?.on?.(type, listener) ?? (() => {});
}

export function navigate(path: string): void {
  kit()?.Navigation?.go(path);
}

export function notify(message: string): void {
  if (typeof kit()?.notify === "function") kit().notify(message);
  else console.log("[Liquid Lyrics]", message);
}

export function windowControlsStrip(): { width: number; height: number } {
  const rect = document.querySelector(".spotikit-window-controls")?.getBoundingClientRect();
  if (!rect || !rect.width) return { width: 135, height: 64 };
  return { width: Math.ceil(window.innerWidth - rect.left + 8), height: Math.ceil(rect.bottom + 8) };
}

export async function extractColors(uri: string): Promise<{ raw?: string; light?: string; dark?: string } | null> {
  try {
    return (await kit()?.Colors?.extract?.(uri)) ?? null;
  } catch {
    return null;
  }
}
