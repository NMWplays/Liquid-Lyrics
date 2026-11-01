const TOOLTIP_ID = "liquid-lyrics-tooltip";

export function registerTooltip(anchor: HTMLElement, text: string) {
  anchor.dataset.tooltip = text;

  const show = () => showTooltip(anchor, anchor.dataset.tooltip || text);
  anchor.addEventListener("pointerenter", show);
  anchor.addEventListener("focus", show);
  anchor.addEventListener("pointerleave", hideTooltip);
  anchor.addEventListener("blur", hideTooltip);
  anchor.addEventListener("click", () => window.setTimeout(() => positionTooltip(anchor), 0));
}

export function showTooltip(anchor: HTMLElement, text: string) {
  if (anchor.hasAttribute("disabled") || anchor.hidden) return;

  const tooltip = getTooltip(anchor);
  tooltip.textContent = text;
  tooltip.classList.add("visible");
  positionTooltip(anchor);
}

export function hideTooltip() {
  document.getElementById(TOOLTIP_ID)?.classList.remove("visible");
}

function getTooltip(anchor: HTMLElement): HTMLElement {
  const host = getTooltipHost(anchor);
  let tooltip = document.getElementById(TOOLTIP_ID) as HTMLElement | null;

  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = TOOLTIP_ID;
    tooltip.className = "liquid-lyrics-tooltip";
  }

  if (tooltip.parentElement !== host) {
    host.appendChild(tooltip);
  }

  return tooltip;
}

function getTooltipHost(anchor: HTMLElement): HTMLElement {
  const fullscreen = document.fullscreenElement;
  if (fullscreen instanceof HTMLElement && fullscreen.contains(anchor)) {
    return fullscreen;
  }

  return document.body;
}

function positionTooltip(anchor: HTMLElement) {
  const tooltip = document.getElementById(TOOLTIP_ID) as HTMLElement | null;
  if (!tooltip?.classList.contains("visible")) return;

  if (!anchor.isConnected) {
    hideTooltip();
    return;
  }

  const rect = anchor.getBoundingClientRect();
  const margin = 9;
  const width = tooltip.offsetWidth || 80;
  const height = tooltip.offsetHeight || 28;
  const top = Math.max(8, rect.top - height - margin);
  const left = clamp(rect.left + rect.width / 2, width / 2 + 8, window.innerWidth - width / 2 - 8);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
