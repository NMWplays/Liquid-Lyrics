import { toTime } from "@/ui/lyrics/model";
import { currentItem, currentUri, player } from "@/lib/spotikit";

const SNAP_THRESHOLD_MS = 900;

const JITTER_TAU_MS = 320;

const PAUSE_INTENT_GRACE_MS = 1000;

const NATURAL_END_WINDOW_MS = 1500;

const PLAY_BUTTON = '[data-testid="control-button-playpause"]';

let anchorTrack = "";
let anchorMs = 0;
let anchorNow = 0;
let anchorDuration = 0;
let lastTickNow = 0;
let wasPlaying = false;

let lastEventMs = 0;
let lastEventAt = 0;
let lastEventValid = false;

let eventOffset = 0;
let offsetStamp = 0;

let pauseIntentAt = 0;
let pauseIntentMs = 0;
let pauseIntentTrack = "";

let registered = false;

// Spotify's state only; getPositionState returns the last anchor, not the current position.
export function getPlayerProgress(): number {
  const now = performance.now();
  const track = getCurrentTrackUri();
  const reported = isReportedPlaying();
  const event = readEvent();

  if (pauseIntentAt) {
    const settled = !reported || track !== pauseIntentTrack || now - pauseIntentAt > PAUSE_INTENT_GRACE_MS;
    if (settled) {
      pauseIntentAt = 0;
    } else {
      wasPlaying = false;
      lastEventValid = false;
      lastTickNow = now;
      return clampToTrack(pauseIntentMs);
    }
  }

  if (track !== anchorTrack) {
    const start = reported ? naturalStart(now, event) : event;
    eventOffset = start - event;
    offsetStamp = stateStamp();
    return settle(start, event, track, now, reported);
  }

  if (!reported || !wasPlaying) return settle(event, event, track, now, reported);

  const predicted = anchorMs + (now - anchorNow);
  const jumped = eventJumped(event, now);
  noteEventReading(event, now, true);

  let corrected: number;
  if (jumped) {
    corrected = event;
  } else {
    const error = event - predicted;
    const dt = Math.min(120, Math.max(0, now - lastTickNow));
    corrected = predicted + error * (1 - Math.exp(-dt / JITTER_TAU_MS));
  }

  setProgressAnchor(corrected, track, now);
  lastTickNow = now;
  return clampToTrack(corrected);
}

export function seekTo(ms: number) {
  const next = Math.max(0, Math.round(ms));
  eventOffset = 0;
  setProgressAnchor(next);
  lastEventMs = next;
  lastEventAt = performance.now();
  lastEventValid = true;
  player()?.seek?.(next);
}

export function togglePlayback() {
  if (isReportedPlaying()) notePauseIntent();
  void player()?.toggle?.();
}

export function pausePlayback() {
  if (isReportedPlaying()) notePauseIntent();
  void player()?.pause?.();
}

export function registerPlaybackSync() {
  if (registered) return;
  registered = true;

  document.addEventListener(
    "click",
    (event) => {
      if ((event.target as Element | null)?.closest?.(PLAY_BUTTON) && isReportedPlaying()) notePauseIntent();
    },
    true,
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.code !== "Space" || event.repeat || event.defaultPrevented || isTyping(event.target)) return;
      const focused = (event.target as Element | null)?.closest?.('button, a, [role="button"], [role="slider"]');
      if (focused && !focused.matches(PLAY_BUTTON)) return;
      if (isReportedPlaying()) notePauseIntent();
    },
    true,
  );
}

// Spotify reports a pause ~280ms late, at the position of the click.
function notePauseIntent() {
  pauseIntentMs = getPlayerProgress();
  pauseIntentAt = performance.now();
  pauseIntentTrack = getCurrentTrackUri();
}

function settle(ms: number, event: number, track: string, now: number, playing: boolean): number {
  setProgressAnchor(ms, track, now);
  noteEventReading(event, now, playing);
  wasPlaying = playing;
  lastTickNow = now;
  return clampToTrack(ms);
}

// After an automatic skip the new state lags the real start by ~80ms.
function naturalStart(now: number, event: number): number {
  if (!wasPlaying || now - lastTickNow > 250 || anchorDuration <= 0) return event;
  const endedAt = anchorNow + (anchorDuration - anchorMs);
  const sinceEnd = now - endedAt;
  if (sinceEnd < 0 || sinceEnd > NATURAL_END_WINDOW_MS) return event;
  return Math.max(event, sinceEnd);
}

function readEvent(): number {
  const event = toTime(player()?.position, 0);
  if (eventOffset && stateStamp() !== offsetStamp) eventOffset = 0;
  return event + eventOffset;
}

function stateStamp(): number {
  return Number(player()?.state?.timestamp) || 0;
}

function eventJumped(event: number, now: number): boolean {
  if (!lastEventValid) return false;
  const expected = lastEventMs + (now - lastEventAt);
  return Math.abs(event - expected) > SNAP_THRESHOLD_MS;
}

function noteEventReading(event: number, now: number, playing: boolean) {
  lastEventMs = event;
  lastEventAt = now;
  lastEventValid = playing;
}

function clampToTrack(ms: number): number {
  const duration = getTrackDuration();
  const clamped = Math.max(0, ms);
  return duration > 0 ? Math.min(clamped, duration) : clamped;
}

function isReportedPlaying(): boolean {
  return Boolean(player()?.isPlaying);
}

export function isPlayerPlaying(): boolean {
  return isReportedPlaying() && !pauseIntentAt;
}

export function getTrackDuration(): number {
  const item = currentItem();
  const metadata = item?.metadata ?? {};
  return toTime(
    player()?.duration || metadata.duration_ms || metadata.duration || item?.duration?.milliseconds,
    0,
  );
}

export function getCurrentTrackUri(): string {
  return currentUri();
}

function setProgressAnchor(ms: number, track = getCurrentTrackUri(), now = performance.now()) {
  anchorTrack = track;
  anchorMs = Math.max(0, ms);
  anchorNow = now;
  anchorDuration = getTrackDuration();
}

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

(window as any).__liquidLyricsClock = () => {
  const now = performance.now();
  const event = toTime(player()?.position, 0);
  const predicted = pauseIntentAt ? pauseIntentMs : anchorMs + (now - anchorNow);
  return {
    predicted: Math.round(predicted),
    event: Math.round(event),
    eventOffset: Math.round(eventOffset),
    eventMinusClock: Math.round(event + eventOffset - predicted),
    pauseHeld: Boolean(pauseIntentAt),
    playing: isPlayerPlaying(),
  };
};
