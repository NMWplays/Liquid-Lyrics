import { getActiveTarget, isRomanizationEnabled, setRomanizationEnabled, setTargetFor, getTargetFor, LANGUAGE_LABELS, TARGET_INFO, TARGETS_BY_LANGUAGE, type RomanizationLanguage, type RomanizationTarget } from "@/lib/romanization/modes";
import { createToggle, TOGGLE_FILTER_SVG } from "@/ui/settings/toggle";
import { hideTooltip } from "@/ui/tooltip";

const MENU_ID = "liquid-lyrics-romanization-menu";

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

type OpenMenu = { el: HTMLElement; anchor: HTMLElement; dispose: () => void };
let open: OpenMenu | null = null;

export function isRomanizationMenuOpen(): boolean {
  return open !== null;
}

export function closeRomanizationMenu(): void {
  open?.dispose();
  open = null;
}

export function closeRomanizationMenuFor(anchor: HTMLElement | null | undefined): void {
  if (anchor && open?.anchor === anchor) closeRomanizationMenu();
}

export function toggleRomanizationMenu(anchor: HTMLElement, language: RomanizationLanguage | null): void {
  if (open?.anchor === anchor) {
    closeRomanizationMenu();
    return;
  }
  openRomanizationMenu(anchor, language);
}

export function openRomanizationMenu(anchor: HTMLElement, language: RomanizationLanguage | null): void {
  closeRomanizationMenu();
  hideTooltip();

  const menu = document.createElement("div");
  menu.id = MENU_ID;
  menu.className = "ll-roman-menu";
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-label", "Romanization");
  menu.insertAdjacentHTML("beforeend", TOGGLE_FILTER_SVG);

  const syncers: Array<() => void> = [];
  menu.append(buildHeader(syncers), ...buildOptions(language, syncers));

  const host = getHost();
  host.appendChild(menu);
  anchor.classList.add("ll-menu-open");
  anchor.setAttribute("aria-expanded", "true");
  const panel = anchor.closest<HTMLElement>(".liquid-lyrics-panel");
  panel?.classList.add("ll-roman-menu-open");

  position(menu, anchor);
  requestAnimationFrame(() => menu.classList.add("visible"));

  const runSync = () => {
    for (const sync of syncers) sync();
  };

  runSync();

  const onOutside = (event: Event) => {
    const target = event.target as Node | null;
    if (target && (menu.contains(target) || anchor.contains(target))) return;
    event.stopPropagation();
    closeRomanizationMenu();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    closeRomanizationMenu();
  };
  const onReposition = () => position(menu, anchor);

  document.addEventListener("pointerdown", onOutside, true);
  document.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("resize", onReposition);

  open = {
    el: menu,
    anchor,
    dispose: () => {
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("resize", onReposition);
      anchor.classList.remove("ll-menu-open");
      anchor.setAttribute("aria-expanded", "false");
      panel?.classList.remove("ll-roman-menu-open");
      menu.classList.remove("visible");
      window.setTimeout(() => menu.remove(), 220);
    },
  };

  menu.addEventListener("ll-roman-sync", runSync);
}

function buildHeader(syncers: Array<() => void>): HTMLElement {
  const header = document.createElement("div");
  header.className = "ll-roman-menu-header";

  const text = document.createElement("div");
  text.className = "ll-roman-menu-heading";

  const title = document.createElement("div");
  title.className = "ll-roman-menu-title";
  title.textContent = "Romanization";

  const hint = document.createElement("div");
  hint.className = "ll-roman-menu-hint";
  hint.textContent = "Convert the lyrics as you read along.";

  text.append(title, hint);

  const toggle = createToggle(isRomanizationEnabled, (value) => {
    setRomanizationEnabled(value);
    notifyOpenMenu();
  });
  syncers.push(toggle.sync);

  header.append(text, toggle.el);
  return header;
}

function buildOptions(language: RomanizationLanguage | null, syncers: Array<() => void>): HTMLElement[] {
  if (!language) {
    const empty = document.createElement("div");
    empty.className = "ll-roman-menu-empty";
    empty.textContent = "Nothing to convert in this song.";
    return [empty];
  }

  const label = document.createElement("div");
  label.className = "ll-roman-menu-label";
  label.textContent = LANGUAGE_LABELS[language];

  const list = document.createElement("div");
  list.className = "ll-roman-menu-list";
  list.setAttribute("role", "listbox");

  for (const target of TARGETS_BY_LANGUAGE[language]) {
    list.appendChild(buildOption(language, target, syncers));
  }

  return [label, list];
}

function buildOption(
  language: RomanizationLanguage,
  target: RomanizationTarget,
  syncers: Array<() => void>,
): HTMLElement {
  const info = TARGET_INFO[target];

  const item = document.createElement("button");
  item.type = "button";
  item.className = "ll-roman-menu-item";
  item.setAttribute("role", "option");

  const text = document.createElement("span");
  text.className = "ll-roman-menu-item-text";

  const name = document.createElement("span");
  name.className = "ll-roman-menu-item-name";
  name.textContent = info.label;

  const hint = document.createElement("span");
  hint.className = "ll-roman-menu-item-hint";
  hint.textContent = info.hint;

  text.append(name, hint);

  const check = document.createElement("span");
  check.className = "ll-roman-menu-check";
  check.innerHTML = CHECK_ICON;

  item.append(text, check);

  item.addEventListener("click", (event) => {
    event.stopPropagation();
    setTargetFor(language, target);
    notifyOpenMenu();
  });

  syncers.push(() => {
    const active = getActiveTarget(language) === target;
    const stored = getTargetFor(language) === target;
    item.classList.toggle("is-selected", active);
    item.classList.toggle("is-stored", stored && !active);
    item.setAttribute("aria-selected", String(active));
  });

  return item;
}

function notifyOpenMenu(): void {
  open?.el.dispatchEvent(new Event("ll-roman-sync"));
}

function getHost(): HTMLElement {
  const fullscreen = document.fullscreenElement;
  return fullscreen instanceof HTMLElement ? fullscreen : document.body;
}

function position(menu: HTMLElement, anchor: HTMLElement): void {
  const margin = 18;
  const rect = anchor.getBoundingClientRect();
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;

  const below = rect.bottom + margin;
  const top = below + height <= window.innerHeight - margin ? below : rect.top - height - margin;

  const left = rect.left + rect.width / 2 - width / 2;

  menu.style.top = `${clamp(top, margin, Math.max(margin, maxY))}px`;
  menu.style.left = `${clamp(left, margin, Math.max(margin, maxX))}px`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
