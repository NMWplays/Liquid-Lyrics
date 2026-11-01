import { closeSettingsMenu, openSettingsMenu, GEAR_ICON } from "@/ui/settings/menu";
import { USER_WIDGET } from "@/lib/dom/spotifySelectors";

const DONE_KEY = "liquid-lyrics:onboarding-done";
const ROOT_ID = "liquid-lyrics-onboarding";
const EXIT_MS = 240;
const SPOT_PAD = 7;
const CARD_WIDTH = 304;

const PERSON_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>' +
  '<path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>' +
  "</svg>";

const CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>';

const ARROW_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l8 8-8 8"/></svg>';

type Step = {
  anchor?: string;
  placement: "anchor" | "centre";
  icon: string;
  eyebrow?: string;
  title: string;
  body: string;
  cta: string;
  onEnter?: () => void;
};

const STEPS: Step[] = [
  {
    anchor: ".liquid-lyrics-panel.visible .ll-settings-btn",
    placement: "anchor",
    icon: GEAR_ICON,
    eyebrow: "Welcome to Liquid Lyrics",
    title: "Everything is behind this gear",
    body:
      "Backgrounds, the song card, romanization, fonts, fullscreen - the whole lyrics page " +
      "is yours to arrange, and every change applies straight away.",
    cta: "Next",
  },
  {
    anchor: USER_WIDGET,
    placement: "anchor",
    icon: PERSON_ICON,
    title: "…and here, from anywhere",
    body:
      "The same menu sits in Spotify's profile menu as “Liquid Lyrics Settings”. " +
      "Handy once you have hidden the lyrics button, or when the page is closed.",
    cta: "Next",
  },
  {
    placement: "centre",
    icon: CHECK_ICON,
    title: "The settings menu",
    body: "Every option lives in here, grouped and searchable. Changes save as you go.",
    cta: "Got it",
    onEnter: () => {
      openedSettings = true;
      openSettingsMenu();
    },
  },
];

let step = 0;
let root: HTMLElement | null = null;
let openedSettings = false;
let onResize: (() => void) | null = null;
let onKeyDown: ((event: KeyboardEvent) => void) | null = null;

export function hasSeenOnboarding(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return true;
  }
}

export function maybeStartOnboarding() {
  if (hasSeenOnboarding() || document.getElementById(ROOT_ID)) return;

  markDone();

  window.setTimeout(() => {
    if (document.getElementById(ROOT_ID)) return;
    if (!document.querySelector(".liquid-lyrics-panel.visible")) return;
    open();
  }, 640);
}

function markDone() {
  try {
    localStorage.setItem(DONE_KEY, "1");
  } catch {
  }
}

function open() {
  step = 0;
  openedSettings = false;
  root = document.createElement("div");
  root.id = ROOT_ID;
  root.className = "ll-ob-root";
  document.body.appendChild(root);

  onResize = () => reposition();
  window.addEventListener("resize", onResize);

  onKeyDown = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    finish();
  };
  document.addEventListener("keydown", onKeyDown, true);

  render();
}

function placementFor(current: Step): "anchor" | "centre" {
  if (current.placement !== "anchor" || !current.anchor) return "centre";
  const rect = document.querySelector(current.anchor)?.getBoundingClientRect();
  return rect && rect.width >= 1 && rect.height >= 1 ? "anchor" : "centre";
}

