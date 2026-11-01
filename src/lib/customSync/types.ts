import type { Lyrics } from "@/lib/api/types";

export type SyncMode = "line" | "word";

export type EditorToken = {
  text: string;
  start: number | null;
};

export type EditorBackground = {
  text: string;
  tokens: EditorToken[];
  start: number | null;
  end: number | null;
};

export type EditorLine =
  | { kind: "interlude"; start: number | null }
  | {
      kind: "lyric";
      text: string;
      tokens: EditorToken[];
      backgrounds: EditorBackground[];
      start: number | null;
      end: number | null;
    };

export type EditorDraft = {
  trackId: string;
  trackUri: string;
  title: string;
  artist: string;
  durationMs: number;
  mode: SyncMode;
  credit?: string;
  lines: EditorLine[];
  endMs: number | null;
  updatedAt: number;
};

export type StoredSync = {
  version: 1;
  trackId: string;
  trackUri: string;
  title: string;
  artist: string;
  durationMs: number;
  mode: SyncMode;
  credit?: string;
  updatedAt: number;
  lyrics: Lyrics;
  draft: EditorDraft;
};

export type CustomSyncMeta = {
  trackId: string;
  trackUri: string;
  title: string;
  artist: string;
  mode: SyncMode;
  updatedAt: number;
};
