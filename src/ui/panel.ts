import type { Lyrics } from "@/lib/api/types";
import {
  getActiveTarget,
  isLatinTarget,
  isRomanizationEnabled,
  ROMANIZATION_EVENT,
  TARGET_INFO,
} from "@/lib/romanization/modes";
import { closeRomanizationMenu, closeRomanizationMenuFor, toggleRomanizationMenu } from "@/ui/romanizationMenu";
import { hideTooltip, registerTooltip } from "@/ui/tooltip";
import { LyricsView } from "@/ui/lyrics/view";
import { createEmptyState, createLyricsSkeleton, isLoadingMessage } from "@/ui/lyrics/status";
import { subscribeClock } from "@/ui/lyrics/clock";
import {
  getCurrentTrackUri,
  getPlayerProgress,
  getTrackDuration,
  isPlayerPlaying,
  seekTo,
  togglePlayback,
} from "@/ui/lyrics/playback";
import { EDITOR_VISIBILITY_EVENT, isEditorOpen, openEditor } from "@/ui/lyrics/editor/editor";
import { registerIdleUi, refreshIdleUi } from "@/ui/idleUi";
import { closeSettingsMenu, GEAR_ICON, toggleSettingsMenu } from "@/ui/settings/menu";
import { maybeStartOnboarding } from "@/ui/onboarding";
import { LyricsBackground } from "@/ui/background/background";
import {
  cancelCanvasRetry,
  captureCanvasStream,
  findSpotifyCanvasVideo,
  isStreamLive,
  scheduleCanvasRetry,
} from "@/ui/songCanvas";
import {
  getSettings,
  isBackgroundVisible,
  SETTINGS_EVENT,
  setSetting,
  toggleBackgroundVisible,
  type CardStyle,
  type NoLyricsView,
} from "@/lib/settings";
import { MAIN_VIEW, NPV_COVER_IMAGE } from "@/lib/dom/spotifySelectors";
import { currentItem, navigate, onPlayer, platform, player, windowControlsStrip } from "@/lib/spotikit";
import { createVolumeControl, type VolumeControl } from "@/ui/volume";

const CARD_SWAP_MS = 460;
const CARD_SLIDE_MS = 520;
const CARD_INTRO_MS = 620;
const LYRICS_ARRIVAL_CLASS = "ll-lyrics-arriving";
const HEART_ANIM_MS = 800;

const PANEL_ID = "liquid-lyrics-panel";
const SONG_CARD_STORAGE_KEY = "liquid-lyrics-song-card-visible";
const ANIMATED_BG_STORAGE_KEY = "liquid-lyrics-animated-bg";
const LIQUIFY_BG_MODE_KEY = "liquify-bg-mode";
const FLOATING_PLAYER_STYLES = ["liquify-floating-player-style", "glowify-floating-player-style"];
export { ROMANIZATION_EVENT };

const GITHUB_URL = "https://github.com/NMWplays/Liquid-Lyrics";
const DISCORD_URL = "https://discord.gg/xGUq5mhWKA";

const CARD_STATE_SYNC_MS = 500;

type SongCardRefs = {
  card: HTMLElement;
  cover: HTMLImageElement;
  canvas: HTMLElement;
  canvasVideo: HTMLVideoElement;
  canvasStage: HTMLElement;
  vinyl: HTMLElement;
  heart: HTMLButtonElement;
  title: HTMLElement;
  album: HTMLButtonElement;
  artist: HTMLButtonElement;
  playButton: HTMLElement;
  shuffleButton: HTMLButtonElement;
  repeatButton: HTMLButtonElement;
  progressTrack: HTMLElement;
  progressFill: HTMLElement;
  progressThumb: HTMLElement;
  currentTime: HTMLElement;
  durationTime: HTMLElement;
  volume: VolumeControl;
};

let lyricsView: LyricsView | null = null;
let renderedLyrics: Lyrics | null = null;
let lastEmpty: { message: string; allowCreate: boolean; style: NoLyricsView } | null = null;
let cardReturnToken = 0;
let cardIntroTimer = 0;
let songCard: SongCardRefs | null = null;
let unsubscribeCardClock: (() => void) | null = null;
let lastCardStateSync = 0;
let lastCardCurrentText = "";
let lastCardDurationText = "";
let lastCardRatio = -1;
let lastCardPercent = -1;
let canvasSource: HTMLVideoElement | null = null;
let canvasStream: MediaStream | null = null;
let canvasTrack = "";

let fullscreenListenerRegistered = false;
let playerListenerRegistered = false;
let romanizationListenerRegistered = false;
let editorListenerRegistered = false;
let returnToPanelOnExit = true;
let previousLiquifyBackgroundMode: string | null | undefined;
let fullscreenPlaceholder: Comment | null = null;
let background: LyricsBackground | null = null;
let settingsListenerRegistered = false;

export function createPanel(): HTMLElement {
  const existing = document.getElementById(PANEL_ID);
  if (existing) return existing;

  const panel = document.createElement("div");
  panel.id = PANEL_ID;
  panel.className = "liquid-lyrics-panel";

  const glassBg = document.createElement("div");
  glassBg.className = "liquid-lyrics-glass-bg";

  background = new LyricsBackground("panel");
  const transparentControls = createTransparentControlsOverlay();

  const header = document.createElement("div");
  header.className = "liquid-lyrics-header";

  const title = document.createElement("span");
  title.className = "liquid-lyrics-title";
  title.textContent = "Liquid Lyrics";

  const headerActions = document.createElement("div");
  headerActions.className = "ll-header-actions";
  headerActions.append(
    createSettingsButton(),
    createExternalLinkButton("ll-header-btn ll-github-btn", STAR_ICON, "Star on GitHub", GITHUB_URL),
    createExternalLinkButton("ll-header-btn ll-discord-btn", DISCORD_ICON, "Join the Discord", DISCORD_URL),
  );

  header.append(title, headerActions);

  const view = document.createElement("div");
  view.className = "liquid-lyrics-view";

  const card = createSongCard();

  const content = document.createElement("div");
  content.className = "liquid-lyrics-content";

  view.append(card, content);

  const controls = createControlPill();

  panel.append(background.el, glassBg, transparentControls, header, view, controls);
  applyPanelOptionClasses(panel);
  syncTransparentControlsOverlay(panel);
  syncLiquifyFloatingPlayer(panel);

  const mainView = document.querySelector<HTMLElement>(MAIN_VIEW);
  (mainView ?? document.body).appendChild(panel);

  lyricsView = new LyricsView({
    container: content,
    variant: "panel",
    onRomanizationAvailability: (hasRomanization) => {
      panel.classList.toggle("ll-has-romanization", hasRomanization);
      updatePanelOptionStates();
    },
  });

  updateSongCard();
  updatePanelOptionStates();

  (window as any).__liquidLyricsRomanizationDump = () => lyricsView?.debugDump();

  if (!fullscreenListenerRegistered) {
    fullscreenListenerRegistered = true;
    document.addEventListener("fullscreenchange", onFullscreenChange);
  }
  if (!romanizationListenerRegistered) {
    romanizationListenerRegistered = true;
    window.addEventListener(ROMANIZATION_EVENT, () => {
      lyricsView?.setRomanized(getActiveTarget(lyricsView.language), isPanelVisible());
      updatePanelOptionStates();
    });
  }
  if (!editorListenerRegistered) {
    editorListenerRegistered = true;
    window.addEventListener(EDITOR_VISIBILITY_EVENT, () => {
      if (isEditorOpen()) {
        lyricsView?.setEnabled(false);
        stopSongCardClock();
      } else if (isPanelVisible()) {
        lyricsView?.setEnabled(true);
        startSongCardClock();
      }
    });
  }
  registerPlayerStateListeners();
  registerIdleUi(panel, () => isMaximized(panel));

  if (!settingsListenerRegistered) {
    settingsListenerRegistered = true;
    window.addEventListener(SETTINGS_EVENT, () => {
      const live = document.getElementById(PANEL_ID);
      if (live) applyPanelOptionClasses(live);
      background?.apply();
      if (lastEmpty && lastEmpty.style !== getSettings().noLyricsView) {
        renderEmpty(lastEmpty.message, lastEmpty.allowCreate);
      }
      refreshIdleUi();
    });
  }

  return panel;
}

