import type {
  Lyrics,
  APIResponse,
  StaticData,
  LineContent,
  LineData,
  InterludeContent,
  FetchOptions,
  StaticLine,
} from "@/lib/api/types";
import { http } from "@/lib/spotikit";

export async function fetchSpotify({ id }: FetchOptions): Promise<APIResponse<Lyrics>> {
  try {
    const trackId = id.includes(":") ? id.split(":")[2] : id;
    const baseURL = "https://spclient.wg.spotify.com/color-lyrics/v2/track/";

    let body: any;
    try {
      body = await http().get(`${baseURL}${trackId}?format=json&vocalRemoval=false&market=from_token`);
    } catch {
      return {
        status: "error",
        data: null,
        error: { code: "FETCH_FAILED", message: "Spotify Request error" },
      };
    }

    const lyrics = body?.lyrics;
    if (!lyrics) {
      return { status: "missing_lyrics", data: null };
    }

    const lines = lyrics.lines;
    let result: Lyrics;

    if (lyrics.syncType === "LINE_SYNCED") {
      const content: LineContent[] = lines.map((line: any, index: number) => {
        const startTime = Number(line.startTimeMs) || 0;
        const endTime =
          index < lines.length - 1 ? Number(lines[index + 1].startTimeMs) : startTime + 5000;

        if (line.words === "♪") {
          return {
            Type: "Interlude",
            Text: line.words,
            StartTime: startTime,
            EndTime: endTime,
            OppositeAligned: false,
            IsRTL: false,
          } satisfies InterludeContent;
        }

        return {
          Type: "Line",
          Text: line.words,
          StartTime: startTime,
          EndTime: endTime,
          OppositeAligned: false,
          IsRTL: false,
        } satisfies LineContent;
      });

      result = {
        Id: trackId,
        Type: "Line",
        SongWriters: [],
        Content: content,
        StartTime: content.length > 0 ? content[0].StartTime : 0,
        EndTime: content.length > 0 ? content[content.length - 1].EndTime : 0,
        Provider: "spotify",
      } satisfies LineData;
    } else {
      result = {
        Id: trackId,
        Type: "Static",
        SongWriters: [],
        Lines: lines.map(
          (line: any) =>
            ({
              Text: line.words,
              IsRTL: false,
            }) satisfies StaticLine,
        ),
        Provider: "spotify",
      } satisfies StaticData;
    }

    return { status: "success", data: result };
  } catch (err) {
    return {
      status: "error",
      data: null,
      error: {
        code: "PROVIDER_FAILED",
        message: err instanceof Error ? err.message : String(err),
      },
    };
  }
}
