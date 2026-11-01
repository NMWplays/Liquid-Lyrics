import { togglePanel, isPanelVisible } from "@/ui/panel";
import microphoneSvg from "@/ui/microphone.svg";
import { registerTooltip } from "@/ui/tooltip";
import { NOW_PLAYING_EXTRA_CONTROLS } from "@/lib/dom/spotifySelectors";

const BUTTON_ID = "liquid-lyrics-button";

export function createButton(): HTMLButtonElement | null {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) return existing as HTMLButtonElement;

  const container = document.querySelector(NOW_PLAYING_EXTRA_CONTROLS);
  if (!container) return null;

  const btn = document.createElement("button");
  btn.id = BUTTON_ID;
  btn.className = "liquid-lyrics-button";
  btn.setAttribute("aria-label", "Liquid Lyrics");
  btn.innerHTML = microphoneSvg;
  registerTooltip(btn, "Liquid Lyrics");

  btn.addEventListener("click", () => {
    togglePanel();
    btn.classList.toggle("active", isPanelVisible());
  });

  container.prepend(btn);
  return btn;
}

export function updateButtonState() {
  const btn = document.getElementById(BUTTON_ID);
  if (btn) {
    btn.classList.toggle("active", isPanelVisible());
  }
}
