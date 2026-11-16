import { getSettings } from "@/lib/settings";
import { isPanelMaximized, showPanelFullscreen, togglePanel } from "@/ui/panel";
import { SPOTIFY_FULLSCREEN_BUTTON, SPOTIFY_LYRICS_BUTTON } from "@/lib/dom/spotifySelectors";

export const SPOTIFY_LYRICS_BUTTON_SELECTOR = SPOTIFY_LYRICS_BUTTON;

let registered = false;

export function registerSpotifyLyricsButtonOverride() {
  if (registered) return;
  registered = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const settings = getSettings();

      if (settings.spotifyFullscreenButton === "liquidLyrics" && target?.closest?.(SPOTIFY_FULLSCREEN_BUTTON)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!isPanelMaximized()) showPanelFullscreen();
        return;
      }

      if (settings.spotifyLyricsButton !== "override") return;
      if (!target?.closest?.(SPOTIFY_LYRICS_BUTTON_SELECTOR)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      togglePanel();
    },
    true,
  );
}
