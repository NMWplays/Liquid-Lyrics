import type { Lyrics } from "@/lib/api/types";
import { getActiveTarget, isLatinTarget, TARGET_INFO } from "@/lib/romanization/modes";
import { closeRomanizationMenuFor, toggleRomanizationMenu } from "@/ui/romanizationMenu";
import {
  isPanelMaximized,
  isPanelVisible,
  ROMANIZATION_EVENT,
  showPanel,
  showPanelFullscreen,
} from "@/ui/panel";
import { createEmptyState, createLyricsSkeleton, isLoadingMessage } from "@/ui/lyrics/status";
import { LyricsView } from "@/ui/lyrics/view";
import { registerTooltip } from "@/ui/tooltip";
import { EDITOR_VISIBILITY_EVENT, isEditorOpen, openEditor } from "@/ui/lyrics/editor/editor";
import microphoneSvg from "@/ui/microphone.svg";
import { LyricsBackground } from "@/ui/background/background";
import { isOwnMutation } from "@/lib/dom/mutations";
import { getSettings, SETTINGS_EVENT } from "@/lib/settings";
import { currentItem } from "@/lib/spotikit";
import {
  CINEMA_VIEW,
  NPV_LYRICS_SECTION,
  NPV_PANEL,
  NPV_TRACK_VISUAL,
  RIGHT_SIDEBAR,
  SIDEBAR_PANEL_CONTAINER,
} from "@/lib/dom/spotifySelectors";

const SIDEBAR_BG_HOST_CLASS = "ll-sidebar-bg-host";

const SIDEBAR_CARD_ID = "liquid-lyrics-sidebar-card";
const COLLAPSED_STORAGE_KEY = "liquid-lyrics-sidebar-card-collapsed";
const EXPANDED_STORAGE_KEY = "liquid-lyrics-sidebar-card-expanded";
const ATTACH_THROTTLE_MS = 300;

const MINI_ICONS = {
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',
  open: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',
  expand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="m8.4 6.4 3.6-3.4 3.6 3.4"/><path d="m8.4 17.6 3.6 3.4 3.6-3.4"/></svg>',
  collapse: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"/><path d="m8.4 10.4 3.6-3.4 3.6 3.4"/><path d="m8.4 13.6 3.6 3.4 3.6-3.4"/></svg>',
  roman: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',
  furigana:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">字</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">じ</text></svg>',
} as const;

let cardEl: HTMLElement | null = null;
let lyricsView: LyricsView | null = null;
let statusText = "Loading lyrics...";
let lastLyrics: Lyrics | null = null;
let statusAllowCreate = false;
let romanizationApplied = false;
let globalListenersRegistered = false;

let attachObserver: MutationObserver | null = null;
let attachScheduled = false;
let mountRetryTimer: ReturnType<typeof setInterval> | null = null;
let cachedPanel: HTMLElement | null = null;
let cinemaViewWasActive = false;
let cinemaReapplyTimers: Array<ReturnType<typeof setTimeout>> = [];
let sidebarBackground: LyricsBackground | null = null;
let expandPlaceholder: Comment | null = null;
let expandedBackground: LyricsBackground | null = null;
let sidebarSizeObserver: ResizeObserver | null = null;

