import { sendSpicyRequest } from "@/lib/api/spicy";
import { isPackedPayload, unpackSpicyPayload } from "@/lib/api/spicyObjPack";
import type { Lyrics, APIResponse, FetchOptions } from "@/lib/api/types";
import { getAuthToken } from "@/lib/spotify";

export async function fetchSpicy({ id }: FetchOptions): Promise<APIResponse<Lyrics>> {
  try {
    const response = await _fetchSpicy(id);
    const queryResult = getLyricsQuery(response);

    if (!response || !queryResult) {
      warn("the response carried no lyrics job", response);
      return {
        status: "error",
        data: null,
        error: { code: "FETCH_FAILED", message: "Network or Validation failed" },
      };
    }

    const parsedResult = parseSpicyResult(queryResult.result);

    if (parsedResult.status === "missing_lyrics") {
      return { status: "missing_lyrics", data: null, queued: parsedResult.queued };
    }

    if (parsedResult.status === "error") {
      warn(parsedResult.message);
      return {
        status: "error",
        data: null,
        error: { code: "PROVIDER_FAILED", message: parsedResult.message },
      };
    }

    const data = parsedResult.data;
    data.Provider = "spicy";
    convertTimesToMs(data);
    adoptTransliterations(data);
    return { status: "success", data };
  } catch (err) {
    warn("the request never completed", err);
    return {
      status: "error",
      data: null,
      error: {
        code: "FETCH_FAILED",
        message: err instanceof Error ? err.message : String(err),
      },
    };
  }
}

function warn(reason: string, detail?: unknown) {
  if (detail === undefined) console.warn(`[Liquid Lyrics] Spicy Lyrics unavailable: ${reason}`);
  else console.warn(`[Liquid Lyrics] Spicy Lyrics unavailable: ${reason}`, detail);
}

type LyricsError = {
  error: string;
  message?: string;
  code?: number;
};

type LyricsResult = {
  format: "json";
  httpStatus?: number;
  data?: Lyrics | LyricsError;
};

type SpicyQuery = {
  operation: "lyrics";
  operationId: string;
  result: LyricsResult;
};

type SpicyResponse = {
  queries: Array<SpicyQuery | SpicyQuery[]>;
};

type ParsedSpicyResult =
  | { status: "success"; data: Lyrics }
  | { status: "missing_lyrics"; queued?: boolean }
  | { status: "error"; message: string };

type SpicyVariables = {
  id: string;
  auth: "SpicyLyrics-WebAuth";
};

type SpicyRequestPayload = {
  operation: "lyrics";
  variables: SpicyVariables;
};

export async function _fetchSpicy(id: string): Promise<SpicyResponse> {
  const token = await getAuthToken();
  const bearerToken = `Bearer ${token}`;

  const payload: SpicyRequestPayload[] = [
    {
      operation: "lyrics",
      variables: {
        id,
        auth: "SpicyLyrics-WebAuth",
      },
    },
  ];

  return await sendSpicyRequest(payload, bearerToken);
}

function convertTimesToMs(data: Lyrics) {
  if (data.Type === "Static") return;

  const s2ms = (t: number) => Math.round(Number(t || 0) * 1000);

  data.StartTime = s2ms(data.StartTime);
  data.EndTime = s2ms(data.EndTime);

  if (data.Type === "Syllable") {
    for (const item of data.Content) {
      if (item.Lead) {
        item.Lead.StartTime = s2ms(item.Lead.StartTime);
        item.Lead.EndTime = s2ms(item.Lead.EndTime);
        for (const syl of item.Lead.Syllables) {
          syl.StartTime = s2ms(syl.StartTime);
          syl.EndTime = s2ms(syl.EndTime);
        }
      }
      if (item.Background) {
        for (const bg of item.Background) {
          bg.StartTime = s2ms(bg.StartTime);
          bg.EndTime = s2ms(bg.EndTime);
          for (const syl of bg.Syllables) {
            syl.StartTime = s2ms(syl.StartTime);
            syl.EndTime = s2ms(syl.EndTime);
          }
        }
      }
    }
  } else if (data.Type === "Line") {
    for (const line of data.Content) {
      line.StartTime = s2ms(line.StartTime);
      line.EndTime = s2ms(line.EndTime);
    }
  }
}

function adoptTransliterations(data: Lyrics) {
  const adopt = (entity: { RomanizedText?: string | null; TransliteratedText?: string | null }) => {
    if (!entity.RomanizedText && entity.TransliteratedText) {
      entity.RomanizedText = entity.TransliteratedText;
    }
  };

  if (data.Type === "Static") {
    data.Lines?.forEach(adopt);
    return;
  }
  if (data.Type === "Line") {
    data.Content?.forEach(adopt);
    return;
  }
  for (const item of data.Content ?? []) {
    item.Lead?.Syllables?.forEach(adopt);
    item.Background?.forEach((part) => part.Syllables?.forEach(adopt));
  }
}

function parseSpicyResult(result: LyricsResult | Lyrics | LyricsError | undefined): ParsedSpicyResult {
  if (!result || typeof result !== "object") {
    return { status: "error", message: "Spicy returned an empty result" };
  }

  const wrapper = result as LyricsResult;
  const httpStatus = wrapper.httpStatus;
  let payload: unknown = wrapper.data ?? result;

  if (httpStatus === 404 || isLyricsError(payload, "MISSING_LYRICS")) {
    return { status: "missing_lyrics" };
  }

  if (httpStatus === 503) {
    return { status: "missing_lyrics", queued: true };
  }

  if (httpStatus && httpStatus !== 200) {
    return { status: "error", message: getLyricsErrorMessage(payload) };
  }

  if (isLyricsError(payload)) {
    return { status: "error", message: getLyricsErrorMessage(payload) };
  }

  if (isPackedPayload(payload)) {
    try {
      payload = unpackSpicyPayload(payload);
    } catch (error) {
      return { status: "error", message: error instanceof Error ? error.message : "Malformed packed payload" };
    }
  }

  if (!isLyrics(payload)) {
    return { status: "error", message: "Unexpected response from Spicy" };
  }

  return { status: "success", data: payload };
}

function getLyricsQuery(response: SpicyResponse | undefined): SpicyQuery | undefined {
  const queries = response?.queries.flat() ?? [];
  return (
    queries.find((query) => query?.operation === "lyrics" && Boolean(query?.result)) ??
    queries.find((query) => Boolean(query?.result))
  );
}

function isLyrics(value: unknown): value is Lyrics {
  if (!value || typeof value !== "object" || !("Type" in value)) return false;
  const type = (value as { Type: unknown }).Type;
  return type === "Syllable" || type === "Line" || type === "Static";
}

function isLyricsError(value: unknown, code?: string): value is LyricsError {
  if (!value || typeof value !== "object" || !("error" in value)) return false;
  const error = (value as { error: unknown }).error;
  return typeof error === "string" && (!code || error === code);
}

function getLyricsErrorMessage(value: unknown): string {
  if (isLyricsError(value)) return value.message ?? value.error;
  return "Unexpected Error from Spicy";
}
