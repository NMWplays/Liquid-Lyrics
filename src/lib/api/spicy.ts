import { SPICY_APP_VERSION } from "@/constants";

export type SpicyQuery = {
  operation: string;
  variables: Record<string, any>;
};

const API_URL = "https://api.spicylyrics.org";

let resolvedVersion: string | null = null;
let versionRequest: Promise<void> | null = null;

async function resolveSpicyVersion(): Promise<string> {
  if (resolvedVersion) return resolvedVersion;
  versionRequest ??= (async () => {
    try {
      const response = await fetch(`${API_URL}/version`);
      if (response.ok) {
        const text = (await response.text()).trim();
        if (/^\d+\.\d+\.\d+$/.test(text)) resolvedVersion = text;
      }
    } catch {
    }
    resolvedVersion ??= SPICY_APP_VERSION;
  })();
  await versionRequest;
  return resolvedVersion ?? SPICY_APP_VERSION;
}

export async function sendSpicyRequest(queries: SpicyQuery[], authHeader?: string): Promise<any> {
  const version = await resolveSpicyVersion();

  const response = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "SpicyLyrics-Version": version,
      "X-mode": "2",
      ...(authHeader && { "SpicyLyrics-WebAuth": authHeader }),
    },
    body: JSON.stringify({
      queries,
      client: { version },
    }),
  });

  if (!response.ok) throw new Error(`Spicy request failed with status ${response.status}`);
  return response.json();
}