export function createSidebarLyricsCard(): HTMLElement {
  if (cardEl) {
    removeStrayCards();
    ensureSidebarAttached(cardEl);
    return cardEl;
  }

  document.getElementById(SIDEBAR_CARD_ID)?.remove();

  const card = document.createElement("section");
  card.id = SIDEBAR_CARD_ID;
  card.className = "liquid-lyrics-sidebar-card";
  cardEl = card;
  card.innerHTML = `
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${microphoneSvg}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-expand-toggle" type="button" aria-label="Expand card">${MINI_ICONS.expand}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${MINI_ICONS.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${MINI_ICONS.open}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${MINI_ICONS.fullscreen}</button>
      </div>
      <button class="ll-sidebar-collapse-btn" type="button" aria-label="Toggle mini lyrics">
        <span class="ll-sidebar-card-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg>
        </span>
      </button>
    </div>
    <div class="ll-sidebar-card-body">
      <div class="ll-sidebar-mini-viewport">
        <div class="ll-sidebar-mini-lines"></div>
      </div>
    </div>
  `;

  const headerMain = card.querySelector<HTMLButtonElement>(".ll-sidebar-header-main");
  const collapseButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-collapse-btn");
  const expandButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-expand-toggle");
  const romanButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-roman-toggle");
  const fullscreenButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-fullscreen-toggle");
  const openButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-open-toggle");

  const toggleCollapsed = () => {
    if (card.classList.contains("ll-expanded")) return;
    const collapsed = !card.classList.contains("collapsed");
    localStorage.setItem(COLLAPSED_STORAGE_KEY, String(collapsed));
    applyCollapsedState(card);
    updateSidebarLyricsCardState();
  };

  headerMain?.addEventListener("click", toggleCollapsed);
  collapseButton?.addEventListener("click", toggleCollapsed);
  expandButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = !card.classList.contains("ll-expanded");
    localStorage.setItem(EXPANDED_STORAGE_KEY, String(expanded));
    if (expanded && card.classList.contains("collapsed")) {
      localStorage.setItem(COLLAPSED_STORAGE_KEY, "false");
      applyCollapsedState(card);
    }

    const first = card.getBoundingClientRect();
    applyExpandedState(card);
    animateCardFlip(card, first);

    updateSidebarLyricsCardState();
    requestAnimationFrame(() => lyricsView?.recenter());
  });
  romanButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleRomanizationMenu(romanButton, lyricsView?.language ?? null);
  });
  fullscreenButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPanelFullscreen(false);
  });
  openButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPanel();
  });

  if (collapseButton) registerTooltip(collapseButton, "Toggle mini lyrics");
  if (expandButton) registerTooltip(expandButton, "Expand card");
  if (romanButton) registerTooltip(romanButton, "Romanization");
  if (fullscreenButton) registerTooltip(fullscreenButton, "Fullscreen");
  if (openButton) registerTooltip(openButton, "Open Liquid Lyrics");

  const viewport = card.querySelector<HTMLElement>(".ll-sidebar-mini-viewport")!;
  const linesHost = card.querySelector<HTMLElement>(".ll-sidebar-mini-lines")!;
  lyricsView?.destroy();
  lyricsView = new LyricsView({
    container: linesHost,
    scroller: viewport,
    variant: "sidebar",
    onRomanizationAvailability: () => updateRomanControl(card),
  });

  if (!globalListenersRegistered) {
    globalListenersRegistered = true;
    window.addEventListener(ROMANIZATION_EVENT, () => {
      applyRomanization(!isPanelVisible());
      if (cardEl) updateRomanControl(cardEl);
    });
    window.addEventListener(EDITOR_VISIBILITY_EVENT, () => updateSidebarLyricsCardState());
    window.addEventListener(SETTINGS_EVENT, () => {
      syncSidebarBackground();
      updateSidebarLyricsCardState();
    });
  }

  applyCollapsedState(card);
  applyExpandedState(card);
  ensureSidebarAttached(card);
  observeSidebarMount();
  startMountRetry();
  if (lastLyrics) {
    lyricsView.setLyrics(lastLyrics);
    applyRomanization(!isPanelVisible());
  } else {
    showStatus(statusText, statusAllowCreate);
  }
  updateSidebarLyricsCardState();

  return card;
}

export function setSidebarLyrics(lyrics: Lyrics | null, message = "No lyrics available", allowCreate = false) {
  const card = createSidebarLyricsCard();
  closeRomanizationMenuFor(card.querySelector<HTMLButtonElement>(".ll-sidebar-roman-toggle"));
  statusText = lyrics ? "Live lyrics" : message;

  lyricsView?.setLyrics(lyrics);
  if (!lyrics || !lyricsView?.hasLyrics) {
    lastLyrics = null;
    statusAllowCreate = allowCreate;
    showStatus(statusText, allowCreate);
  } else {
    lastLyrics = lyrics;
    statusAllowCreate = false;
    applyRomanization(!isPanelVisible());
  }

  updateRomanControl(card);
  updateSidebarLyricsCardState();
}

export function setSidebarLyricsMessage(message: string) {
  statusText = message;
  lastLyrics = null;
  statusAllowCreate = false;

  const card = cardEl;
  if (!card) return;

  lyricsView?.setLyrics(null);
  showStatus(message);
  updateRomanControl(card);
  updateSidebarLyricsCardState();
}