export function showPanel() {
  const panel = createPanel();
  returnToPanelOnExit = true;
  clearCardReturn(panel);
  panel.querySelector(".liquid-lyrics-content")?.classList.remove(LYRICS_ARRIVAL_CLASS);
  panel.classList.add("visible");
  background?.markNextCoverInstant();
  updateSongCard();
  updatePanelOptionStates();
  lyricsView?.setEnabled(!isEditorOpen());
  background?.setEnabled(true);
  startSongCardClock();
  syncLiquifyFloatingPlayer(panel);

  maybeStartOnboarding();

  const mainView = adoptIntoMainView(panel);
  if (!mainView) return;

  for (const child of Array.from(mainView.children)) {
    const el = child as HTMLElement;
    if (el.id === PANEL_ID || !el.style) continue;

    if (el.dataset.liquidHidden === undefined) {
      el.dataset.liquidHidden = `${el.style.opacity}|${el.style.pointerEvents}|${el.style.contentVisibility}`;
    }
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.contentVisibility = "hidden";
  }
}

export function hidePanel() {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;

  panel.classList.remove("visible");
  lyricsView?.setEnabled(false);
  background?.setEnabled(false);
  stopSongCardClock();
  syncCanvasPlayback();
  closeSettingsMenu();
  closeRomanizationMenu();
  exitMaximized(panel);
  syncLiquifyAnimatedBackground();
  refreshIdleUi();

  const mainView = panel.closest(MAIN_VIEW);
  if (!mainView) return;

  for (const child of Array.from(mainView.children)) {
    const el = child as HTMLElement;
    if (el.id === PANEL_ID || el.dataset.liquidHidden === undefined) continue;

    const [opacity = "", pointerEvents = "", contentVisibility = ""] = el.dataset.liquidHidden.split("|");
    el.style.opacity = opacity;
    el.style.pointerEvents = pointerEvents;
    el.style.contentVisibility = contentVisibility;
    delete el.dataset.liquidHidden;
  }
}

function adoptIntoMainView(panel: HTMLElement): HTMLElement | null {
  const mainView = document.querySelector<HTMLElement>(MAIN_VIEW);
  if (mainView && !isMaximized(panel) && panel.parentElement !== mainView) {
    mainView.appendChild(panel);
  }
  return panel.closest<HTMLElement>(MAIN_VIEW);
}

export function togglePanel() {
  if (isPanelVisible()) {
    hidePanel();
  } else {
    showPanel();
  }
}

export function isPanelVisible(): boolean {
  return document.getElementById(PANEL_ID)?.classList.contains("visible") ?? false;
}

export function isPanelMaximized(): boolean {
  const panel = document.getElementById(PANEL_ID);
  return Boolean(panel?.classList.contains("visible") && isMaximized(panel));
}

export function showPanelFullscreen(returnToPanel = isPanelVisible()) {
  const panel = createPanel();
  if (returnToPanel) showPanel();
  enterMaximized(panel, "fullscreen");
  afterDisplayModeChange(panel);
}

export function renderLyrics(lyrics: Lyrics) {
  const panel = createPanel();
  if (!lyricsView) return;

  lastEmpty = null;

  if (renderedLyrics === lyrics && lyricsView.hasLyrics) {
    lyricsView.setEnabled(isPanelVisible() && !isEditorOpen());
    updateSongCard();
    return;
  }

  if (panel.dataset.emptyStyle) {
    const flight = slideCardBetweenLayouts(panel, () => {
      delete panel.dataset.emptyStyle;
    });

    const token = ++cardReturnToken;

    const mount = () => {
      if (token !== cardReturnToken) return;
      applyLyrics(lyrics);
      playLyricsArrival();
    };

    if (flight) flight.finished.then(mount, mount);
    else mount();
    return;
  }

  applyLyrics(lyrics);
}

function playLyricsArrival() {
  const content = document.querySelector<HTMLElement>(`#${PANEL_ID} .liquid-lyrics-content`);
  if (!content) return;

  content.classList.remove(LYRICS_ARRIVAL_CLASS);
  void content.offsetWidth;
  content.classList.add(LYRICS_ARRIVAL_CLASS);
}

function applyLyrics(lyrics: Lyrics) {
  if (!lyricsView) return;

  closeRomanizationMenu();

  renderedLyrics = lyrics;
  lyricsView.setLyrics(lyrics);
  const target = getActiveTarget(lyricsView.language);
  lyricsView.setRomanized(target, target !== null);
  lyricsView.setEnabled(isPanelVisible() && !isEditorOpen());
  updateSongCard();
  updatePanelOptionStates();
}

export function renderEmpty(message: string, allowCreate = false) {
  const panel = createPanel();
  if (!lyricsView) return;

  cardReturnToken++;
  renderedLyrics = null;
  lyricsView.setLyrics(null);
  updateSongCard();

  if (!allowCreate && isLoadingMessage(message)) {
    lyricsView.container.appendChild(
      createLyricsSkeleton("panel", lyricsView.container, lyricsView.scroller),
    );
    lyricsView.resetScroll();
    panel.classList.remove("ll-has-romanization");
    updatePanelOptionStates();
    return;
  }

  const style = allowCreate ? getSettings().noLyricsView : "message";
  lastEmpty = { message, allowCreate, style };

  const empty = createEmptyState({
    className: "liquid-lyrics-empty",
    iconClassName: "ll-empty-icon",
    messageClassName: "ll-empty-message",
    buttonClassName: "ll-empty-create-btn",
    message,
    showMessage: style === "message",
    icon: style === "vinyl" ? createVinyl() : null,
    allowCreate: allowCreate && style !== "vinyl",
    onCreate: () => openEditor(),
  });
  empty.dataset.style = style;

  lyricsView.container.appendChild(empty);
  lyricsView.resetScroll();

  slideCardBetweenLayouts(panel, () => {
    panel.dataset.emptyStyle = style;
  });
  panel.classList.remove("ll-has-romanization");
  updatePanelOptionStates();
}

