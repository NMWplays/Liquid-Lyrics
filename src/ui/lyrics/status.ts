import type { LyricsVariant } from "@/ui/lyrics/render";

export const SEARCH_EMPTY_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/></svg>';

const SKELETON_ROWS = [78, 54, 88, 62, 71, 45, 83, 58, 66, 90, 49, 74, 61, 85, 52, 69, 80, 57];

const SKELETON_SPREAD_MS = 420;

const SKELETON_PITCH: Record<LyricsVariant, number> = { panel: 52, sidebar: 30 };

const SKELETON_FALLBACK_ROWS: Record<LyricsVariant, number> = { panel: 18, sidebar: 6 };

export function isLoadingMessage(message: string): boolean {
  return message.toLowerCase().includes("loading");
}

export function skeletonRowsForHeight(height: number, pitch: number): number[] {
  const count = Math.max(4, Math.floor(height / pitch));
  return Array.from({ length: count }, (_, index) => SKELETON_ROWS[index % SKELETON_ROWS.length]);
}

export function createLyricsSkeleton(variant: LyricsVariant, host?: HTMLElement, scroller?: HTMLElement): HTMLElement {
  return buildSkeleton(measureSkeletonRows(variant, host, scroller));
}

function measureSkeletonRows(variant: LyricsVariant, host?: HTMLElement, scroller?: HTMLElement): number[] {
  const fallback = () => SKELETON_ROWS.slice(0, SKELETON_FALLBACK_ROWS[variant]);
  if (!host || !scroller) return fallback();

  const style = getComputedStyle(host);
  const room =
    scroller.clientHeight - parseFloat(style.paddingTop || "0") - parseFloat(style.paddingBottom || "0");
  if (!Number.isFinite(room) || room <= 0) return fallback();

  return skeletonRowsForHeight(room, SKELETON_PITCH[variant]);
}

function buildSkeleton(rows: number[]): HTMLElement {
  const skeleton = document.createElement("div");
  skeleton.className = "liquid-lyrics-skeleton";
  skeleton.setAttribute("aria-label", "Searching for lyrics");
  skeleton.setAttribute("role", "status");

  const last = Math.max(1, rows.length - 1);
  rows.forEach((width, index) => {
    const row = document.createElement("div");
    row.className = "ll-skeleton-row";
    row.style.width = `${width}%`;
    const lead = (rows.length - 1 - index) / last;
    row.style.animationDelay = `-${Math.round(lead * SKELETON_SPREAD_MS)}ms`;
    skeleton.appendChild(row);
  });

  return skeleton;
}

export type EmptyStateOptions = {
  className: string;
  iconClassName: string;
  messageClassName: string;
  buttonClassName: string;
  message: string;
  showMessage: boolean;
  icon?: HTMLElement | null;
  allowCreate: boolean;
  onCreate: () => void;
};

export function createEmptyState(options: EmptyStateOptions): HTMLElement {
  const empty = document.createElement("div");
  empty.className = options.className;

  if (options.icon) {
    empty.appendChild(options.icon);
  } else {
    const icon = document.createElement("div");
    icon.className = options.iconClassName;
    icon.innerHTML = SEARCH_EMPTY_ICON;
    empty.appendChild(icon);
  }

  if (options.showMessage) {
    const text = document.createElement("div");
    text.className = options.messageClassName;
    text.textContent = options.message;
    empty.appendChild(text);
  }

  if (options.allowCreate) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = options.buttonClassName;
    button.textContent = "Create your own sync";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      options.onCreate();
    });
    empty.appendChild(button);
  }

  return empty;
}