export function updateSidebarLyricsCardState() {
  const card = cardEl;
  if (!card) return;

  ensureSidebarAttached(card);

  const hidden = isPanelVisible();
  card.classList.toggle("ll-hidden", hidden);
  if (card.classList.contains("ll-expanded")) {
    measureExpandedHeight(card);
    syncExpandedBackground(card);
  }
  card.classList.toggle("ll-hide-credits", !getSettings().pageShowCredits);
  const target = getActiveTarget(lyricsView?.language ?? null);
  card.dataset.romanized = String(target !== null && isLatinTarget(target));
  updateRomanControl(card);

  const collapsed = card.classList.contains("collapsed");
  const shouldAnimate = !hidden && !collapsed && card.isConnected && !isEditorOpen();
  lyricsView?.setEnabled(shouldAnimate);

  sidebarBackground?.setEnabled(!isPanelMaximized() && !isEditorOpen());

  if (shouldAnimate && target !== null && !romanizationApplied) {
    applyRomanization(true);
  }

  if (hidden || collapsed) {
    closeRomanizationMenuFor(card.querySelector<HTMLButtonElement>(".ll-sidebar-roman-toggle"));
  }
}

export function updateSidebarLyricsCardTrack() {
  ensureSidebarAttached();
  syncSidebarBackground();
}

function syncSidebarBackground() {
  const enabled = getSettings().npvBackground;
  const host = enabled ? sidebarBackgroundHost() : null;

  if (!host) {
    sidebarBackground?.el.parentElement?.classList.remove(SIDEBAR_BG_HOST_CLASS);
    sidebarBackground?.destroy();
    sidebarBackground = null;
    return;
  }

  if (!sidebarBackground) {
    sidebarBackground = new LyricsBackground("sidebar");
  }
  if (sidebarBackground.el.parentElement !== host) {
    sidebarBackground.el.parentElement?.classList.remove(SIDEBAR_BG_HOST_CLASS);
    host.appendChild(sidebarBackground.el);
  }
  host.classList.add(SIDEBAR_BG_HOST_CLASS);

  sidebarBackground.setCover(getCurrentCoverUrl());
  sidebarBackground.apply();
}

function sidebarBackgroundHost(): HTMLElement | null {
  const sidebar = document.querySelector<HTMLElement>(RIGHT_SIDEBAR);
  const container = sidebar?.querySelector(SIDEBAR_PANEL_CONTAINER);
  if (!sidebar || !container) return null;

  let host: Element | null = container;
  while (host && host.parentElement !== sidebar) host = host.parentElement;
  return host as HTMLElement | null;
}

function getCurrentCoverUrl(): string {
  const item = currentItem();
  const metadata = item?.metadata ?? {};
  const raw = String(
    metadata.image_xlarge_url || metadata.image_large_url || metadata.image_url || item?.album?.images?.[0]?.url || "",
  );
  const normalized = raw.startsWith("spotify:image:")
    ? raw.replace("spotify:image:", "https://i.scdn.co/image/")
    : raw;
  return normalized.replace(/ab67616d00001e02|ab67616d00004851/g, "ab67616d0000b273");
}

function applyRomanization(allowFetch: boolean) {
  if (!lyricsView) return;
  const target = getActiveTarget(lyricsView.language);
  lyricsView.setRomanized(target, allowFetch);
  romanizationApplied = allowFetch || target === null;
}

function showStatus(message: string, allowCreate = false) {
  if (!lyricsView) return;

  if (!allowCreate && isLoadingMessage(message)) {
    lyricsView.container.replaceChildren(
      createLyricsSkeleton("sidebar", lyricsView.container, lyricsView.scroller),
    );
    lyricsView.resetScroll();
    return;
  }

  const empty = createEmptyState({
    className: "ll-sidebar-mini-empty",
    iconClassName: "ll-empty-icon ll-sidebar-empty-icon",
    messageClassName: "ll-sidebar-mini-empty-text",
    buttonClassName: "ll-sidebar-mini-create-btn",
    message,
    showMessage: true,
    allowCreate,
    onCreate: () => openEditor(),
  });

  lyricsView.container.replaceChildren(empty);
  lyricsView.resetScroll();
}

function updateRomanControl(card: HTMLElement) {
  const romanButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-roman-toggle");
  if (!romanButton) return;

  const hasRomanization = lyricsView?.hasRomanization ?? false;
  const target = getActiveTarget(lyricsView?.language ?? null);
  const active = hasRomanization && target !== null;
  romanButton.hidden = !hasRomanization;
  romanButton.disabled = !hasRomanization;
  romanButton.classList.toggle("active", active);
  romanButton.setAttribute("aria-pressed", String(active));
  if (!hasRomanization) closeRomanizationMenuFor(romanButton);

  const icon = target === "furigana" ? "furigana" : "roman";
  if (romanButton.dataset.icon !== icon) {
    romanButton.dataset.icon = icon;
    romanButton.innerHTML = MINI_ICONS[icon];
  }
  const label = target ? `Romanization: ${TARGET_INFO[target].label}` : "Romanization";
  romanButton.dataset.tooltip = label;
  romanButton.setAttribute("aria-label", label);
}