function slideCardBetweenLayouts(panel: HTMLElement, apply: () => void): Animation | null {
  const card = panel.querySelector<HTMLElement>(".liquid-lyrics-song-card");
  const first = card?.getBoundingClientRect();
  apply();

  if (!card || !first || first.width < 1 || typeof card.animate !== "function") return null;
  const last = card.getBoundingClientRect();
  if (last.width < 1) return null;

  const dx = first.left - last.left;
  const dy = first.top - last.top;
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(first.width - last.width) < 1) return null;

  return card.animate(
    [
      { transform: `translate(${dx}px, ${dy}px)`, width: `${first.width}px` },
      { transform: "none", width: `${last.width}px` },
    ],
    { duration: CARD_SLIDE_MS, easing: "cubic-bezier(0.34, 1.42, 0.64, 1)" },
  );
}

function createVinyl(className = "ll-empty-vinyl"): HTMLElement {
  const vinyl = document.createElement("div");
  vinyl.className = className;
  vinyl.setAttribute("aria-hidden", "true");

  const disc = document.createElement("div");
  disc.className = "ll-vinyl-disc";

  const cover = document.createElement("img");
  cover.className = "ll-vinyl-cover";
  cover.alt = "";
  cover.decoding = "async";
  const url = getCurrentTrackInfo().cover;
  if (url) cover.src = url;

  const label = document.createElement("div");
  label.className = "ll-vinyl-label";
  const hole = document.createElement("div");
  hole.className = "ll-vinyl-hole";
  label.appendChild(hole);

  disc.append(cover, label);
  vinyl.appendChild(disc);
  return vinyl;
}

type IconName = keyof typeof ICONS;

const ICONS = {
  shuffle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',
  previous: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',
  cover: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',
  roman: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',
  furigana:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">字</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">じ</text></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',
  cinema: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.4"/><path d="M3 9.2h18"/><path d="m7.2 5-1.7 4.2"/><path d="M12 5l-1.7 4.2"/><path d="m16.8 5-1.7 4.2"/></svg>',
  animatedBg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',
  cardSide:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v17"/><path d="M8.4 8.5 4.6 12l3.8 3.5"/><path d="M15.6 8.5 19.4 12l-3.8 3.5"/></svg>',
} as const;

const STAR_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>';

const DISCORD_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';

function createSettingsButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ll-header-btn ll-settings-btn";
  button.setAttribute("aria-label", "Liquid Lyrics settings");
  button.innerHTML = GEAR_ICON;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSettingsMenu();
  });
  registerTooltip(button, "Settings");
  return button;
}

function createExternalLinkButton(className: string, icon: string, label: string, url: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  button.innerHTML = icon;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    window.open(url, "_blank");
  });
  registerTooltip(button, label);
  return button;
}

function createTransparentControlsOverlay(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.className = "liquid-lyrics-transparent-controls";
  overlay.setAttribute("aria-hidden", "true");
  return overlay;
}

function createTransportRow(): HTMLElement {
  const row = document.createElement("div");
  row.className = "ll-song-card-controls";
  row.append(
    createIconButton("ll-song-card-btn ll-song-card-shuffle", "shuffle", "Shuffle", () =>
      runPlayerAction(() => player()?.setShuffle(!player()?.shuffle)),
    ),
    createIconButton("ll-song-card-btn", "previous", "Previous", () => runPlayerAction(() => player()?.previous())),
    createIconButton("ll-song-card-btn ll-song-card-play", "play", "Play", () => {
      runPlayerAction(togglePlayback);
      window.setTimeout(updateSongCard, 60);
    }),
    createIconButton("ll-song-card-btn", "next", "Next", () => runPlayerAction(() => player()?.next())),
    createIconButton("ll-song-card-btn ll-song-card-repeat", "repeat", "Repeat", () =>
      runPlayerAction(() => player()?.setRepeat(NEXT_REPEAT[getRepeatMode()])),
    ),
  );
  return row;
}

function createSongCard(): HTMLElement {
  const card = document.createElement("aside");
  card.className = "liquid-lyrics-song-card";

  const coverWrap = document.createElement("div");
  coverWrap.className = "ll-song-card-cover-wrap";

  const cover = document.createElement("img");
  cover.className = "ll-song-card-cover";
  cover.alt = "";
  cover.decoding = "async";
  cover.loading = "lazy";

  const canvas = document.createElement("div");
  canvas.className = "ll-song-card-canvas";
  canvas.setAttribute("aria-hidden", "true");

  const canvasVideo = document.createElement("video");
  canvasVideo.className = "ll-canvas-video";
  canvasVideo.muted = true;
  canvasVideo.loop = true;
  canvasVideo.playsInline = true;
  canvasVideo.addEventListener("loadeddata", () => canvas.classList.add("ll-canvas-ready"));

  canvas.appendChild(canvasVideo);

  const vinyl = createVinyl("ll-song-card-vinyl");

  const overlay = document.createElement("div");
  overlay.className = "ll-song-card-overlay";

  const canvasStage = document.createElement("div");
  canvasStage.className = "ll-canvas-stage";
  overlay.appendChild(canvasStage);

  coverWrap.append(cover, canvas, overlay);

  const controls = createTransportRow();

  const progress = document.createElement("div");
  progress.className = "playback-bar ll-song-card-progress";
  progress.innerHTML =
    '<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span>' +
    '<div class="playback-progressbar ll-card-progress-control">' +
    '<div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">' +
    '<div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div>' +
    '<div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div>' +
    "</div></div>" +
    '<span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';

  const heart = createHeartButton();

  const info = document.createElement("div");
  info.className = "ll-song-card-info";

  const title = document.createElement("div");
  title.className = "ll-song-card-title";

  const album = document.createElement("button");
  album.type = "button";
  album.className = "ll-song-card-link ll-song-card-album";
  registerTooltip(album, "Open album");

  const artist = document.createElement("button");
  artist.type = "button";
  artist.className = "ll-song-card-link ll-song-card-artist";
  registerTooltip(artist, "Open artist");

  info.append(title, album, artist);
  const volume = createVolumeControl();
  card.append(coverWrap, controls, progress, volume.el, info, heart);

  songCard = {
    card,
    cover,
    canvas,
    canvasVideo,
    canvasStage,
    vinyl,
    heart,
    title,
    album,
    artist,
    playButton: card.querySelector<HTMLElement>(".ll-song-card-play")!,
    shuffleButton: card.querySelector<HTMLButtonElement>(".ll-song-card-shuffle")!,
    repeatButton: card.querySelector<HTMLButtonElement>(".ll-song-card-repeat")!,
    progressTrack: progress.querySelector<HTMLElement>(".ll-card-progress-track")!,
    progressFill: progress.querySelector<HTMLElement>(".ll-card-progress-fill")!,
    progressThumb: progress.querySelector<HTMLElement>(".ll-card-progress-thumb")!,
    currentTime: progress.querySelector<HTMLElement>(".ll-card-current")!,
    durationTime: progress.querySelector<HTMLElement>(".ll-card-duration")!,
    volume,
  };
  bindProgressSeeking(songCard);

  return card;
}

const HEART_PATH =
  "M12 20.7 4.6 13.3a5 5 0 0 1 7.4-6.7 5 5 0 0 1 7.4 6.7Z";

function createHeartButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ll-song-card-btn ll-song-card-heart";
  button.setAttribute("aria-label", "Save to your Liked Songs");
  button.innerHTML =
    `<span class="ll-heart-whole">${heartSvg()}</span>` +
    `<span class="ll-heart-half ll-heart-half-left">${heartSvg()}</span>` +
    `<span class="ll-heart-half ll-heart-half-right">${heartSvg()}</span>`;

  let animTimer = 0;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const wasLiked = isTrackLiked();

    if (!toggleTrackLiked()) return;

    button.classList.remove("ll-heart-breaking", "ll-heart-popping");
    button.classList.add(wasLiked ? "ll-heart-breaking" : "ll-heart-popping");
    window.clearTimeout(animTimer);
    animTimer = window.setTimeout(
      () => button.classList.remove("ll-heart-breaking", "ll-heart-popping"),
      HEART_ANIM_MS,
    );
    updateHeartState();
  });

  registerTooltip(button, "Save to your Liked Songs");
  return button;
}

const HEART_VIEW_BOX = "2.3 3.95 19.4 17.75";

function heartSvg(): string {
  return `<svg viewBox="${HEART_VIEW_BOX}" aria-hidden="true"><path d="${HEART_PATH}"/></svg>`;
}

// Every like re-renders Spotify's whole UI, so only the settled result is sent.
type PendingLike = { uri: string; base: boolean; liked: boolean; sent: boolean; timer: number };
let pendingLike: PendingLike | null = null;

function isTrackLiked(): boolean {
  const reported = Boolean(player()?.liked);
  const like = pendingLike;
  if (!like || like.uri !== getCurrentTrackUri()) return reported;
  if (like.sent && reported === like.liked) {
    pendingLike = null;
    return reported;
  }
  return like.liked;
}

function toggleTrackLiked(): boolean {
  const uri = getCurrentTrackUri();
  if (!uri || !player()?.track) return false;

  const liked = !isTrackLiked();
  if (pendingLike && pendingLike.uri !== uri) flushLike();
  if (!pendingLike) pendingLike = { uri, base: !liked, liked, sent: false, timer: 0 };
  if (pendingLike.sent) Object.assign(pendingLike, { base: pendingLike.liked, sent: false });

  pendingLike.liked = liked;
  window.clearTimeout(pendingLike.timer);
  pendingLike.timer = window.setTimeout(flushLike, HEART_ANIM_MS);
  return true;
}

function flushLike() {
  const like = pendingLike;
  if (!like || like.sent) return;
  window.clearTimeout(like.timer);

  if (like.liked === like.base) {
    pendingLike = null;
    return;
  }
  const library = platform()?.LibraryAPI;
  void (like.liked ? library?.add?.({ uris: [like.uri] }) : library?.remove?.({ uris: [like.uri] }));
  like.sent = true;
  like.timer = window.setTimeout(() => {
    if (pendingLike !== like) return;
    pendingLike = null;
    updateHeartState();
  }, 3000);
}

function updateHeartState() {
  const refs = songCard;
  if (!refs) return;

  const liked = isTrackLiked();
  refs.heart.classList.toggle("active", liked);
  refs.heart.setAttribute("aria-pressed", String(liked));
  const label = liked ? "Remove from your Liked Songs" : "Save to your Liked Songs";
  refs.heart.dataset.tooltip = label;
  refs.heart.setAttribute("aria-label", label);
}

function layoutSongCard(style: string) {
  const refs = songCard;
  if (!refs) return;

  const card = refs.card;
  const panel = document.getElementById(PANEL_ID);
  const overlay = card.querySelector<HTMLElement>(".ll-song-card-overlay");
  const controls = card.querySelector<HTMLElement>(".ll-song-card-controls");
  const progress = card.querySelector<HTMLElement>(".ll-song-card-progress");
  const info = card.querySelector<HTMLElement>(".ll-song-card-info");
  if (!overlay || !controls || !progress || !info) return;

  const pill = panel?.querySelector<HTMLElement>(".liquid-lyrics-control-pill");
  pill?.classList.toggle("ll-pill-has-transport", Boolean(panel && isMaximized(panel)));

  const heart = refs.heart;
  const volume = refs.volume.el;
  volume.hidden = !isVolumeShown(style);

  if (style === "cover" || style === "canvas") {
    if (heart.parentElement !== overlay) overlay.append(heart, progress, controls);
    if (volume.previousElementSibling !== controls) controls.after(volume);
    if (overlay.lastElementChild !== refs.canvasStage) overlay.appendChild(refs.canvasStage);
    layoutCanvasPieces(style === "canvas");
    return;
  }

  if (heart.parentElement !== card) card.appendChild(heart);
  if (controls.parentElement !== card) card.insertBefore(controls, info);
  if (progress.parentElement !== card) card.insertBefore(progress, info);
  if (volume.previousElementSibling !== progress) progress.after(volume);
  layoutCanvasPieces(false);
}

function layoutCanvasPieces(onCanvas: boolean) {
  const refs = songCard;
  if (!refs) return;

  const card = refs.card;
  const info = card.querySelector<HTMLElement>(".ll-song-card-info");
  if (!info) return;

  const settings = getSettings();
  const titlePlacement = onCanvas ? settings.cardCanvasTitle : "below";
  const vinylPlacement = onCanvas ? settings.cardCanvasVinyl : "hidden";

  info.classList.toggle("ll-canvas-piece", titlePlacement === "overlay");
  card.classList.toggle("ll-hide-card-info", titlePlacement === "hidden");

  if (titlePlacement === "overlay") {
    if (info.parentElement !== refs.canvasStage) refs.canvasStage.appendChild(info);
  } else if (info.parentElement !== card) {
    card.appendChild(info);
  }

  if (vinylPlacement === "hidden") {
    refs.vinyl.remove();
  } else if (vinylPlacement === "overlay") {
    if (refs.vinyl.parentElement !== refs.canvasStage) {
      refs.canvasStage.insertBefore(refs.vinyl, refs.canvasStage.firstChild);
    }
  } else if (refs.vinyl.parentElement !== card || refs.vinyl.nextElementSibling !== info) {
    card.insertBefore(refs.vinyl, info.parentElement === card ? info : null);
  }

  refs.vinyl.classList.toggle("ll-canvas-piece", vinylPlacement === "overlay");
  refs.canvas.classList.toggle("ll-canvas-scrim", refs.canvasStage.childElementCount > 0);
}

function activeCardStyle(host?: HTMLElement): CardStyle {
  const settings = getSettings();
  const panel = host ?? document.getElementById(PANEL_ID);
  const maximized = Boolean(
    panel && (panel.classList.contains("ll-fullscreen-mode") || panel.classList.contains("ll-native-fullscreen")),
  );
  return maximized && settings.fsCardStyleSeparate ? settings.fsCardStyle : settings.cardStyle;
}

function isVolumeShown(style: string): boolean {
  const settings = getSettings();
  if (style === "cover") return settings.cardVolumeCover;
  if (style === "canvas") return settings.cardVolumeCanvas;
  return settings.cardVolumeDefault;
}

