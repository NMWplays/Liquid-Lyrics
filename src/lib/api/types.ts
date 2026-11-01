import type { LyricsProviders } from "@/constants";

export type APIStatus = "success" | "error" | "missing_lyrics" | "malformed" | "offline";

export interface APIError {
  code:
    | "NO_PROVIDERS"
    | "PROVIDER_FAILED"
    | "FETCH_FAILED"
    | "OFFLINE"
    | "HANDLER_NOT_FOUND"
    | "MISSING_LYRICS"
    | "PARSE_ERROR";
  message: string;
}
export interface APIResponse<T> {
  status: APIStatus;
  data: T | null;
  error?: APIError;
  queued?: boolean;
}

export interface LyricsHandler {
  id: LyricsProviders;
  fetch(options: FetchOptions): Promise<APIResponse<Lyrics>>;
  cache?: boolean;
}

type FetchData = { name?: string };

export type FetchOptions = {
  id: string;
  uri?: string;
  data: FetchData;
  forceRefresh?: boolean;
};

export type Lyrics = SyllableData | LineData | StaticData;
export type LyricsType = Lyrics["Type"];

type RomanizedText = {
  RomanizedText?: string | null;
  TransliteratedText?: string | null;
};

export type SpicyTTMLUploadMetadata = {
  Maker?: { username?: string; id?: string; avatar?: string };
  Uploader?: { username?: string; id?: string; avatar?: string };
};

type CommonStates = {
  HasRomanizedText: boolean;
  NeedsRomanization: boolean;
  UsedFranc: boolean;
  IsRTL: boolean;
  Provider: LyricsProviders;
  HasTransliterations: boolean;
  source: string;
  TTMLUploadMetadata: SpicyTTMLUploadMetadata;
};

export type TimeRange = {
  StartTime: number;
  EndTime: number;
};

export type Syllable = {
  Text: string;
  IsPartOfWord: boolean;
} & TimeRange &
  RomanizedText;

export type VocalPart = {
  Syllables: Syllable[];
} & TimeRange;

export type AlignedContent = {
  OppositeAligned: boolean;
  IsRTL: boolean;
};

export type SyllableContent = {
  Type: "Vocal";
  Lead: VocalPart;
  Background?: VocalPart[];
} & AlignedContent;

export type SyllableData = {
  Id: string;
  Type: "Syllable";
  SongWriters: string[];
  Artists?: string[];
  Content: SyllableContent[];
} & TimeRange &
  Partial<CommonStates>;

export type LineContent = {
  Type: string;
  Text: string;
} & TimeRange &
  RomanizedText &
  AlignedContent;

export type InterludeContent = {
  Type: "Interlude";
  Text: string;
} & TimeRange &
  AlignedContent;

export type LineData = {
  Id: string;
  Type: "Line";
  SongWriters: string[];
  Artists?: string[];
  Content: LineContent[];
} & TimeRange &
  Partial<CommonStates>;

export type StaticLine = {
  Text: string;
  IsRTL: boolean;
} & RomanizedText;

export type StaticData = {
  Id: string;
  Type: "Static";
  SongWriters: string[];
  Artists?: string[];
  Lines: StaticLine[];
} & Partial<CommonStates>;