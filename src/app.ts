import type { Lyrics } from "@/lib/api/types";
import { wait } from "@/lib/dom/wait";
import { getLyrics } from "@/lib/api/lyrics";
import { createButton, updateButtonState } from "@/ui/button";
import { createPanel, renderLyrics, renderEmpty, isPanelVisible, hidePanel } from "@/ui/panel";
import {
  createSidebarLyricsCard,
  setSidebarLyrics,
  setSidebarLyricsMessage,
  updateSidebarLyricsCardState,
  updateSidebarLyricsCardTrack,
} from "@/ui/sidebarCard";
import { injectStyles } from "@/ui/styles";
import { registerPlaybackSync } from "@/ui/lyrics/playback";
import { CUSTOM_SYNC_EVENT } from "@/lib/customSync/store";
import { applySettings } from "@/lib/settings";
import { registerSpotifyLyricsButtonOverride } from "@/lib/spotifyLyricsButton";
import { registerSettingsMenuItem } from "@/ui/settings/menu";
import { registerThemeBridge } from "@/ui/themeBridge";
import { registerAccent } from "@/lib/accent";
import { currentItem, isSpotiKitReady, onPlayer, platform } from "@/lib/spotikit";
import { NOW_PLAYING_EXTRA_CONTROLS } from "@/lib/dom/spotifySelectors";

async function main() {
  const globalScope = window as unknown as { __liquidLyricsLoaded?: boolean };
  if (globalScope.__liquidLyricsLoaded) {
    console.warn("[Liquid Lyrics] Second instance detected — skipping initialization.");
    return;
  }
  globalScope.__liquidLyricsLoaded = true;

  await wait(isSpotiKitReady);

  injectStyles();
  applySettings();
  registerThemeBridge();
  registerAccent();
  registerSettingsMenuItem();
  registerSpotifyLyricsButtonOverride();
  registerPlaybackSync();
  createPanel();
  createSidebarLyricsCard();

  await wait(() => document.querySelector(NOW_PLAYING_EXTRA_CONTROLS)).catch(() => null);
  createButton();

  let currentTrackId: string | null = null;
  let latestLyrics: Lyrics | null = null;
  let latestMessage = "Loading lyrics...";
  let activeRequestId = 0;
  let currentRouteKey = getRouteKey();

  async function onSongChange() {
    const item = currentItem();
    if (!item?.uri) return;

    const trackUri = item.uri;
    const trackId = trackUri.includes(":") ? trackUri.split(":")[2] : trackUri;

    if (trackId === currentTrackId) {
      updateSidebarLyricsCardTrack();
      updateSidebarLyricsCardState();
      return;
    }

    currentTrackId = trackId;
    latestLyrics = null;
    latestMessage = "Loading lyrics...";
    updateSidebarLyricsCardTrack();
    setSidebarLyricsMessage(latestMessage);

    if (isPanelVisible()) {
      renderEmpty(latestMessage);
    }

    await fetchAndStore(trackId, item);
  }

  async function fetchAndStore(trackId: string, item: any) {
    const requestId = ++activeRequestId;
    const result = await getLyrics({
      id: trackId,
      uri: item.uri,
      data: { name: item.name },
    });

    if (requestId !== activeRequestId || trackId !== currentTrackId) return;

    if (result.status === "success" && result.data) {
      latestLyrics = result.data;
      latestMessage = "";
      setSidebarLyrics(result.data);
      if (isPanelVisible()) renderLyrics(result.data);
      return;
    }

    latestLyrics = null;
    latestMessage = result.status === "missing_lyrics"
      ? "No lyrics available for this song"
      : "Could not load lyrics";
    setSidebarLyrics(null, latestMessage, true);
    if (isPanelVisible()) renderEmpty(latestMessage, true);
  }

  onPlayer("track", () => {
    onSongChange();
  });

  window.addEventListener(CUSTOM_SYNC_EVENT, (event) => {
    const item = currentItem();
    const uri = item?.uri;
    if (!uri) return;

    const trackId = uri.includes(":") ? uri.split(":")[2] : uri;
    const detail = (event as CustomEvent).detail ?? {};
    if ((detail.trackUri || detail.trackId) && detail.trackUri !== uri && detail.trackId !== trackId) return;

    latestLyrics = null;
    fetchAndStore(trackId, item);
  });

  const closePanelForRouteChange = (navigated = false) => {
    const nextRouteKey = getRouteKey();
    if (!navigated && nextRouteKey === currentRouteKey) return;
    currentRouteKey = nextRouteKey;

    if (isPanelVisible()) {
      hidePanel();
    }
  };

  setInterval(() => {
    closePanelForRouteChange();
  }, 250);

  const history = platform()?.History;
  if (typeof history?.listen === "function") {
    history.listen(() => closePanelForRouteChange(true));
  }

  let wasPanelVisible = isPanelVisible();

  const observer = new MutationObserver(() => {
    const visible = isPanelVisible();
    updateButtonState();
    updateSidebarLyricsCardState();

    if (visible && !wasPanelVisible && currentTrackId) {
      if (latestLyrics) {
        renderLyrics(latestLyrics);
      } else if (latestMessage && latestMessage !== "Loading lyrics...") {
        renderEmpty(latestMessage, true);
      } else {
        const item = currentItem();
        if (item?.uri) {
          const trackId = item.uri.includes(":") ? item.uri.split(":")[2] : item.uri;
          renderEmpty("Loading lyrics...");
          fetchAndStore(trackId, item);
        }
      }
    }

    wasPanelVisible = visible;
  });

  const panel = document.getElementById("liquid-lyrics-panel");
  if (panel) {
    observer.observe(panel, { attributes: true, attributeFilter: ["class"] });
  }

  updateSidebarLyricsCardState();
  onSongChange();
}

main();

function getRouteKey(): string {
  const history = platform()?.History;
  const historyLocation = history?.location ?? {};
  const path = historyLocation.pathname || historyLocation.path || historyLocation.uri || "";
  const entry = historyLocation.key ?? "";
  return `${location.href}|${path}|${entry}`;
}