function applyCardStyle(host?: HTMLElement) {
  updateSongCanvas();
  const style: CardStyle = activeCardStyle(host);
  const panel = host ?? document.getElementById(PANEL_ID);
  if (panel) {
    panel.dataset.cardStyle = style;
    panel.dataset.cardFrame = style === "canvas" ? "cover" : style;
  }
  layoutSongCard(style);
}

function updateSongCanvas() {
  const refs = songCard;
  if (!refs) return;

  if (activeCardStyle() !== "canvas") {
    cancelCanvasRetry();
    clearSongCanvas(refs);
    return;
  }

  const track = getCurrentTrackUri();
  if (track !== canvasTrack) {
    canvasTrack = track;
    clearSongCanvas(refs);
  }

  const source = findSpotifyCanvasVideo();
  if (!source) {
    clearSongCanvas(refs);
    scheduleCanvasRetry(track, applyCardStyle);
    return;
  }

  if (source === canvasSource && isStreamLive(canvasStream)) {
    cancelCanvasRetry();
    syncCanvasPlayback();
    return;
  }

  const stream = captureCanvasStream(source);
  if (!stream) {
    clearSongCanvas(refs);
    scheduleCanvasRetry(track, applyCardStyle);
    return;
  }

  cancelCanvasRetry();
  canvasSource = source;
  canvasStream = stream;
  refs.canvas.classList.add("ll-canvas-is-video");
  refs.canvas.classList.remove("ll-canvas-ready");
  refs.canvasVideo.srcObject = stream;
  syncCanvasPlayback();
}

function refreshCanvasMirror() {
  if (activeCardStyle() !== "canvas") return;
  if (canvasSource && isStreamLive(canvasStream) && canvasSource === findSpotifyCanvasVideo()) return;
  applyCardStyle();
}

function clearSongCanvas(refs: SongCardRefs) {
  if (!canvasSource && !refs.canvasVideo.srcObject) return;
  canvasSource = null;
  canvasStream = null;
  refs.canvas.classList.remove("ll-canvas-is-video", "ll-canvas-ready");
  refs.canvasVideo.pause();
  refs.canvasVideo.srcObject = null;
}

function syncCanvasPlayback() {
  const refs = songCard;
  if (!refs || !refs.canvasVideo.srcObject) return;

  const stillness = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  if (!stillness && isPlayerPlaying() && isPanelVisible()) {
    void refs.canvasVideo.play().catch(() => {});
  } else {
    refs.canvasVideo.pause();
  }
}

function createControlPill(): HTMLElement {
  const pill = document.createElement("div");
  pill.className = "liquid-lyrics-control-pill";

  const transport = createTransportRow();
  transport.classList.add("ll-pill-transport");
  const divider = document.createElement("span");
  divider.className = "ll-pill-divider";
  divider.setAttribute("aria-hidden", "true");
  pill.append(transport, divider);

  pill.append(
    createIconButton("ll-control-btn ll-card-toggle", "cover", "Song card", toggleSongCard),
    createIconButton("ll-control-btn ll-card-side-toggle", "cardSide", "Song card side", toggleCardSide),
    createIconButton("ll-control-btn ll-bg-toggle", "animatedBg", "Animated background", toggleAnimatedBackground),
    createIconButton("ll-control-btn ll-roman-toggle", "roman", "Romanization", openRomanizationPicker),
    createIconButton("ll-control-btn ll-edit-toggle", "edit", "Create / edit sync", () => openEditor()),
    createIconButton("ll-control-btn ll-cinema-toggle", "cinema", "Cinema mode", toggleCinemaMode),
    createIconButton("ll-control-btn ll-fullscreen-toggle", "fullscreen", "Fullscreen", toggleNativeFullscreen),
  );

  return pill;
}

function createIconButton(className: string, icon: IconName, label: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.dataset.icon = icon;
  button.setAttribute("aria-label", label);
  button.innerHTML = ICONS[icon];
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    onClick();
  });
  registerTooltip(button, label);
  return button;
}

function setButtonIcon(button: HTMLElement | null, icon: IconName) {
  if (!button || button.dataset.icon === icon) return;
  button.dataset.icon = icon;
  button.innerHTML = ICONS[icon];
}

function updateSongCard() {
  const refs = songCard;
  if (!refs) return;

  const track = getCurrentTrackInfo();

  if (track.cover) {
    if (refs.cover.src !== track.cover) refs.cover.src = track.cover;
    refs.card.classList.remove("ll-no-cover");
  } else {
    refs.cover.removeAttribute("src");
    refs.card.classList.add("ll-no-cover");
  }
  background?.setCover(track.cover);

  refs.title.textContent = track.title;
  refs.album.textContent = track.album;
  refs.album.disabled = !track.albumUri;
  refs.album.onclick = () => openSpotifyUri(track.albumUri);
  refs.artist.textContent = track.artist;
  refs.artist.disabled = !track.artistUri;
  refs.artist.onclick = () => openSpotifyUri(track.artistUri);

  const vinylCover = refs.vinyl.querySelector<HTMLImageElement>(".ll-vinyl-cover");
  if (vinylCover && track.cover && vinylCover.src !== track.cover) vinylCover.src = track.cover;

  applyCardStyle();

  updateSongCardPlaybackState();
  updateSongCardProgress();
}

function updateSongCardPlaybackState() {
  const refs = songCard;
  if (!refs) return;
  refs.volume.sync();

  const playing = isPlayerPlaying();
  document.getElementById(PANEL_ID)?.classList.toggle("ll-playing", playing);
  refreshCanvasMirror();
  syncCanvasPlayback();
  const panel = document.getElementById(PANEL_ID);
  const all = <T extends HTMLElement>(selector: string): T[] =>
    Array.from(panel?.querySelectorAll<T>(selector) ?? []);

  const playLabel = playing ? "Pause" : "Play";
  for (const button of all<HTMLButtonElement>(".ll-song-card-play")) {
    setButtonIcon(button, playing ? "pause" : "play");
    button.setAttribute("aria-label", playLabel);
    button.dataset.tooltip = playLabel;
  }

  const shuffling = isShuffleActive();
  for (const button of all<HTMLButtonElement>(".ll-song-card-shuffle")) setPressed(button, shuffling);
  updateHeartState();

  const repeatMode = getRepeatMode();
  const repeatLabel = repeatMode === "track" ? "Repeat one" : repeatMode === "context" ? "Repeat all" : "Repeat";
  for (const button of all<HTMLButtonElement>(".ll-song-card-repeat")) {
    setPressed(button, repeatMode !== "off");
    button.classList.toggle("ll-repeat-one", repeatMode === "track");
    button.setAttribute("aria-label", repeatLabel);
    button.dataset.tooltip = repeatLabel;
  }
}

function startSongCardClock() {
  if (unsubscribeCardClock) return;
  lastCardStateSync = 0;
  lastCardRatio = -1;
  lastCardPercent = -1;
  unsubscribeCardClock = subscribeClock(onSongCardTick);
  updateSongCardPlaybackState();
  updateSongCardProgress();
}

function stopSongCardClock() {
  unsubscribeCardClock?.();
  unsubscribeCardClock = null;
}