function render() {
  if (!root) return;
  const current = STEPS[step];
  const placement = placementFor(current);
  root.textContent = "";

  const blocker = document.createElement("div");
  blocker.className = "ll-ob-blocker";
  root.appendChild(blocker);

  if (placement === "anchor") {
    const spot = document.createElement("div");
    spot.className = "ll-ob-spot";
    root.appendChild(spot);
  }

  const card = document.createElement("div");
  card.className = `ll-ob-card ll-ob-card--${placement}`;
  card.style.setProperty("--ll-ob-card-w", `${CARD_WIDTH}px`);

  const arrow = document.createElement("div");
  arrow.className = "ll-ob-arrow";
  card.appendChild(arrow);

  const dots = document.createElement("div");
  dots.className = "ll-ob-dots";
  STEPS.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `ll-ob-dot${index === step ? " is-active" : ""}`;
    dots.appendChild(dot);
  });
  card.appendChild(dots);

  if (current.eyebrow) {
    const eyebrow = document.createElement("div");
    eyebrow.className = "ll-ob-eyebrow";
    eyebrow.textContent = current.eyebrow;
    card.appendChild(eyebrow);
  }

  const title = document.createElement("div");
  title.className = "ll-ob-title";
  title.insertAdjacentHTML("beforeend", current.icon);
  title.insertAdjacentText("beforeend", current.title);
  card.appendChild(title);

  const body = document.createElement("p");
  body.className = "ll-ob-text";
  body.textContent = current.body;
  card.appendChild(body);

  const actions = document.createElement("div");
  actions.className = "ll-ob-actions";

  const last = step === STEPS.length - 1;
  if (!last) {
    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "ll-ob-btn ll-ob-btn--ghost";
    skip.textContent = "Skip";
    skip.addEventListener("click", finish);
    actions.appendChild(skip);
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className = "ll-ob-btn ll-ob-btn--primary";
  next.insertAdjacentText("beforeend", current.cta);
  next.insertAdjacentHTML("beforeend", last ? CHECK_ICON : ARROW_ICON);
  next.addEventListener("click", () => (last ? finish() : goTo(step + 1)));
  actions.appendChild(next);

  card.appendChild(actions);

  if (placement === "centre") {
    const centre = document.createElement("div");
    centre.className = "ll-ob-centre";
    centre.appendChild(card);
    root.appendChild(centre);
  } else {
    root.appendChild(card);
  }

  reposition();
}

function reposition() {
  if (!root) return;
  const current = STEPS[step];
  const spot = root.querySelector<HTMLElement>(".ll-ob-spot");
  const card = root.querySelector<HTMLElement>(".ll-ob-card");
  const arrow = root.querySelector<HTMLElement>(".ll-ob-arrow");
  if (!card || !arrow) return;

  const placement = placementFor(current);
  if (placement !== (card.classList.contains("ll-ob-card--anchor") ? "anchor" : "centre")) {
    render();
    return;
  }
  if (placement !== "anchor") return;

  const rect = document.querySelector(current.anchor!)!.getBoundingClientRect();

  if (spot) {
    spot.style.top = `${rect.top - SPOT_PAD}px`;
    spot.style.left = `${rect.left - SPOT_PAD}px`;
    spot.style.width = `${rect.width + SPOT_PAD * 2}px`;
    spot.style.height = `${rect.height + SPOT_PAD * 2}px`;
  }

  const margin = 16;
  const left = Math.min(
    Math.max(margin, rect.right - CARD_WIDTH),
    Math.max(margin, window.innerWidth - CARD_WIDTH - margin),
  );
  card.style.left = `${left}px`;
  card.style.top = `${rect.bottom + SPOT_PAD + 12}px`;

  arrow.style.left = `${Math.min(Math.max(26, rect.left + rect.width / 2 - left), CARD_WIDTH - 26)}px`;
}

function goTo(next: number) {
  if (!root) return;
  for (const el of root.querySelectorAll(".ll-ob-card, .ll-ob-spot")) el.classList.add("is-out");
  window.setTimeout(() => {
    if (!root) return;
    step = next;
    STEPS[step].onEnter?.();
    render();
  }, EXIT_MS);
}

function finish() {
  const el = root;
  if (!el) return;
  root = null;

  for (const child of el.querySelectorAll(".ll-ob-card, .ll-ob-spot")) child.classList.add("is-out");

  if (openedSettings) closeSettingsMenu();
  openedSettings = false;

  if (onResize) window.removeEventListener("resize", onResize);
  if (onKeyDown) document.removeEventListener("keydown", onKeyDown, true);
  onResize = null;
  onKeyDown = null;

  window.setTimeout(() => el.remove(), EXIT_MS);
}