function applyCollapsedState(card: HTMLElement) {
  const collapsed = localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true";
  card.classList.toggle("collapsed", collapsed);
  card.querySelector<HTMLButtonElement>(".ll-sidebar-header-main")?.setAttribute("aria-expanded", String(!collapsed));
}

function applyExpandedState(card: HTMLElement) {
  const expanded = localStorage.getItem(EXPANDED_STORAGE_KEY) === "true";
  card.classList.toggle("ll-expanded", expanded);
  if (expanded) detachCardToBody(card);
  else reattachCard(card);
  syncExpandedBackground(card);
  if (expanded) observeSidebarSize(card);
  else unobserveSidebarSize();

  const collapseButton = card.querySelector<HTMLButtonElement>(".ll-sidebar-collapse-btn");
  if (collapseButton) {
    collapseButton.hidden = expanded;
    collapseButton.disabled = expanded;
  }
  card
    .querySelector<HTMLButtonElement>(".ll-sidebar-header-main")
    ?.setAttribute("aria-disabled", String(expanded));

  const button = card.querySelector<HTMLButtonElement>(".ll-sidebar-expand-toggle");
  if (button) {
    const icon = expanded ? "collapse" : "expand";
    if (button.dataset.icon !== icon) {
      button.dataset.icon = icon;
      button.innerHTML = MINI_ICONS[icon];
    }
    const label = expanded ? "Shrink card" : "Expand card";
    button.dataset.tooltip = label;
    button.setAttribute("aria-label", label);
    button.classList.toggle("active", expanded);
    button.setAttribute("aria-pressed", String(expanded));
  }

  if (!expanded) card.style.removeProperty("--ll-card-expanded-height");
  else measureExpandedHeight(card);

  if (!lastLyrics && isLoadingMessage(statusText)) showStatus(statusText, statusAllowCreate);
}

function syncExpandedBackground(card: HTMLElement) {
  if (!card.classList.contains("ll-expanded")) {
    expandedBackground?.destroy();
    expandedBackground = null;
    return;
  }

  if (!expandedBackground) expandedBackground = new LyricsBackground("panel", "kawarp");
  if (expandedBackground.el.parentElement !== card) card.insertBefore(expandedBackground.el, card.firstChild);

  expandedBackground.setCover(getCurrentCoverUrl());
  expandedBackground.apply();
  expandedBackground.setEnabled(!isPanelVisible() && !isEditorOpen());
}

function detachCardToBody(card: HTMLElement) {
  if (card.parentElement === document.body) return;
  if (!expandPlaceholder) expandPlaceholder = document.createComment("liquid-lyrics-card-slot");
  card.parentNode?.insertBefore(expandPlaceholder, card);
  document.body.appendChild(card);
}

function reattachCard(card: HTMLElement) {
  if (expandPlaceholder?.parentNode) {
    expandPlaceholder.parentNode.insertBefore(card, expandPlaceholder);
    expandPlaceholder.remove();
  }
  expandPlaceholder = null;
}

function measureExpandedHeight(card: HTMLElement) {
  const sidebar = document.querySelector<HTMLElement>(RIGHT_SIDEBAR);
  if (!sidebar || !card.isConnected) return;

  const rect = sidebar.getBoundingClientRect();
  const inset = 8;
  card.style.setProperty("--ll-card-fs-top", `${Math.round(rect.top + inset)}px`);
  card.style.setProperty("--ll-card-fs-left", `${Math.round(rect.left + inset)}px`);
  card.style.setProperty("--ll-card-fs-width", `${Math.round(rect.width - inset * 2)}px`);
  card.style.setProperty("--ll-card-fs-height", `${Math.round(rect.height - inset * 2)}px`);
}

function observeSidebarSize(card: HTMLElement) {
  const sidebar = document.querySelector<HTMLElement>(RIGHT_SIDEBAR);
  if (!sidebar) return;

  unobserveSidebarSize();
  sidebarSizeObserver = new ResizeObserver(() => {
    if (!card.classList.contains("ll-expanded")) return;
    measureExpandedHeight(card);
  });
  sidebarSizeObserver.observe(sidebar);
}

function unobserveSidebarSize() {
  sidebarSizeObserver?.disconnect();
  sidebarSizeObserver = null;
}