function onSongCardTick(progress: number, now: number) {
  updateSongCardProgress(progress);
  if (now - lastCardStateSync >= CARD_STATE_SYNC_MS) {
    lastCardStateSync = now;
    updateSongCardPlaybackState();
  }
}

function updateSongCardProgress(current = getPlayerProgressSafe()) {
  const refs = songCard;
  if (!refs) return;

  const duration = getTrackDuration();
  const ratio = duration > 0 ? clamp(current / duration) : 0;
  const keepPreview = refs.progressTrack.classList.contains("ll-previewing");

  if (!keepPreview && Math.abs(ratio - lastCardRatio) > 0.00002) {
    lastCardRatio = ratio;
    refs.progressFill.style.transform = `scaleX(${ratio.toFixed(5)})`;
    refs.progressThumb.style.left = `${(ratio * 100).toFixed(3)}%`;

    const percent = Math.round(ratio * 100);
    if (percent !== lastCardPercent) {
      lastCardPercent = percent;
      refs.progressTrack.setAttribute("aria-valuenow", String(percent));
      refs.progressTrack.setAttribute("aria-valuetext", `${formatTime(current)} of ${formatTime(duration)}`);
    }
  }

  const currentText = formatTime(current);
  if (currentText !== lastCardCurrentText) {
    lastCardCurrentText = currentText;
    refs.currentTime.textContent = currentText;
  }

  const durationText = formatTime(duration);
  if (durationText !== lastCardDurationText) {
    lastCardDurationText = durationText;
    refs.durationTime.textContent = durationText;
  }
}

function getPlayerProgressSafe(): number {
  return getPlayerProgress();
}

function bindProgressSeeking(refs: SongCardRefs) {
  const track = refs.progressTrack;
  const preview = track.querySelector<HTMLElement>(".ll-card-preview-time");
  let previewFrame = 0;
  let pendingPreviewRatio = 0;

  const ratioFromEvent = (event: PointerEvent | MouseEvent) => {
    const rect = track.getBoundingClientRect();
    return clamp((event.clientX - rect.left) / Math.max(1, rect.width));
  };

  const applyPreview = (ratio: number) => {
    const duration = getTrackDuration();
    if (duration <= 0) return;

    track.classList.add("ll-previewing");
    if (preview) {
      preview.textContent = formatTime(duration * ratio);
      preview.style.left = `${ratio * 100}%`;
    }
    refs.progressFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
    refs.progressThumb.style.left = `${(ratio * 100).toFixed(2)}%`;
  };

  const setPreview = (ratio: number) => {
    pendingPreviewRatio = ratio;
    if (!previewFrame) {
      previewFrame = requestAnimationFrame(() => {
        previewFrame = 0;
        applyPreview(pendingPreviewRatio);
      });
    }
    return ratio;
  };

  const clearPreview = () => {
    if (track.dataset.dragging === "true") return;
    track.classList.remove("ll-previewing");
    if (previewFrame) {
      cancelAnimationFrame(previewFrame);
      previewFrame = 0;
    }
    lastCardRatio = -1;
    updateSongCardProgress();
  };

  const seekFromEvent = (event: PointerEvent | MouseEvent) => {
    const duration = getTrackDuration();
    if (duration <= 0) return;

    const ratio = setPreview(ratioFromEvent(event));
    seekTo(duration * ratio);
  };

  track.addEventListener("pointerenter", (event) => setPreview(ratioFromEvent(event)));
  track.addEventListener("pointermove", (event) => setPreview(ratioFromEvent(event)));
  track.addEventListener("pointerleave", clearPreview);
  track.addEventListener("blur", clearPreview);

  track.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    track.dataset.dragging = "true";
    track.setPointerCapture?.(event.pointerId);
    setPreview(ratioFromEvent(event));

    const onMove = (moveEvent: PointerEvent) => setPreview(ratioFromEvent(moveEvent));
    const onUp = (upEvent: PointerEvent) => {
      seekFromEvent(upEvent);
      delete track.dataset.dragging;
      clearPreview();
      track.releasePointerCapture?.(event.pointerId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  });

  track.addEventListener("keydown", (event) => {
    const duration = getTrackDuration();
    if (duration <= 0) return;

    const current = getPlayerProgressSafe();
    const step = event.shiftKey ? 15000 : 5000;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      seekTo(Math.max(0, current - step));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      seekTo(Math.min(duration, current + step));
    }
  });
}

function getCurrentTrackInfo(): {
  title: string;
  artist: string;
  album: string;
  cover: string;
  artistUri: string;
  albumUri: string;
} {
  const item = currentItem();
  const metadata = item?.metadata ?? {};
  const artists = Array.isArray(item?.artists)
    ? item.artists.map((artist: any) => artist?.name).filter(Boolean).join(", ")
    : "";
  const firstArtist = Array.isArray(item?.artists) ? item.artists.find((artist: any) => artist?.uri) : null;

  return {
    title: item?.name || metadata.title || metadata.track_name || "Unknown track",
    artist: artists || metadata.artist_name || metadata.artist || metadata.album_artist_name || "Unknown artist",
    album: item?.album?.name || metadata.album_title || metadata.album_name || "Unknown album",
    cover: getBestCoverUrl(item, metadata),
    artistUri: firstArtist?.uri || firstSpotifyUri(metadata.artist_uri || metadata.artist_uris || ""),
    albumUri: item?.album?.uri || metadata.album_uri || "",
  };
}

function getBestCoverUrl(item: any, metadata: any): string {
  const candidates = [
    metadata.image_xlarge_url,
    metadata.image_large_url,
    metadata.image_url,
    metadata.album_image_url,
    metadata.cover_url,
    item?.album?.images?.[0]?.url,
    item?.images?.[0]?.url,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeImageUrl(String(candidate ?? ""));
    if (normalized) return upgradeCoverArtResolution(normalized);
  }

  return getNowPlayingViewCoverUrl();
}

function normalizeImageUrl(value: string): string {
  if (!value) return "";
  return value.startsWith("spotify:image:")
    ? value.replace("spotify:image:", "https://i.scdn.co/image/")
    : value;
}

function upgradeCoverArtResolution(url: string): string {
  return url.replace(/ab67616d00001e02|ab67616d00004851/g, "ab67616d0000b273");
}

function getNowPlayingViewCoverUrl(): string {
  const img = document.querySelector<HTMLImageElement>(NPV_COVER_IMAGE);
  return img?.src || "";
}

function firstSpotifyUri(value: string): string {
  return String(value || "").split(",")[0]?.split(";")[0]?.trim() || "";
}

function openSpotifyUri(uri: string) {
  const path = spotifyUriToPath(uri);
  if (!path) return;

  navigate(path);
  hidePanel();
}

function spotifyUriToPath(uri: string): string {
  const parts = String(uri || "").split(":");
  if (parts.length < 3 || parts[0] !== "spotify") return "";

  const type = parts[1];
  const id = parts[2];
  if (!id || !["album", "artist", "track", "playlist"].includes(type)) return "";

  return `/${type}/${id}`;
}

type RepeatMode = "off" | "context" | "track";

const NEXT_REPEAT: Record<RepeatMode, RepeatMode> = { off: "context", context: "track", track: "off" };

