export type Translation = { text: string; language: string };

const MAX_IN_FLIGHT = 4;

const cache = new Map<string, Promise<Translation | null>>();
const resolved = new Map<string, Translation | null>();
const queue: Array<() => void> = [];
let inFlight = 0;

export function translationLanguage(): string {
  const kit = (window as any).SpotiKit;
  return String(kit?.Locale?.language || navigator.language || "en").split("-")[0].toLowerCase();
}

export function cachedTranslation(text: string): Translation | null | undefined {
  return resolved.get(key(text));
}

export function translate(text: string): Promise<Translation | null> {
  const id = key(text);
  let pending = cache.get(id);
  if (!pending) {
    pending = schedule(() => request(text)).then((result) => {
      resolved.set(id, result);
      return result;
    });
    cache.set(id, pending);
  }
  return pending;
}

function key(text: string): string {
  return `${translationLanguage()}\u0000${text}`;
}

function schedule<T>(job: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    const run = () => {
      inFlight++;
      job()
        .then(resolve, () => resolve(null as T))
        .finally(() => {
          inFlight--;
          queue.shift()?.();
        });
    };
    if (inFlight < MAX_IN_FLIGHT) run();
    else queue.push(run);
  });
}

async function request(text: string): Promise<Translation | null> {
  const target = translationLanguage();
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto" +
    `&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  const parts = Array.isArray(data?.[0]) ? data[0] : [];
  const translated = parts.map((part: any) => (typeof part?.[0] === "string" ? part[0] : "")).join("").trim();
  const language = String(typeof data?.[2] === "string" ? data[2] : target).toLowerCase();
  return translated ? { text: translated, language } : null;
}
