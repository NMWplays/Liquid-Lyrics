import { NPV_CANVAS_VIDEOS } from "@/lib/dom/spotifySelectors";

const RETRY_DELAYS_MS = [200, 550, 1200, 2600];

let retryTrack = "";
let retryStep = 0;
let retryTimer: number | null = null;

export function findSpotifyCanvasVideo(): HTMLVideoElement | null {
  for (const selector of NPV_CANVAS_VIDEOS) {
    const video = document.querySelector<HTMLVideoElement>(selector);
    if (video && (video.currentSrc || video.getAttribute("src") || video.srcObject)) return video;
  }
  return null;
}

export function captureCanvasStream(source: HTMLVideoElement): MediaStream | null {
  const capture = (source as any).captureStream ?? (source as any).mozCaptureStream;
  if (typeof capture !== "function") return null;

  try {
    const stream: MediaStream | null = capture.call(source);
    return stream && stream.getVideoTracks().length > 0 ? stream : null;
  } catch {
    return null;
  }
}

export function isStreamLive(stream: MediaStream | null): boolean {
  if (!stream) return false;
  const track = stream.getVideoTracks()[0];
  return Boolean(track) && track.readyState === "live";
}

export function scheduleCanvasRetry(uri: string, onRetry: () => void) {
  if (uri !== retryTrack) {
    retryTrack = uri;
    retryStep = 0;
  }
  if (retryStep >= RETRY_DELAYS_MS.length) return;

  const delay = RETRY_DELAYS_MS[retryStep++];
  if (retryTimer !== null) window.clearTimeout(retryTimer);
  retryTimer = window.setTimeout(() => {
    retryTimer = null;
    onRetry();
  }, delay);
}

export function cancelCanvasRetry() {
  if (retryTimer === null) return;
  window.clearTimeout(retryTimer);
  retryTimer = null;
}