function isShuffleActive(): boolean {
  return Boolean(player()?.shuffle);
}

function getRepeatMode(): RepeatMode {
  const mode = player()?.repeat;
  return mode === "context" || mode === "track" ? mode : "off";
}

function registerPlayerStateListeners() {
  if (playerListenerRegistered) return;
  playerListenerRegistered = true;

  onPlayer("state", () => {
    updateSongCardPlaybackState();
    updateSongCardProgress();
  });
}

function runPlayerAction(action: () => unknown) {
  void action();
  window.setTimeout(updateSongCard, 80);
  window.setTimeout(updateSongCardPlaybackState, 180);
}

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function isCardTheOnlyView(): boolean {
  return document.getElementById(PANEL_ID)?.dataset.emptyStyle === "card";
}

function isCardLockedByEmptyView(): boolean {
  const style = document.getElementById(PANEL_ID)?.dataset.emptyStyle;
  return style === "card" || style === "vinyl";
}

function toggleSongCard() {
  if (isCardLockedByEmptyView()) return;
  const showing = !isSongCardVisible();
  localStorage.setItem(SONG_CARD_STORAGE_KEY, String(showing));

  document.getElementById(PANEL_ID)?.classList.toggle("ll-card-returning", showing);
  updatePanelOptionStates();
}

function clearCardReturn(panel: HTMLElement) {
  panel.classList.remove("ll-card-returning");
}

function isAnimatedBgEnabled(): boolean {
  return isBackgroundVisible();
}

function toggleAnimatedBackground() {
  toggleBackgroundVisible();
  updatePanelOptionStates();
}

function toggleCardSide() {
  if (isCardLockedByEmptyView()) return;
  const panel = document.getElementById(PANEL_ID);
  const card = panel?.querySelector<HTMLElement>(".liquid-lyrics-song-card") ?? null;
  const content = panel?.querySelector<HTMLElement>(".liquid-lyrics-content") ?? null;

  const cardBefore = card?.getBoundingClientRect();
  const contentBefore = content?.getBoundingClientRect();

  setSetting("cardSide", getSettings().cardSide === "left" ? "right" : "left");
  updatePanelOptionStates();

  slideFromPreviousPosition(card, cardBefore);
  slideFromPreviousPosition(content, contentBefore);
}

function slideFromPreviousPosition(el: HTMLElement | null, before: DOMRect | undefined) {
  if (!el || !before || typeof el.animate !== "function") return;

  const after = el.getBoundingClientRect();
  const dx = before.left - after.left;
  if (Math.abs(dx) < 1) return;

  el.animate([{ transform: `translate3d(${dx}px, 0, 0)` }, { transform: "translate3d(0, 0, 0)" }], {
    duration: CARD_SWAP_MS,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  });
}

function openRomanizationPicker() {
  const button = document.getElementById(PANEL_ID)?.querySelector<HTMLButtonElement>(".ll-roman-toggle");
  if (!button) return;
  toggleRomanizationMenu(button, lyricsView?.language ?? null);
}

function getRomanizationLabel(): string {
  const target = getActiveTarget(lyricsView?.language ?? null);
  return target ? `Romanization: ${TARGET_INFO[target].label}` : "Romanization";
}

function toggleCinemaMode() {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  if (isCinemaActive(panel)) exitMaximized(panel);
  else enterMaximized(panel, "cinema");
  afterDisplayModeChange(panel);
}

function toggleNativeFullscreen() {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  if (isNativeFullscreen(panel)) exitMaximized(panel);
  else enterMaximized(panel, "fullscreen");
  afterDisplayModeChange(panel);
}

function afterDisplayModeChange(panel: HTMLElement) {
  hideTooltip();
  closeSettingsMenu();
  closeRomanizationMenu();
  updatePanelOptionStates();
  syncLiquifyAnimatedBackground();
  syncTransparentControlsOverlay(panel);
  syncLiquifyFloatingPlayer(panel);
  applyCardStyle(panel);
  refreshIdleUi();
  requestAnimationFrame(() => lyricsView?.recenter());
}

function applyPanelOptionClasses(panel: HTMLElement) {
  panel.classList.toggle("ll-song-card-hidden", !isSongCardVisible() && !isCardTheOnlyView());
  const romanTarget = getActiveTarget(lyricsView?.language ?? null);
  panel.classList.toggle("ll-romanized", romanTarget !== null && isLatinTarget(romanTarget));
  panel.classList.toggle("ll-animated-bg", isAnimatedBgEnabled());
  applySettingsClasses(panel);
}

function applySettingsClasses(panel: HTMLElement) {
  const settings = getSettings();
  const maximized = isMaximized(panel);

  const showCredits = maximized ? settings.fsShowCredits : settings.pageShowCredits;
  const hideScrollbar = maximized ? settings.fsHideScrollbar : settings.pageHideScrollbar;
  const showControls = maximized ? settings.fsShowControls : settings.pageShowControls;
  const position = maximized ? settings.fsControlPosition : settings.pageControlPosition;

  panel.classList.toggle("ll-hide-credits", !showCredits);
  panel.classList.toggle("ll-hide-scrollbar", hideScrollbar);
  panel.classList.toggle("ll-hide-pill", !showControls);
  panel.dataset.controlPosition = position;

  panel.dataset.cardSide = settings.cardSide;
  applyCardStyle(panel);
  panel.classList.toggle("ll-card-center-text", settings.cardCenterText);
  panel.classList.toggle("ll-card-hide-title", settings.cardHideTitle);
  panel.classList.toggle("ll-card-hide-artist", settings.cardHideArtist);
  panel.classList.toggle("ll-card-hide-album", settings.cardHideAlbum);

  panel.classList.toggle("ll-fs-fade-title", maximized && settings.fsFadeTitle);
  panel.classList.toggle("ll-fs-fade-artist", maximized && settings.fsFadeArtist);
  panel.classList.toggle("ll-fs-fade-album", maximized && settings.fsFadeAlbum);
}

function updatePanelOptionStates() {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;

  const romanTarget = getActiveTarget(lyricsView?.language ?? null);
  const maximized = isMaximized(panel);
  applyPanelOptionClasses(panel);

  const cardIsLocked = isCardLockedByEmptyView();

  const cardButton = panel.querySelector<HTMLButtonElement>(".ll-card-toggle");
  if (cardButton) {
    cardButton.hidden = cardIsLocked;
    cardButton.disabled = cardIsLocked;
    setPressed(cardButton, isSongCardVisible() || isCardTheOnlyView());
    if (cardIsLocked) hideTooltip();
  }

  const sideButton = panel.querySelector<HTMLButtonElement>(".ll-card-side-toggle");
  if (sideButton) {
    const usable = isSongCardVisible() && !cardIsLocked;
    sideButton.hidden = !usable;
    sideButton.disabled = !usable;
    const label = getSettings().cardSide === "left" ? "Move song card right" : "Move song card left";
    sideButton.dataset.tooltip = label;
    sideButton.setAttribute("aria-label", label);
    if (!usable) hideTooltip();
  }
  setPressed(panel.querySelector<HTMLButtonElement>(".ll-roman-toggle"), romanTarget !== null);
  setPressed(panel.querySelector<HTMLButtonElement>(".ll-cinema-toggle"), isCinemaActive(panel));
  setPressed(panel.querySelector<HTMLButtonElement>(".ll-fullscreen-toggle"), isNativeFullscreen(panel));

  background?.setForcedVisible(maximized);

  const bgButton = panel.querySelector<HTMLButtonElement>(".ll-bg-toggle");
  if (bgButton) {
    bgButton.hidden = maximized;
    bgButton.disabled = maximized;
    setPressed(bgButton, maximized || isAnimatedBgEnabled());
  }

  const romanButton = panel.querySelector<HTMLButtonElement>(".ll-roman-toggle");
  const hasRomanization = panel.classList.contains("ll-has-romanization");
  if (romanButton) {
    romanButton.hidden = !hasRomanization;
    romanButton.disabled = !hasRomanization;
    setButtonIcon(romanButton, romanTarget === "furigana" ? "furigana" : "roman");
    const label = getRomanizationLabel();
    romanButton.dataset.tooltip = label;
    romanButton.setAttribute("aria-label", label);
    if (!hasRomanization) {
      hideTooltip();
      closeRomanizationMenuFor(romanButton);
    }
  }
}

