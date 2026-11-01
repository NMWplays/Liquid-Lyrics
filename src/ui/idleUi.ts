import { getSettings, SETTINGS_EVENT } from "@/lib/settings";

const IDLE_CLASS = "ll-ui-idle";
const CURSOR_CLASS = "ll-ui-idle-cursor";
const ACTIVITY_EVENTS = ["pointermove", "pointerdown", "wheel", "keydown", "touchstart"] as const;

let panelEl: HTMLElement | null = null;
let isMaximized: () => boolean = () => false;
let idleTimer = 0;
let registered = false;

export function registerIdleUi(panel: HTMLElement, maximized: () => boolean) {
  panelEl = panel;
  isMaximized = maximized;

  if (!registered) {
    registered = true;
    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, onActivity, { capture: true, passive: true });
    }
    window.addEventListener(SETTINGS_EVENT, () => refreshIdleUi());
  }

  refreshIdleUi();
}

export function refreshIdleUi() {
  const panel = panelEl;
  if (!panel) return;

  clearIdleTimer();
  setIdle(false);

  if (!getSettings().autoHideUi || !isMaximized()) return;
  startIdleTimer();
}

function onActivity() {
  const panel = panelEl;
  if (!panel) return;

  if (!getSettings().autoHideUi || !isMaximized()) {
    if (panel.classList.contains(IDLE_CLASS)) setIdle(false);
    clearIdleTimer();
    return;
  }

  setIdle(false);
  startIdleTimer();
}

function startIdleTimer() {
  const { autoHideDelay } = getSettings();
  clearIdleTimer();
  idleTimer = window.setTimeout(() => {
    idleTimer = 0;
    if (!getSettings().autoHideUi || !isMaximized()) return;
    setIdle(true);
  }, Math.max(1, autoHideDelay) * 1000);
}

function clearIdleTimer() {
  if (!idleTimer) return;
  window.clearTimeout(idleTimer);
  idleTimer = 0;
}

function setIdle(idle: boolean) {
  const panel = panelEl;
  if (!panel) return;

  panel.classList.toggle(IDLE_CLASS, idle);
  panel.classList.toggle(CURSOR_CLASS, idle && getSettings().autoHideCursor);
}
