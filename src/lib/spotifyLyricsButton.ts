import { getSettings } from "@/lib/settings";
import { togglePanel } from "@/ui/panel";
import { SPOTIFY_LYRICS_BUTTON } from "@/lib/dom/spotifySelectors";

export const SPOTIFY_LYRICS_BUTTON_SELECTOR = SPOTIFY_LYRICS_BUTTON;

let registered = false;

export function registerSpotifyLyricsButtonOverride() {
  if (registered) return;
  registered = true;

  document.addEventListener(
    "click",
    (event) => {
      if (getSettings().spotifyLyricsButton !== "override") return;

      const target = event.target as HTMLElement | null;
      if (!target?.closest?.(SPOTIFY_LYRICS_BUTTON_SELECTOR)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      togglePanel();
    },
    true,
  );
}