function setPressed(button: HTMLButtonElement | null, pressed: boolean) {
  if (!button) return;
  button.classList.toggle("active", pressed);
  button.setAttribute("aria-pressed", String(pressed));
}

function isSongCardVisible(): boolean {
  return localStorage.getItem(SONG_CARD_STORAGE_KEY) !== "false";
}

function onFullscreenChange() {
  hideTooltip();
  closeSettingsMenu();
  const panel = document.getElementById(PANEL_ID);
  if (panel && document.fullscreenElement !== panel && panel.classList.contains("ll-native-fullscreen")) {
    exitMaximized(panel);
  }
  updatePanelOptionStates();
  syncLiquifyAnimatedBackground();
  if (panel) syncTransparentControlsOverlay(panel);
  if (panel) applyCardStyle(panel);
  refreshIdleUi();
  requestAnimationFrame(() => lyricsView?.recenter());
}

function isCinemaActive(panel: HTMLElement): boolean {
  return panel.classList.contains("ll-fullscreen-mode");
}

function isNativeFullscreen(panel: HTMLElement): boolean {
  return document.fullscreenElement === panel;
}

function isMaximized(panel: HTMLElement): boolean {
  return isCinemaActive(panel) || isNativeFullscreen(panel);
}

function detachPanel(panel: HTMLElement) {
  if (!fullscreenPlaceholder && panel.parentNode) {
    fullscreenPlaceholder = document.createComment("liquid-lyrics-fullscreen-placeholder");
    panel.parentNode.insertBefore(fullscreenPlaceholder, panel);
  }
  const host = document.fullscreenElement instanceof HTMLElement && document.fullscreenElement !== panel
    ? document.fullscreenElement
    : document.body;
  if (panel.parentElement !== host) {
    host.appendChild(panel);
  }
}

function reattachPanel(panel: HTMLElement) {
  if (fullscreenPlaceholder?.parentNode) {
    fullscreenPlaceholder.parentNode.insertBefore(panel, fullscreenPlaceholder);
    fullscreenPlaceholder.remove();
  }
  fullscreenPlaceholder = null;
}

function enterMaximized(panel: HTMLElement, mode: "cinema" | "fullscreen") {
  clearCardReturn(panel);
  if (!isMaximized(panel)) {
    returnToPanelOnExit = isPanelVisible();
    if (!panel.classList.contains("visible")) {
      panel.classList.add("visible");
      updateSongCard();
      lyricsView?.setEnabled(true);
      background?.setEnabled(true);
      startSongCardClock();
    }
  }

  detachPanel(panel);

  if (mode === "cinema") {
    if (document.fullscreenElement === panel) void document.exitFullscreen?.();
    panel.classList.remove("ll-native-fullscreen");
    panel.classList.add("ll-fullscreen-mode");
    return;
  }

  panel.classList.remove("ll-fullscreen-mode");
  panel.classList.add("ll-native-fullscreen");
  const request = panel.requestFullscreen?.();
  if (request && typeof request.catch === "function") {
    request.catch(() => {
      if (!isNativeFullscreen(panel)) {
        panel.classList.remove("ll-native-fullscreen");
        panel.classList.add("ll-fullscreen-mode");
        afterDisplayModeChange(panel);
      }
    });
  }
}

function exitMaximized(panel: HTMLElement) {
  clearCardReturn(panel);
  const wasMaximized =
    panel.classList.contains("ll-fullscreen-mode") || panel.classList.contains("ll-native-fullscreen");
  const shouldClose = !returnToPanelOnExit && wasMaximized;
  panel.classList.remove("ll-fullscreen-mode", "ll-native-fullscreen");
  if (document.fullscreenElement === panel) {
    void document.exitFullscreen?.();
  }
  reattachPanel(panel);

  if (shouldClose) {
    panel.classList.remove("visible");
    lyricsView?.setEnabled(false);
    background?.setEnabled(false);
    stopSongCardClock();
  }
  returnToPanelOnExit = true;
}

function isLiquifyRunning(): boolean {
  return getComputedStyle(document.documentElement).getPropertyValue("--liquify-shadow").trim() !== "";
}

function syncLiquifyAnimatedBackground() {
  const panel = document.getElementById(PANEL_ID);
  const isFullscreen = Boolean(panel && isMaximized(panel));

  if (isFullscreen && isLiquifyRunning()) {
    if (previousLiquifyBackgroundMode === undefined) {
      previousLiquifyBackgroundMode = localStorage.getItem(LIQUIFY_BG_MODE_KEY);
    }
    if (localStorage.getItem(LIQUIFY_BG_MODE_KEY) !== "animated") {
      localStorage.setItem(LIQUIFY_BG_MODE_KEY, "animated");
      window.dispatchEvent(new Event("liquifyBackgroundChange"));
    }
    return;
  }

  if (previousLiquifyBackgroundMode !== undefined) {
    if (previousLiquifyBackgroundMode === null) {
      localStorage.removeItem(LIQUIFY_BG_MODE_KEY);
    } else {
      localStorage.setItem(LIQUIFY_BG_MODE_KEY, previousLiquifyBackgroundMode);
    }
    previousLiquifyBackgroundMode = undefined;
    window.dispatchEvent(new Event("liquifyBackgroundChange"));
  }
}

function syncLiquifyFloatingPlayer(panel = document.getElementById(PANEL_ID)) {
  if (!panel) return;

  const floating = FLOATING_PLAYER_STYLES.some((id) => Boolean(document.getElementById(id)?.textContent));
  panel.classList.toggle("ll-liquify-floating-player", floating);
}

function syncTransparentControlsOverlay(panel = document.getElementById(PANEL_ID)) {
  if (!panel) return;

  const { width, height } = windowControlsStrip();
  panel.style.setProperty("--ll-transparent-controls-width", `${clamp(width, 50, 400)}px`);
  panel.style.setProperty("--ll-transparent-controls-height", `${clamp(height, 20, 300)}px`);
}

function toTimeNumber(value: unknown, fallback: number): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, numeric);
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}
