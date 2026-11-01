import { wait } from "@/lib/dom/wait";
import { http, platform } from "@/lib/spotikit";

type TokenResponse = {
  accessToken: string;
  expiresAtTime: number;
  tokenType: "Bearer";
};

type AuthorizationState = {
  isAuthorized?: boolean;
  token?: {
    accessToken?: string;
    accessTokenExpirationTimestampMs?: number;
  } | null;
};

let tokenCache: TokenResponse | undefined;
let inflight: Promise<string> | undefined;

const EXPIRY_MARGIN_MS = 2000;

export async function getAuthToken(): Promise<string> {
  const platform = await getPlatform();

  const live = fromAuthorizationAPI(platform);
  if (live) return live.accessToken;

  if (isUsable(tokenCache)) return tokenCache.accessToken;
  tokenCache = undefined;

  if (inflight) return inflight;
  const pending = resolveLegacyToken(platform).finally(() => {
    if (inflight === pending) inflight = undefined;
  });
  inflight = pending;
  return pending;
}

function isUsable(token: TokenResponse | undefined): token is TokenResponse {
  if (!token?.accessToken) return false;
  if (!Number.isFinite(token.expiresAtTime)) return true;
  return token.expiresAtTime - Date.now() > EXPIRY_MARGIN_MS;
}

async function getPlatform(): Promise<any> {
  return platform() ?? wait(platform);
}

function fromAuthorizationAPI(platform: any): TokenResponse | undefined {
  try {
    const api = platform?.AuthorizationAPI;
    if (typeof api?.getState !== "function") return undefined;

    const state: AuthorizationState = api.getState();
    if (state?.isAuthorized === false) return undefined;
    const token = state?.token;
    if (!token?.accessToken) return undefined;

    return {
      accessToken: token.accessToken,
      expiresAtTime: Number(token.accessTokenExpirationTimestampMs),
      tokenType: "Bearer",
    };
  } catch {
    return undefined;
  }
}

async function resolveLegacyToken(platform: any): Promise<string> {
  const next = (await fromCosmosResolver()) ?? fromSession(platform);
  if (!next?.accessToken) throw new Error("Could not retrieve Spotify Access Token");
  tokenCache = next;
  return next.accessToken;
}

async function fromCosmosResolver(): Promise<TokenResponse | undefined> {
  try {
    const result: Partial<TokenResponse> | undefined = await http()?.get("sp://oauth/v2/token");
    if (!result?.accessToken) return undefined;
    return {
      accessToken: result.accessToken,
      expiresAtTime: Number(result.expiresAtTime),
      tokenType: "Bearer",
    };
  } catch {
    return undefined;
  }
}

function fromSession(platform: any): TokenResponse | undefined {
  const session = platform?.Session;
  if (!session?.accessToken) return undefined;
  return {
    accessToken: session.accessToken,
    expiresAtTime: Number(session.accessTokenExpirationTimestampMs),
    tokenType: "Bearer",
  };
}