function animateCardFlip(card: HTMLElement, first: DOMRect) {
  if (typeof card.animate !== "function") return;

  const last = card.getBoundingClientRect();
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const sx = last.width > 0 ? first.width / last.width : 1;
  const sy = last.height > 0 ? first.height / last.height : 1;
  if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return;

  card.classList.add("ll-card-flipping");
  const animation = card.animate(
    [
      { transformOrigin: "top left", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
      { transformOrigin: "top left", transform: "none" },
    ],
    { duration: 520, easing: "cubic-bezier(0.34, 1.32, 0.64, 1)" },
  );
  animation.finished
    .catch(() => undefined)
    .finally(() => card.classList.remove("ll-card-flipping"));
}

function ensureSidebarAttached(card = cardEl): boolean {
  if (!card) return false;
  if (card.classList.contains("ll-expanded")) return false;
  removeStrayCards();

  const slot = findCardSlot(card);
  if (!slot) {
    if (card.parentElement?.matches(RIGHT_SIDEBAR)) {
      card.remove();
    }
    return false;
  }

  if (isCardInSlot(card, slot)) return false;
  slot.parent.insertBefore(card, slot.before);
  return true;
}

type CardSlot = { parent: HTMLElement; before: Element | null };

function findCardSlot(card: HTMLElement): CardSlot | null {
  const panel = findNpvPanel();
  if (!panel) return null;

  const lyrics = panel.querySelector(NPV_LYRICS_SECTION);
  const lyricsRow = lyrics && rowOf(panel, lyrics);
  if (lyricsRow) return { parent: panel, before: lyricsRow };

  const visual = panel.querySelector(NPV_TRACK_VISUAL);
  const widgetRow = visual && rowOf(panel, visual);
  if (!widgetRow) return { parent: panel, before: panel.firstElementChild === card ? card : panel.firstElementChild };

  const next = widgetRow.nextElementSibling;
  return { parent: panel, before: next === card ? card.nextElementSibling : next };
}

function isCardInSlot(card: HTMLElement, slot: CardSlot): boolean {
  return card.parentElement === slot.parent && (slot.before === card || card.nextElementSibling === slot.before);
}

function rowOf(panel: HTMLElement, el: Element): Element | null {
  let row: Element | null = el;
  while (row && row.parentElement !== panel) row = row.parentElement;
  return row;
}

function findNpvPanel(): HTMLElement | null {
  if (cachedPanel?.isConnected) return cachedPanel;
  cachedPanel =
    document.querySelector<HTMLElement>(`:is(${RIGHT_SIDEBAR}) ${NPV_PANEL}`) ??
    document.querySelector<HTMLElement>(NPV_PANEL);
  return cachedPanel;
}

function removeStrayCards(): void {
  document.querySelectorAll<HTMLElement>(`#${SIDEBAR_CARD_ID}`).forEach((el) => {
    if (el !== cardEl) el.remove();
  });
}

function observeSidebarMount() {
  if (attachObserver) return;

  attachObserver = new MutationObserver((records) => {
    if (attachScheduled) return;
    if (isOwnMutation(records)) return;
    scheduleAttachCheck();
  });
  attachObserver.observe(document.body, { childList: true, subtree: true });
  handleCinemaViewState();
}

function scheduleAttachCheck() {
  if (attachScheduled) return;
  attachScheduled = true;

  setTimeout(() => {
    attachScheduled = false;
    handleCinemaViewState();

    const card = cardEl;
    if (!card) return;
    if (card.classList.contains("ll-expanded")) return;
    if (ensureSidebarAttached(card)) updateSidebarLyricsCardState();
  }, ATTACH_THROTTLE_MS);
}

function startMountRetry() {
  if (mountRetryTimer) return;
  mountRetryTimer = setInterval(() => {
    handleCinemaViewState();
    ensureSidebarAttached();
    syncSidebarBackground();
    updateSidebarLyricsCardState();
  }, 1000);
}

function handleCinemaViewState() {
  const cinemaActive = Boolean(document.querySelector(CINEMA_VIEW));
  if (cinemaActive) {
    cinemaViewWasActive = true;
    return;
  }

  if (!cinemaViewWasActive) return;
  cinemaViewWasActive = false;
  scheduleSidebarReapply();
}

function scheduleSidebarReapply() {
  cinemaReapplyTimers.forEach((timer) => clearTimeout(timer));
  cinemaReapplyTimers = [80, 260, 620, 1100].map((delay) =>
    setTimeout(() => {
      const card = createSidebarLyricsCard();
      cachedPanel = null;
      ensureSidebarAttached(card);
      updateSidebarLyricsCardState();
    }, delay),
  );
}
