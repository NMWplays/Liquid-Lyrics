const DB_NAME = "liquid-lyrics-backgrounds";
const DB_VERSION = 1;
const STORE = "images";
const SELECTED_KEY = "liquid-lyrics-bg-library-id";
const LEGACY_KEY = "liquid-lyrics-bg-image";
const CHANGE_EVENT = "liquid-lyrics:settings";

export type LibraryImage = { id: string; name: string; added: number; blob: Blob };

export function isVideoBlob(blob: Blob | null | undefined): boolean {
  return !!blob && blob.type.startsWith("video/");
}

let dbPromise: Promise<IDBDatabase> | null = null;
let currentId = "";
let currentUrl = "";
let currentVideo = false;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const request = run(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
      }),
  );
}

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function dataUrlToBlob(dataUrl: string): Blob | null {
  const comma = dataUrl.indexOf(",");
  if (!dataUrl.startsWith("data:") || comma < 0) return null;
  const mime = /^data:([^;,]+)/.exec(dataUrl)?.[1] || "image/jpeg";
  const binary = atob(dataUrl.slice(comma + 1));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function migrateLegacyImage(): Promise<void> {
  let legacy = "";
  try {
    legacy = localStorage.getItem(LEGACY_KEY) || "";
  } catch {
    return;
  }
  if (!legacy) return;
  const blob = dataUrlToBlob(legacy);
  if (!blob) return;
  const id = newId();
  await tx("readwrite", (store) => store.put({ id, name: "Background", added: Date.now(), blob }));
  if (!getSelectedImageId()) localStorage.setItem(SELECTED_KEY, id);
  localStorage.removeItem(LEGACY_KEY);
}

export function getSelectedImageId(): string {
  try {
    return localStorage.getItem(SELECTED_KEY) || "";
  } catch {
    return "";
  }
}

export function getLibraryUrl(): string {
  return currentUrl;
}

export function isLibraryVideo(): boolean {
  return currentVideo;
}

export async function listImages(): Promise<LibraryImage[]> {
  try {
    const all = (await tx<LibraryImage[]>("readonly", (store) => store.getAll())) || [];
    return all.sort((a, b) => b.added - a.added);
  } catch {
    return [];
  }
}

export async function addImages(files: File[]): Promise<void> {
  for (const file of files) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) continue;
    const entry: LibraryImage = { id: newId(), name: file.name, added: Date.now(), blob: file };
    await tx("readwrite", (store) => store.put(entry));
  }
}

export async function deleteImage(id: string): Promise<void> {
  await tx("readwrite", (store) => store.delete(id));
  if (getSelectedImageId() !== id) return;
  localStorage.removeItem(SELECTED_KEY);
  await refreshLibrary();
}

export function selectImage(id: string): void {
  localStorage.setItem(SELECTED_KEY, id);
  void refreshLibrary();
}

export async function refreshLibrary(): Promise<void> {
  const id = getSelectedImageId();
  if (id === currentId && (currentUrl || !id)) return;
  let url = "";
  let video = false;
  if (id) {
    try {
      const entry = await tx<LibraryImage | undefined>("readonly", (store) => store.get(id));
      if (entry?.blob) url = URL.createObjectURL(entry.blob);
      video = isVideoBlob(entry?.blob);
    } catch {
    }
  }
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  currentId = id;
  currentUrl = url;
  currentVideo = video;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export async function initBackgroundLibrary(): Promise<void> {
  try {
    await migrateLegacyImage();
  } catch {
  }
  await refreshLibrary();
}
