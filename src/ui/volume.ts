import { clamp } from "@/lib/settings";
import { platform, player } from "@/lib/spotikit";
import { onStop } from "@/lifecycle/runtime";

const STEP = 0.05;
const IDLE_MS = 3000;
const LEAVE_MS = 900;

const SPEAKER = '<path d="M4 9.5h3.2L11.6 6v12l-4.4-3.5H4z"/>';
const ICONS = {
  muted: `<svg viewBox="0 0 24 24" aria-hidden="true">${SPEAKER}<path d="m15.5 9.5 5 5m0-5-5 5"/></svg>`,
  low: `<svg viewBox="0 0 24 24" aria-hidden="true">${SPEAKER}<path d="M15 9.6a3.4 3.4 0 0 1 0 4.8"/></svg>`,
  high: `<svg viewBox="0 0 24 24" aria-hidden="true">${SPEAKER}<path d="M15 9.6a3.4 3.4 0 0 1 0 4.8"/><path d="M17.6 7a7 7 0 0 1 0 10"/></svg>`,
};

export type VolumeControl = {
  el: HTMLElement;
  sync: () => void;
  attach: (card: HTMLElement, cover: HTMLElement) => void;
  relayout: () => void;
  hide: () => void;
};

export function createVolumeControl(): VolumeControl {
  const root = document.createElement("div");
  root.className = "ll-song-card-volume";
  root.innerHTML =
    '<div class="ll-volume-pill">' +
    '<div class="ll-volume-track" role="slider" aria-label="Volume" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" tabindex="0">' +
    '<div class="ll-volume-bg"><div class="ll-volume-fill"></div></div><div class="ll-volume-thumb"></div>' +
    "</div>" +
    '<button type="button" class="ll-volume-btn" aria-label="Mute"></button>' +
    "</div>";

  const button = root.querySelector<HTMLButtonElement>(".ll-volume-btn")!;
  const track = root.querySelector<HTMLElement>(".ll-volume-track")!;

  let dragging = false;
  let icon = "";
  let pendingLevel: number | null = null;
  let frame = 0;
  let hideTimer = 0;

  const render = (level: number, muted: boolean) => {
    const shown = muted ? 0 : clamp(level, 0, 1);
    root.style.setProperty("--ll-volume", shown.toFixed(3));
    track.setAttribute("aria-valuenow", String(Math.round(shown * 100)));
    const next = shown === 0 ? "muted" : shown < 0.5 ? "low" : "high";
    if (next !== icon) {
      icon = next;
      button.innerHTML = ICONS[next];
      button.setAttribute("aria-label", next === "muted" ? "Unmute" : "Mute");
    }
  };

  const sync = () => {
    if (dragging) return;
    render(Number(player()?.volume) || 0, Boolean(player()?.muted));
  };

  const setLevel = (level: number) => {
    level = clamp(level, 0, 1);
    render(level, false);
    pendingLevel = level;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const next = pendingLevel;
      pendingLevel = null;
      if (next === null) return;
      if (player()?.muted && next > 0) void player()?.setMuted?.(false);
      void player()?.setVolume?.(next);
    });
  };

  const show = () => {
    root.classList.add("ll-volume-out");
    scheduleHide(IDLE_MS);
  };
  const hide = () => {
    window.clearTimeout(hideTimer);
    if (dragging) return;
    if (root.querySelector(".ll-volume-pill")?.matches(":hover")) {
      scheduleHide(IDLE_MS);
      return;
    }
    root.classList.remove("ll-volume-out");
  };
  const scheduleHide = (ms: number) => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, ms);
  };

  const levelAt = (clientY: number) => {
    const rect = track.getBoundingClientRect();
    return rect.height ? (rect.bottom - clientY) / rect.height : 0;
  };

  track.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    try {
      track.setPointerCapture(event.pointerId);
    } catch {}
    dragging = true;
    root.classList.add("ll-volume-dragging");
    setLevel(levelAt(event.clientY));
  });
  track.addEventListener("pointermove", (event) => {
    if (dragging) setLevel(levelAt(event.clientY));
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    root.classList.remove("ll-volume-dragging");
    scheduleHide(IDLE_MS);
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("lostpointercapture", endDrag);
  root.addEventListener("click", (event) => event.stopPropagation());

  const current = () => (player()?.muted ? 0 : Number(player()?.volume) || 0);
  root.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setLevel(current() + (event.deltaY < 0 ? STEP : -STEP));
      show();
    },
    { passive: false },
  );
  track.addEventListener("keydown", (event) => {
    const delta = { ArrowRight: STEP, ArrowUp: STEP, ArrowLeft: -STEP, ArrowDown: -STEP }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    setLevel(current() + delta);
    show();
  });
  track.addEventListener("focus", show);

  button.addEventListener("click", () => {
    void player()?.setMuted?.(!player()?.muted);
    show();
  });

  const events = platform()?.PlaybackAPI?.getEvents?.();
  events?.addListener?.("volume", sync);
  events?.addListener?.("muted_changed", sync);
  onStop(() => {
    events?.removeListener?.("volume", sync);
    events?.removeListener?.("muted_changed", sync);
  });

  let place = () => {};
  const attach = (card: HTMLElement, cover: HTMLElement) => {
    place = () => {
      const host = card.parentElement;
      if (!host) return;
      if (root.parentElement !== host || root.previousElementSibling !== card) card.after(root);
      const onCard = card.closest<HTMLElement>(".liquid-lyrics-panel")?.dataset.cardFrame !== "cover";
      const span = onCard ? card.offsetHeight : cover.offsetHeight;
      const offset = onCard ? 0 : cover.offsetTop;
      const height = Math.min(span * 0.72, 230);
      root.style.height = `${Math.round(height)}px`;
      root.style.top = `${Math.round(card.offsetTop + offset + (span - height) / 2)}px`;
      root.style.left = `${Math.round(card.offsetLeft - root.offsetWidth)}px`;
    };
    const observer = new ResizeObserver(() => place());
    observer.observe(cover);
    observer.observe(card);
    place();

    let lastX = NaN;
    let lastY = NaN;
    const onMove = (event: PointerEvent) => {
      if (event.clientX === lastX && event.clientY === lastY) return;
      lastX = event.clientX;
      lastY = event.clientY;
      if (!root.classList.contains("ll-volume-out")) show();
      else scheduleHide(IDLE_MS);
    };
    const onLeave = (event: PointerEvent) => {
      const to = event.relatedTarget as Node | null;
      if (to && (card.contains(to) || root.contains(to))) return;
      scheduleHide(LEAVE_MS);
    };
    card.addEventListener("pointerenter", () => {
      place();
      show();
    });
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
  };

  sync();
  return { el: root, sync, attach, relayout: () => place(), hide };
}
