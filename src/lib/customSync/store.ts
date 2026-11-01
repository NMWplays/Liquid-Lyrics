import type { CustomSyncMeta, StoredSync } from "@/lib/customSync/types";

const KEY_PREFIX = "liquid-lyrics-custom-sync:";
const INDEX_KEY = "liquid-lyrics-custom-sync-index";
export const CUSTOM_SYNC_EVENT = "liquid-lyrics:custom-sync-changed";

export function normalizeTrackId(idOrUri: string): string {
  const value = String(idOrUri ?? "");
  return value.includes(":") ? value.split(":")[2] ?? value : value;
}

function keyFor(idOrUri: string): string {
  return String(idOrUri ?? "").trim();
}

export function getCustomSync(idOrUri: string): StoredSync | null {
  const key = keyFor(idOrUri);
  if (!key) return null;

  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSync;
    return isValidStored(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function hasCustomSync(idOrUri: string): boolean {
  const key = keyFor(idOrUri);
  return Boolean(key) && localStorage.getItem(KEY_PREFIX + key) != null;
}

export function saveCustomSync(stored: StoredSync): void {
  const key = keyFor(stored.trackUri || stored.trackId);
  if (!key) return;

  const payload: StoredSync = { ...stored, version: 1, updatedAt: Date.now() };
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify(payload));
    updateIndex(key, payload);
    emitChange(payload);
  } catch (error) {
    console.error("[Liquid Lyrics] Could not save custom sync", error);
    throw error;
  }
}

export function deleteCustomSync(idOrUri: string): void {
  const key = keyFor(idOrUri);
  if (!key) return;

  const stored = getCustomSync(key);
  localStorage.removeItem(KEY_PREFIX + key);
  writeIndex(readIndex().filter((entry) => keyFor(entry.trackUri || entry.trackId) !== key));
  emitChange(stored ?? { trackUri: key, trackId: normalizeTrackId(key) });
}

export function listCustomSyncs(): CustomSyncMeta[] {
  return readIndex().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function exportSyncJson(idOrUri: string): string | null {
  const stored = getCustomSync(idOrUri);
  return stored ? JSON.stringify(stored, null, 2) : null;
}

export function parseImportedSync(json: string, retargetToUri?: string): StoredSync {
  const parsed = JSON.parse(json) as StoredSync;
  if (!isValidStored(parsed)) throw new Error("Invalid or incomplete sync file");

  if (retargetToUri) {
    const trackUri = String(retargetToUri);
    const trackId = normalizeTrackId(trackUri);
    parsed.trackUri = trackUri;
    parsed.trackId = trackId;
    parsed.draft = { ...parsed.draft, trackId, trackUri };
    parsed.lyrics = { ...parsed.lyrics, Id: trackId } as StoredSync["lyrics"];
  }
  return parsed;
}

function readIndex(): CustomSyncMeta[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const parsed = raw ? (JSON.parse(raw) as CustomSyncMeta[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIndex(entries: CustomSyncMeta[]): void {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("[Liquid Lyrics] Could not update sync index", error);
  }
}

function updateIndex(key: string, stored: StoredSync): void {
  const meta: CustomSyncMeta = {
    trackId: stored.trackId,
    trackUri: stored.trackUri || stored.trackId,
    title: stored.title,
    artist: stored.artist,
    mode: stored.mode,
    updatedAt: stored.updatedAt,
  };
  const next = readIndex().filter((entry) => keyFor(entry.trackUri || entry.trackId) !== key);
  next.push(meta);
  writeIndex(next);
}

function emitChange(stored: Pick<StoredSync, "trackUri" | "trackId">): void {
  window.dispatchEvent(
    new CustomEvent(CUSTOM_SYNC_EVENT, { detail: { trackUri: stored.trackUri, trackId: stored.trackId } }),
  );
}

function isValidStored(value: unknown): value is StoredSync {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredSync>;
  return (
    typeof candidate.trackId === "string" &&
    (candidate.mode === "line" || candidate.mode === "word") &&
    Boolean(candidate.lyrics) &&
    Boolean(candidate.draft)
  );
}
