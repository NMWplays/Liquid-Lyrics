import type { Lyrics, APIResponse, FetchOptions, LyricsHandler } from "@/lib/api/types";
import { PROVIDERS_ORDER, type LyricsProviders } from "@/constants";
import { fetchSpotify } from "@/lib/api/providers/spotify";
import { fetchSpicy } from "@/lib/api/providers/spicyProvider";
import { getCustomSync } from "@/lib/customSync/store";

const handlers: Partial<Record<LyricsProviders, LyricsHandler>> = {
  spotify: { id: "spotify", fetch: fetchSpotify },
  spicy: { id: "spicy", fetch: fetchSpicy },
};

const cache = new Map<string, Lyrics>();

export async function getLyrics(options: FetchOptions): Promise<APIResponse<Lyrics>> {
  const cacheKey = options.id;

  const custom = getCustomSync(options.uri ?? options.id);
  if (custom) {
    return { status: "success", data: custom.lyrics };
  }

  if (!options.forceRefresh && cache.has(cacheKey)) {
    return { status: "success", data: cache.get(cacheKey)! };
  }

  let sawMissingLyrics = false;
  let sawQueued = false;

  for (const providerId of PROVIDERS_ORDER) {
    const handler = handlers[providerId];
    if (!handler) continue;

    const result = await handler.fetch(options);

    if (result.status === "success" && result.data) {
      if (!hasRenderableContent(result.data)) {
        sawMissingLyrics = true;
        continue;
      }

      const data = providerId === "spicy"
        ? await enrichWithSpotifyOriginalLines(options, result.data)
        : result.data;
      if (!sawQueued) cache.set(cacheKey, data);
      return { ...result, data };
    }

    if (result.status === "missing_lyrics") {
      sawMissingLyrics = true;
      if (result.queued) sawQueued = true;
      continue;
    }
  }

  if (sawMissingLyrics) {
    return { status: "missing_lyrics", data: null };
  }

  return {
    status: "error",
    data: null,
    error: { code: "NO_PROVIDERS", message: "All providers failed" },
  };
}

export function clearLyricsCache() {
  cache.clear();
}

function hasRenderableContent(data: Lyrics): boolean {
  if (data.Type === "Static") {
    return (data.Lines ?? []).some((line) => String(line.Text ?? "").trim().length > 0);
  }
  return (data.Content ?? []).length > 0;
}

type TimedOriginalLine = {
  text: string;
  start: number;
  end: number;
};

async function enrichWithSpotifyOriginalLines(options: FetchOptions, data: Lyrics): Promise<Lyrics> {
  if (data.Type !== "Syllable" && data.Type !== "Line") return data;

  try {
    const spotifyResult = await fetchSpotify(options);
    if (spotifyResult.status !== "success" || !spotifyResult.data) return data;

    const originals = getSpotifyOriginalLines(spotifyResult.data);
    if (originals.length === 0) return data;

    if (data.Type === "Line") return data;

    data.Content.forEach((item) => {
      const lead = item.Lead;
      const match = findNearestOriginalLine(originals, lead?.StartTime ?? 0, lead?.EndTime ?? 0);
      if (match) {
        (item as any).LiquidLyricsOriginalText = match.text;
        if (lead) (lead as any).LiquidLyricsOriginalText = match.text;
      }
    });
  } catch {
    return data;
  }

  return data;
}

function getSpotifyOriginalLines(data: Lyrics): TimedOriginalLine[] {
  if (data.Type !== "Line") return [];

  return data.Content
    .filter((line) => line.Type !== "Interlude")
    .map((line) => ({
      text: cleanOriginalLineText(line.Text),
      start: Number(line.StartTime) || 0,
      end: Number(line.EndTime) || 0,
    }))
    .filter((line) => line.text && !line.text.includes("\u266a") && !line.text.includes("â™ª"));
}

function findNearestOriginalLine(
  originals: TimedOriginalLine[],
  start: number,
  end: number,
): TimedOriginalLine | null {
  const lineStart = Number(start) || 0;
  const lineEnd = Number(end) || lineStart;
  const lineCenter = (lineStart + lineEnd) / 2;
  let best: TimedOriginalLine | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const original of originals) {
    const originalCenter = (original.start + original.end) / 2;
    const startDistance = Math.abs(original.start - lineStart);
    const centerDistance = Math.abs(originalCenter - lineCenter);
    const score = startDistance * 0.75 + centerDistance * 0.25;
    if (score < bestScore) {
      best = original;
      bestScore = score;
    }
  }

  return best && bestScore <= 3500 ? best : null;
}

function cleanOriginalLineText(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}
