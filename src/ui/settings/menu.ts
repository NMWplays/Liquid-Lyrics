import {
  clamp,
  getBackgroundImage,
  getSettings,
  resetSettings,
  setBackgroundMode,
  SETTING_RANGES,
  setSetting,
  storeBackgroundFile,
  type BackgroundMode,
  type BackgroundSource,
  type CanvasPiece,
  type CardStyle,
  type ControlPosition,
  type NoLyricsView,
  type TranslationLayout,
  type NumericSetting,
  type Settings,
  type SpotifyLyricsButtonMode,
} from "@/lib/settings";
import { hideTooltip, registerTooltip } from "@/ui/tooltip";
import { scrollOffsetFor } from "@/lib/dom/scroll";
import { SmoothScroller } from "@/ui/lyrics/smoothScroll";
import { createToggle, TOGGLE_FILTER_SVG } from "@/ui/settings/toggle";

const OVERLAY_ID = "liquid-lyrics-settings-overlay";
const CLOSE_FALLBACK_MS = 500;

export const SETTINGS_MENU_EVENT = "liquid-lyrics:settings-menu";

export const GEAR_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065"/>' +
  '<path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/>' +
  "</svg>";

const CONTEXT_MENU_ICON =
  '<svg role="img" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
  'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="butt" stroke-linejoin="miter">' +
  '<path vector-effect="non-scaling-stroke" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />' +
  '<path vector-effect="non-scaling-stroke" d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />' +
  "</svg>";

const RESET_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.6v4.8h4.8"/><path d="M4.6 10.4a7.6 7.6 0 1 1 .7 6"/></svg>';

const CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19"/><path d="M19 5 5 19"/></svg>';

let syncControls: Array<() => void> = [];
let closing = false;
let navScrollButtons: HTMLElement[] = [];
let bodyScroller: SmoothScroller | null = null;
let generation = 0;

export function isSettingsMenuOpen(): boolean {
  return Boolean(document.getElementById(OVERLAY_ID)) && !closing;
}

export function toggleSettingsMenu() {
  if (isSettingsMenuOpen()) closeSettingsMenu();
  else openSettingsMenu();
}

export function openSettingsMenu() {
  document.getElementById(OVERLAY_ID)?.remove();
  syncControls = [];
  closing = false;
  generation++;

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "ll-settings-overlay";
  overlay.addEventListener("pointerdown", (event) => {
    if (event.target === overlay) closeSettingsMenu();
  });

  overlay.insertAdjacentHTML("beforeend", TOGGLE_FILTER_SVG);
  overlay.appendChild(buildPanel());

  getHost().appendChild(overlay);

  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("visible")));

  runSync();

  const body = overlay.querySelector<HTMLElement>(".ll-settings-body");
  if (body) {
    bodyScroller = new SmoothScroller(body, true);
    bodyScroller.sync();
  }

  document.addEventListener("keydown", onKeyDown, true);
  window.dispatchEvent(new Event(SETTINGS_MENU_EVENT));
}

export function closeSettingsMenu() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay || closing) return;
  closing = true;

  document.removeEventListener("keydown", onKeyDown, true);
  closeSelectMenu();
  closeColorPicker();
  hideTooltip();
  bodyScroller?.destroy();
  bodyScroller = null;
  for (const button of navScrollButtons) button.remove();
  navScrollButtons = [];

  overlay.classList.remove("visible");
  overlay.classList.add("closing");

  const panel = overlay.querySelector<HTMLElement>(".ll-settings-panel");
  const closingGeneration = generation;
  let done = false;
  let fallback = 0;

  const finish = (event?: TransitionEvent) => {
    if (event && (event.target !== panel || event.propertyName !== "transform")) return;
    if (done) return;
    done = true;
    window.clearTimeout(fallback);
    panel?.removeEventListener("transitionend", finish);
    overlay.remove();

    if (closingGeneration !== generation) return;
    syncControls = [];
    closing = false;
    window.dispatchEvent(new Event(SETTINGS_MENU_EVENT));
  };

  panel?.addEventListener("transitionend", finish);
  fallback = window.setTimeout(finish, CLOSE_FALLBACK_MS);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  event.preventDefault();
  event.stopPropagation();

  if (openSelect) {
    closeSelectMenu();
    return;
  }
  closeSettingsMenu();
}

function getHost(): HTMLElement {
  const fullscreen = document.fullscreenElement;
  return fullscreen instanceof HTMLElement ? fullscreen : document.body;
}

type GroupSpec = { title: string; rows: HTMLElement[]; visible?: () => boolean };
type SectionSpec = { id: string; title: string; groups: GroupSpec[] };

function buildPanel(): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "ll-settings-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Liquid Lyrics Settings");

  const sections: SectionSpec[] = [
    buttonsSection(),
    interfaceSection(),
    lyricsSection(),
    backgroundSection(),
    songCardSection(),
    pageSection(),
    fullscreenSection(),
    nowPlayingSection(),
  ];

  const body = document.createElement("div");
  body.className = "ll-settings-body";
  body.append(...sections.map(createSection), buildFooter());

  panel.append(buildHeader(), buildSearchIsland(sections, body), body);
  runSync();
  return panel;
}

function buildHeader(): HTMLElement {
  const header = document.createElement("div");
  header.className = "ll-settings-header";

  const title = document.createElement("h3");
  title.className = "ll-settings-title";
  title.textContent = "Liquid Lyrics Settings";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ll-settings-surface ll-settings-header-btn ll-settings-close-btn";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.innerHTML = CLOSE_ICON;
  closeBtn.addEventListener("click", closeSettingsMenu);
  registerTooltip(closeBtn, "Close");

  const actions = document.createElement("div");
  actions.className = "ll-settings-header-actions";
  actions.appendChild(closeBtn);

  header.append(title, actions);
  return header;
}

function buildSearchIsland(sections: SectionSpec[], body: HTMLElement): HTMLElement {
  const island = document.createElement("div");
  island.className = "ll-settings-search-island";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "ll-settings-surface ll-settings-search-input";
  input.placeholder = "Search settings...";
  input.spellcheck = false;
  input.addEventListener("input", () => applySearch(body, input.value));

  const wrap = document.createElement("div");
  wrap.className = "ll-settings-section-nav-wrap";

  const nav = document.createElement("div");
  nav.className = "ll-settings-section-nav";

  for (const section of sections) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ll-settings-surface ll-settings-section-nav-btn";
    button.textContent = section.title;
    button.addEventListener("click", () => {
      const sectionEl = document.getElementById(sectionElementId(section.id));
      if (!sectionEl) return;
      const top = scrollOffsetFor(body, sectionEl);
      if (top === null) return;
      if (bodyScroller) bodyScroller.scrollTo(top);
      else body.scrollTo({ top, behavior: "smooth" });
    });
    nav.appendChild(button);
  }

  wrap.append(nav);
  island.append(input, wrap);

  const scrollLeft = createNavScrollButton("isLeft", "Scroll sections left", () => scrollNav(nav, -1));
  const scrollRight = createNavScrollButton("isRight", "Scroll sections right", () => scrollNav(nav, 1));

  navScrollButtons = [scrollLeft, scrollRight];

  const updateArrows = () => {
    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay || !nav.isConnected) return;
    if (scrollLeft.parentElement !== overlay) overlay.append(scrollLeft, scrollRight);

    const rect = nav.getBoundingClientRect();
    const maxScroll = Math.max(0, nav.scrollWidth - nav.clientWidth);
    const top = Math.round(rect.top + 10);

    scrollLeft.style.top = `${top}px`;
    scrollLeft.style.left = `${Math.round(rect.left + 12)}px`;
    scrollRight.style.top = `${top}px`;
    scrollRight.style.left = `${Math.round(rect.right - 42)}px`;

    scrollLeft.classList.toggle("is-visible", nav.scrollLeft > 1);
    scrollRight.classList.toggle("is-visible", nav.scrollLeft < maxScroll - 1);
  };

  nav.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  const start = performance.now();
  const track = () => {
    updateArrows();
    if (performance.now() - start < 650 && document.getElementById(OVERLAY_ID)) requestAnimationFrame(track);
  };
  requestAnimationFrame(track);

  return island;
}

function createNavScrollButton(sideClass: string, label: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `ll-settings-surface ll-settings-section-nav-scroll-btn ${sideClass}`;
  button.setAttribute("aria-label", label);
  button.innerHTML =
    sideClass === "isLeft"
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  button.addEventListener("click", onClick);
  return button;
}

function scrollNav(nav: HTMLElement, direction: -1 | 1) {
  nav.scrollBy({ left: direction * Math.max(120, nav.clientWidth * 0.72), behavior: "smooth" });
}

function applySearch(body: HTMLElement, query: string) {
  const q = query.trim().toLowerCase();

  body.querySelectorAll<HTMLElement>(".ll-settings-section").forEach((section) => {
    const title = (section.querySelector(".ll-settings-section-title")?.textContent || "").toLowerCase();
    const sectionMatches = q !== "" && title.includes(q);
    let anyVisible = false;

    section.querySelectorAll<HTMLElement>(".ll-settings-row").forEach((row) => {
      if (row.classList.contains("is-hidden")) {
        row.style.display = "";
        return;
      }
      const label = (row.querySelector(".ll-settings-label")?.textContent || "").toLowerCase();
      const matches = q === "" || sectionMatches || label.includes(q);
      row.style.display = matches ? "" : "none";
      if (matches) anyVisible = true;
    });

    section.querySelectorAll<HTMLElement>(".ll-settings-subsection").forEach((sub) => {
      const subVisible = Array.from(sub.querySelectorAll<HTMLElement>(".ll-settings-row")).some(
        (row) => row.style.display !== "none" && !row.classList.contains("is-hidden"),
      );
      sub.style.display = subVisible ? "" : "none";
    });

    section.style.display = q === "" || sectionMatches || anyVisible ? "" : "none";
  });
}

function buttonsSection(): SectionSpec {
  return {
    id: "buttons",
    title: "Buttons",
    groups: [{
      title: "Now playing bar",
      rows: [
      createSelectRow<SpotifyLyricsButtonMode>(
        "Spotify's lyrics button",
        "Two lyrics buttons side by side get crowded. Hide Spotify's own one, or let it open Liquid Lyrics instead of Spotify's lyrics view.",
        [
          { value: "keep", label: "Leave it alone" },
          { value: "hide", label: "Hide it" },
          { value: "override", label: "Open Liquid Lyrics" },
        ],
        () => getSettings().spotifyLyricsButton,
        (value) => setSetting("spotifyLyricsButton", value),
      ),
      createToggleRow(
        "Liquid Lyrics button",
        "The microphone button next to Spotify's player controls.",
        "showOwnButton",
      ),
      ],
    }],
  };
}

function interfaceSection(): SectionSpec {
  return {
    id: "interface",
    title: "Interface",
    groups: [{
      title: "Header",
      rows: [
        createToggleRow(
          "Show the wordmark",
          'The "Liquid Lyrics" lettering in the panel\'s top left corner.',
          "showTitle",
        ),
        createToggleRow(
          "Show GitHub & Discord",
          "The two link buttons in the panel's top right corner. The settings gear stays either way.",
          "showHeaderLinks",
        ),
      ],
    }],
  };
}

function pageSection(): SectionSpec {
  return {
    id: "page",
    title: "Panel",
    groups: [
      {
        title: "Elements",
        rows: [
          createToggleRow("Show credits", "Writers, and where the sync came from, below the last line.", "pageShowCredits"),
          createToggleRow("Hide the scrollbar", "The thin scrollbar alongside the lyrics.", "pageHideScrollbar"),
        ],
      },
      {
        title: "Controls",
        rows: [
          createToggleRow("Show the control pill", "The floating row of view controls.", "pageShowControls"),
          createSelectRow<ControlPosition>(
            "Control pill position",
            "Which edge the floating controls sit against.",
            CONTROL_POSITIONS,
            () => getSettings().pageControlPosition,
            (value) => setSetting("pageControlPosition", value),
            () => getSettings().pageShowControls,
          ),
        ],
      },
    ],
  };
}

function fullscreenSection(): SectionSpec {
  const autoHideOn = () => getSettings().autoHideUi;

  return {
    id: "fullscreen",
    title: "Fullscreen",
    groups: [
      {
        title: "Auto-hide",
        rows: [
          createToggleRow(
            "Fade the interface out",
            "In cinema and fullscreen mode the header, control pill and scrollbar fade away while the mouse rests, and fade back in on the next move.",
            "autoHideUi",
          ),
          createStepperRow(
            "Fade out after (seconds)",
            "Seconds of stillness before the interface disappears.",
            "autoHideDelay",
            autoHideOn,
          ),
          createToggleRow("Hide the cursor too", "Takes the mouse pointer with it.", "autoHideCursor", autoHideOn),
        ],
      },
      {
        title: "Elements",
        rows: [
          createToggleRow("Show credits", "Writers, and where the sync came from, below the last line.", "fsShowCredits"),
          createToggleRow("Hide the scrollbar", "The thin scrollbar alongside the lyrics.", "fsHideScrollbar"),
        ],
      },
      {
        title: "Fade the track details out",
        rows: [
          createToggleRow(
            "Song name",
            "Fades away when the panel is maximized, and back in when it is not. The card keeps its size either way.",
            "fsFadeTitle",
          ),
          createToggleRow("Artist", "As above, for the artist.", "fsFadeArtist"),
          createToggleRow("Album", "As above, for the album.", "fsFadeAlbum"),
        ],
      },
      {
        title: "Controls",
        rows: [
          createToggleRow("Show the control pill", "The floating row of view controls.", "fsShowControls"),
          createSelectRow<ControlPosition>(
            "Control pill position",
            "Which edge the floating controls sit against.",
            CONTROL_POSITIONS,
            () => getSettings().fsControlPosition,
            (value) => setSetting("fsControlPosition", value),
            () => getSettings().fsShowControls,
          ),
        ],
      },
    ],
  };
}

const CONTROL_POSITIONS: Array<{ value: ControlPosition; label: string }> = [
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

function backgroundSection(): SectionSpec {
  const mode = () => getSettings().bgMode;
  const usesPicture = () => mode() !== "color" && mode() !== "transparent";
  const usesUrl = () => usesPicture() && getSettings().bgSource === "url";
  const usesUpload = () => usesPicture() && getSettings().bgSource === "upload";
  const isMoving = () => mode() === "animated" || mode() === "kawarp";
  const isKawarp = () => mode() === "kawarp";

  return {
    id: "background",
    title: "Background",
    groups: [
      {
        title: "Source",
        rows: [
          createSelectRow<BackgroundMode>(
            "Background mode",
            "Transparent lets your theme through, colour is a plain colour, image a picture of your choice. Animated is a simple drifting effect made from the cover art; Kawarp looks a lot better but needs more from your graphics card.",
            [
              { value: "transparent", label: "Transparent" },
              { value: "color", label: "Color" },
              { value: "image", label: "Image" },
              { value: "animated", label: "Animated" },
              { value: "kawarp", label: "Kawarp" },
            ],
            () => getSettings().bgMode,
            (value) => setBackgroundMode(value),
          ),
          hiddenUnless(createColorRow("Background color", "Used by the colour mode.", "bgColor"), () => mode() === "color"),
          hiddenUnless(
            createSelectRow<BackgroundSource>(
              "Picture source",
              "Where the picture comes from.",
              [
                { value: "albumArt", label: "Album art" },
                { value: "url", label: "URL" },
                { value: "upload", label: "Local file" },
              ],
              () => getSettings().bgSource,
              (value) => setSetting("bgSource", value),
            ),
            usesPicture,
          ),
          hiddenUnless(createTextRow("Image URL", "A direct link to an image file.", "bgUrl", "https://..."), usesUrl),
          hiddenUnless(createFileRow("Local image", "Downscaled and stored in Spotify's local storage."), usesUpload),
        ],
      },
      {
        title: "Appearance",
        rows: [
          hiddenUnless(
            createStepperRow(
              "Blur (px)",
              "Blur radius. In transparent mode it frosts whatever sits behind the panel; Kawarp maps it onto its blur passes.",
              "bgBlur",
            ),
            () => mode() !== "color",
          ),
          hiddenUnless(createStepperRow("Scale (%)", "Zoom level of the background picture.", "bgScale"), usesPicture),
          hiddenUnless(createStepperRow("Opacity (%)", "How opaque the whole background layer is.", "bgOpacity"), usesPicture),
          hiddenUnless(createStepperRow("Brightness (%)", "How bright the background sits behind the lyrics.", "bgBrightness"), usesPicture),
          hiddenUnless(createStepperRow("Contrast (%)", "Contrast of the background picture.", "bgContrast"), usesPicture),
          hiddenUnless(createStepperRow("Saturation (%)", "Colour intensity.", "bgSaturation"), usesPicture),
        ],
      },
      {
        title: "Motion",
        rows: [
          hiddenUnless(
            createStepperRow("Warp intensity (%)", "How hard Kawarp distorts the picture.", "bgWarpIntensity"),
            isKawarp,
          ),
          hiddenUnless(
            createStepperRow("Motion speed (%)", "Rotation speed of the blobs, or Kawarp's animation speed.", "bgRotationSpeed"),
            isMoving,
          ),
        ],
      },
    ],
  };
}

const CARD_STYLES: Array<{ value: CardStyle; label: string }> = [
  { value: "default", label: "Default" },
  { value: "cover", label: "Cover" },
  { value: "canvas", label: "Canvas" },
];

function usesCardStyle(style: CardStyle): boolean {
  const settings = getSettings();
  return settings.cardStyle === style || (settings.fsCardStyleSeparate && settings.fsCardStyle === style);
}

function songCardSection(): SectionSpec {
  return {
    id: "songcard",
    title: "Song card",
    groups: [
      {
        title: "Appearance",
        rows: [
          createSelectRow<CardStyle>(
            "Card style",
            "Default keeps the card on your theme's liquid glass surface. Cover leads with the artwork instead: the playback controls fade in over it on hover, and the track details sit as plain text underneath. Canvas is that same layout in the clip's own upright shape: it plays Spotify's looping Canvas for the track, and shows the artwork enlarged in the same box on the tracks that have none.",
            CARD_STYLES,
            () => getSettings().cardStyle,
            (value) => setSetting("cardStyle", value),
          ),
          createToggleRow(
            "Own style in fullscreen",
            "Gives cinema and fullscreen a card style of their own. Off, they wear the one above.",
            "fsCardStyleSeparate",
          ),
          hiddenUnless(
            createSelectRow<CardStyle>(
              "Fullscreen card style",
              "The card style for cinema and fullscreen.",
              CARD_STYLES,
              () => getSettings().fsCardStyle,
              (value) => setSetting("fsCardStyle", value),
            ),
            () => getSettings().fsCardStyleSeparate,
          ),
          hiddenUnless(
            createStepperRow(
              "Card border radius (px)",
              "Rounding of the card itself. The cover style has no card frame to round — there the artwork is the card.",
              "cardRadius",
            ),
            () => usesCardStyle("default"),
          ),
          hiddenUnless(
            createStepperRow(
              "Cover border radius (px)",
              "Rounding of the artwork in the cover style, and of the clip in the canvas style.",
              "cardCoverRadius",
            ),
            () => usesCardStyle("cover") || usesCardStyle("canvas"),
          ),
          createSelectRow<"left" | "right">(
            "Card side",
            "Which side of the lyrics the card sits on. Also switchable from the control pill.",
            [
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ],
            () => getSettings().cardSide,
            (value) => setSetting("cardSide", value),
          ),
          createToggleRow("Center text", "Aligns the track details to the centre.", "cardCenterText"),
        ],
      },
      {
        title: "Canvas",
        visible: () => usesCardStyle("canvas"),
        rows: [
          createSelectRow<CanvasPiece>(
            "Track details",
            "Over the clip, under it as the other styles have them, or not at all. Which of the three lines show is still up to Track details below.",
            [
              { value: "overlay", label: "On the Canvas" },
              { value: "below", label: "Below" },
              { value: "hidden", label: "Hidden" },
            ],
            () => getSettings().cardCanvasTitle,
            (value) => setSetting("cardCanvasTitle", value),
          ),
          createSelectRow<CanvasPiece>(
            "Record",
            "The turning record, the same one the vinyl view uses. It follows the artwork of whatever is playing.",
            [
              { value: "overlay", label: "On the Canvas" },
              { value: "below", label: "Below" },
              { value: "hidden", label: "Hidden" },
            ],
            () => getSettings().cardCanvasVinyl,
            (value) => setSetting("cardCanvasVinyl", value),
          ),
        ],
      },
      {
        title: "Volume slider",
        rows: [
          hiddenUnless(
            createToggleRow("Default style", "A volume slider under the progress bar.", "cardVolumeDefault"),
            () => usesCardStyle("default"),
          ),
          hiddenUnless(
            createToggleRow("Cover style", "A volume slider under the transport, revealed with it.", "cardVolumeCover"),
            () => usesCardStyle("cover"),
          ),
          hiddenUnless(
            createToggleRow("Canvas style", "A volume slider under the transport, revealed with it.", "cardVolumeCanvas"),
            () => usesCardStyle("canvas"),
          ),
        ],
      },
      {
        title: "Track details",
        rows: [
          createToggleRow("Hide title", "Hides the track title.", "cardHideTitle"),
          createToggleRow("Hide artist", "Hides the artist name.", "cardHideArtist"),
          createToggleRow("Hide album", "Hides the album name.", "cardHideAlbum"),
        ],
      },
    ],
  };
}

function nowPlayingSection(): SectionSpec {
  return {
    id: "npv",
    title: "Now Playing View",
    groups: [
      {
        title: "Background",
        rows: [
          createToggleRow(
            "Show the background",
            "Paints your chosen background behind Spotify's whole right sidebar - behind the cover art, the song info, the queue and the lyrics card - instead of leaving it on your theme's own backdrop.",
            "npvBackground",
          ),
        ],
      },
      {
        title: "Sidebar Lyrics Card",
        rows: [
          createToggleRow("Show the card", "The Liquid Lyrics card inside Spotify's Now Playing View.", "npvShowCard"),
          createToggleRow(
            "Replace Spotify's lyrics card",
            "Hides Spotify's own lyrics card in the Now Playing View, so the Liquid Lyrics card takes its place.",
            "npvReplaceSpotifyLyrics",
            () => getSettings().npvShowCard,
          ),
          createStepperRow(
            "Card height (vh)",
            "Height of the lyrics card, as a share of the window.",
            "npvCardHeight",
            () => getSettings().npvShowCard,
          ),
          createStepperRow(
            "Card minimum height (px)",
            "The card never shrinks below this.",
            "npvCardMinHeight",
            () => getSettings().npvShowCard,
          ),
        ],
      },
    ],
  };
}

function lyricsSection(): SectionSpec {
  return {
    id: "lyrics",
    title: "Lyrics",
    groups: [
      {
        title: "Text",
        rows: [createStepperRow("Font size (%)", "Scales every lyric line. 100% is the built-in size.", "fontScale")],
      },
      {
        title: "Display",
        rows: [
          createToggleRow(
            "Simple lyrics mode",
            "Drops the extra motion: word-by-word lines only fill left to right instead of also rising, and block lines arrive already filled rather than wiping top to bottom.",
            "simpleLyrics",
          ),
          createToggleRow(
            "Minimal lyrics mode",
            "Keeps the karaoke fill travelling letter by letter, but stops each letter lifting as it is sung.",
            "minimalLyrics",
            () => !getSettings().simpleLyrics,
          ),
          createToggleRow(
            "Word glow",
            "Word-by-word lyrics: each word glows while it is sung, and on held words the glow travels letter by letter.",
            "wordGlow",
            () => !getSettings().simpleLyrics,
          ),
          createToggleRow(
            "Translate lyrics",
            "Shows a translation into Spotify's language under every line. Lines already in that language are left as they are. Works together with romanization.",
            "translateLyrics",
          ),
          hiddenUnless(
            createSelectRow<TranslationLayout>(
              "Translation layout",
              "Under the original lyrics, on top with the original small underneath, or on its own in place of the original.",
              [
                { value: "below", label: "Under the lyrics" },
                { value: "main", label: "Translation on top" },
                { value: "only", label: "Translation only" },
              ],
              () => getSettings().translationLayout,
              (value) => setSetting("translationLayout", value),
            ),
            () => getSettings().translateLyrics,
          ),
        ],
      },
      {
        title: "When there are no lyrics",
        rows: [
          createSelectRow<NoLyricsView>(
            "Show instead",
            "What fills the panel once the search has settled and the song has no lyrics.",
            [
              { value: "message", label: "A message" },
              { value: "card", label: "The song card, enlarged" },
              { value: "vinyl", label: "Spinning cover art" },
            ],
            () => getSettings().noLyricsView,
            (value) => setSetting("noLyricsView", value),
          ),
        ],
      },
      {
        title: "Fade areas",
        rows: [
          createStepperRow("Fade area above (%)", "How far the lyrics fade out towards the top edge.", "fadeTop"),
          createStepperRow("Fade area below (%)", "How far the lyrics fade out towards the bottom edge.", "fadeBottom"),
        ],
      },
      {
        title: "Scrolling",
        rows: [
          createToggleRow(
            "Smooth scrolling",
            "Eases the lyrics along instead of jumping line to line, and smooths the wheel.",
            "smoothScroll",
          ),
          createStepperRow(
            "Scroll easing (tenths of a second)",
            "How long the glide to the next line takes.",
            "smoothScrollDuration",
            () => getSettings().smoothScroll,
          ),
          createToggleRow(
            "Lines follow the scroll",
            "On a line change the lines below the next one trail behind it for a moment, each a little later than the one above.",
            "lineDrag",
            () => getSettings().smoothScroll,
          ),
        ],
      },
    ],
  };
}

function buildFooter(): HTMLElement {
  const footer = document.createElement("div");
  footer.className = "ll-settings-footer";

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "ll-settings-surface ll-settings-reset-btn";
  reset.innerHTML = `${RESET_ICON}<span>Reset to defaults</span>`;
  reset.addEventListener("click", () => {
    resetSettings();
    runSync();
  });

  footer.appendChild(reset);
  return footer;
}

function sectionElementId(id: string): string {
  return `liquid-lyrics-sec-${id}`;
}

function createSection(spec: SectionSpec): HTMLElement {
  const section = document.createElement("div");
  section.className = "ll-settings-section";
  section.id = sectionElementId(spec.id);

  const title = document.createElement("div");
  title.className = "ll-settings-section-title";
  title.textContent = spec.title;

  const body = document.createElement("div");
  body.className = "ll-settings-section-body";
  body.append(...spec.groups.map(createSubSection));

  section.append(title, body);
  return section;
}

function createSubSection(spec: GroupSpec): HTMLElement {
  const sub = document.createElement("div");
  sub.className = "ll-settings-subsection";

  const title = document.createElement("div");
  title.className = "ll-settings-subsection-title";
  title.textContent = spec.title;

  sub.append(title, ...spec.rows);
  if (spec.visible) {
    const isVisible = spec.visible;
    registerSync(() => sub.classList.toggle("is-hidden", !isVisible()));
  }
  return sub;
}

function hiddenUnless(row: HTMLElement, visible: () => boolean): HTMLElement {
  registerSync(() => row.classList.toggle("is-hidden", !visible()));
  return row;
}

function createRow(label: string, hint: string): { row: HTMLElement; controls: HTMLElement } {
  const row = document.createElement("div");
  row.className = "ll-settings-row";

  const text = document.createElement("div");
  text.className = "ll-settings-label";

  const labelEl = document.createElement("span");
  labelEl.className = "ll-settings-label-text";
  labelEl.textContent = label;
  text.appendChild(labelEl);

  if (hint) {
    const hintEl = document.createElement("span");
    hintEl.className = "ll-settings-hint";
    hintEl.textContent = hint;
    text.appendChild(hintEl);
  }

  const controls = document.createElement("div");
  controls.className = "ll-settings-row-controls";

  row.append(text, controls);
  return { row, controls };
}

type BooleanSetting = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never;
}[keyof Settings];

function createToggleRow(
  label: string,
  hint: string,
  key: BooleanSetting,
  isEnabled: () => boolean = () => true,
): HTMLElement {
  const { row, controls } = createRow(label, hint);
  const toggle = createToggle(
    () => getSettings()[key],
    (value) => {
      setSetting(key, value);
      runSync();
    },
  );
  controls.appendChild(toggle.el);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    toggle.el.disabled = !enabled;
    toggle.sync();
  });

  return row;
}

function createStepperRow(
  label: string,
  hint: string,
  key: NumericSetting,
  isEnabled: () => boolean = () => true,
): HTMLElement {
  const { row, controls } = createRow(label, hint);
  const stepper = createStepper(
    SETTING_RANGES[key],
    () => getSettings()[key],
    (value) => {
      setSetting(key, value);
      runSync();
    },
  );
  controls.appendChild(stepper.el);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    stepper.setEnabled(enabled);
    stepper.sync();
  });

  return row;
}

function createSelectRow<T extends string>(
  label: string,
  hint: string,
  options: Array<{ value: T; label: string }>,
  read: () => T,
  write: (value: T) => void,
  isEnabled: () => boolean = () => true,
): HTMLElement {
  const { row, controls } = createRow(label, hint);
  const select = createSelect(options, read, (value) => {
    write(value);
    runSync();
  });
  controls.appendChild(select.el);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    select.el.disabled = !enabled;
    select.sync();
  });
  return row;
}

type StringSetting = {
  [K in keyof Settings]: Settings[K] extends string ? K : never;
}[keyof Settings];

function createTextRow(
  label: string,
  hint: string,
  key: StringSetting,
  placeholder: string,
  isEnabled: () => boolean = () => true,
): HTMLElement {
  const { row, controls } = createRow(label, hint);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "ll-settings-surface ll-settings-text-input";
  input.placeholder = placeholder;
  input.spellcheck = false;
  input.addEventListener("blur", () => {
    setSetting(key, input.value.trim() as Settings[StringSetting]);
    runSync();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") input.blur();
  });

  controls.appendChild(input);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    input.disabled = !enabled;
    if (document.activeElement !== input) input.value = String(getSettings()[key]);
  });

  return row;
}

function createColorRow(
  label: string,
  hint: string,
  key: StringSetting,
  isEnabled: () => boolean = () => true,
): HTMLElement {
  const { row, controls } = createRow(label, hint);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ll-settings-surface ll-settings-color";

  const swatch = document.createElement("span");
  swatch.className = "ll-settings-color-swatch";

  const value = document.createElement("span");
  value.className = "ll-settings-color-value";

  button.append(swatch, value);
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (openPicker?.anchor === button) {
      closeColorPicker();
      return;
    }
    openColorPicker(button, () => String(getSettings()[key]), (next) => {
      setSetting(key, next as Settings[StringSetting]);
      runSync();
    });
  });

  controls.appendChild(button);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    button.disabled = !enabled;
    const current = normalizeHex(String(getSettings()[key]));
    swatch.style.background = current;
    value.textContent = current.toUpperCase();
  });

  return row;
}

let openPicker: { anchor: HTMLElement; el: HTMLElement; dispose: () => void } | null = null;

function openColorPicker(anchor: HTMLElement, read: () => string, write: (value: string) => void) {
  closeColorPicker();

  const popover = document.createElement("div");
  popover.className = "ll-settings-popover ll-settings-color-picker";

  const saturation = document.createElement("div");
  saturation.className = "ll-color-saturation";
  const satPointer = document.createElement("div");
  satPointer.className = "ll-color-pointer";
  saturation.appendChild(satPointer);

  const hue = document.createElement("div");
  hue.className = "ll-color-hue";
  const huePointer = document.createElement("div");
  huePointer.className = "ll-color-pointer ll-color-hue-pointer";
  hue.appendChild(huePointer);

  const previewRow = document.createElement("div");
  previewRow.className = "ll-color-preview-row";
  const preview = document.createElement("div");
  preview.className = "ll-color-preview";
  const hexInput = document.createElement("input");
  hexInput.type = "text";
  hexInput.className = "ll-settings-surface ll-color-hex";
  hexInput.spellcheck = false;
  previewRow.append(preview, hexInput);

  popover.append(saturation, hue, previewRow);
  getHost().appendChild(popover);

  let hsv = rgbToHsv(hexToRgb(normalizeHex(read())));

  const paint = () => {
    const hex = rgbToHex(hsvToRgb(hsv));
    saturation.style.background = `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${rgbToHex(
      hsvToRgb({ h: hsv.h, s: 1, v: 1 }),
    )})`;
    satPointer.style.left = `${hsv.s * 100}%`;
    satPointer.style.top = `${(1 - hsv.v) * 100}%`;
    huePointer.style.left = `${(hsv.h / 360) * 100}%`;
    preview.style.background = hex;
    if (document.activeElement !== hexInput) hexInput.value = hex.toUpperCase();
    return hex;
  };

  const commit = () => write(paint());

  bindDrag(saturation, (x, y) => {
    hsv = { ...hsv, s: x, v: 1 - y };
    commit();
  });
  bindDrag(hue, (x) => {
    hsv = { ...hsv, h: x * 360 };
    commit();
  });

  hexInput.addEventListener("blur", () => {
    hsv = rgbToHsv(hexToRgb(normalizeHex(hexInput.value)));
    commit();
  });
  hexInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") hexInput.blur();
  });

  paint();

  const rect = anchor.getBoundingClientRect();
  const margin = 6;
  const bounds = document.querySelector<HTMLElement>(".ll-settings-body")?.getBoundingClientRect();
  const height = popover.offsetHeight;
  const width = popover.offsetWidth;
  const minTop = (bounds?.top ?? 0) + margin;
  const maxTop = Math.max(minTop, (bounds?.bottom ?? window.innerHeight) - height - margin);
  const below = rect.bottom + margin + height <= (bounds?.bottom ?? window.innerHeight);
  const preferred = below ? rect.bottom + margin : rect.top - height - margin;

  popover.style.top = `${clamp(preferred, minTop, maxTop)}px`;
  popover.style.left = `${clamp(rect.right - width, margin, Math.max(margin, window.innerWidth - width - margin))}px`;
  popover.classList.toggle("ll-opens-up", !below);
  const unlockScroll = lockSettingsScroll();

  const onOutside = (event: Event) => {
    const target = event.target as Node | null;
    if (target && (popover.contains(target) || anchor.contains(target))) return;
    event.stopPropagation();
    closeColorPicker();
  };
  document.addEventListener("pointerdown", onOutside, true);

  openPicker = {
    anchor,
    el: popover,
    dispose: () => {
      document.removeEventListener("pointerdown", onOutside, true);
      unlockScroll();
      dismissPopup(popover);
    },
  };
}

const POPUP_EXIT_MS = 180;

function lockSettingsScroll(): () => void {
  const body = document.querySelector<HTMLElement>(`#${OVERLAY_ID} .ll-settings-body`);
  if (!body) return () => {};
  const block = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const options = { capture: true, passive: false };
  body.classList.add("ll-dropdown-open");
  body.addEventListener("wheel", block, options);
  body.addEventListener("touchmove", block, options);
  return () => {
    body.classList.remove("ll-dropdown-open");
    body.removeEventListener("wheel", block, options);
    body.removeEventListener("touchmove", block, options);
  };
}

function dismissPopup(el: HTMLElement) {
  el.classList.add("closing");
  window.setTimeout(() => el.remove(), POPUP_EXIT_MS);
}

function closeColorPicker() {
  openPicker?.dispose();
  openPicker = null;
}

function bindDrag(surface: HTMLElement, onMove: (x: number, y: number) => void) {
  const report = (event: PointerEvent) => {
    const rect = surface.getBoundingClientRect();
    onMove(
      clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1),
      clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1),
    );
  };

  surface.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    surface.setPointerCapture?.(event.pointerId);
    report(event);

    const onPointerMove = (moveEvent: PointerEvent) => report(moveEvent);
    const onUp = () => {
      surface.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onUp);
    };
    surface.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onUp, { once: true });
  });
}

function normalizeHex(value: string): string {
  const trimmed = value.trim();
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  if (/^#[0-9a-f]{3}$/i.test(withHash)) {
    return `#${withHash[1]}${withHash[1]}${withHash[2]}${withHash[2]}${withHash[3]}${withHash[3]}`.toLowerCase();
  }
  return /^#[0-9a-f]{6}$/i.test(withHash) ? withHash.toLowerCase() : "#101418";
}

type Rgb = { r: number; g: number; b: number };
type Hsv = { h: number; s: number; v: number };

function hexToRgb(hex: string): Rgb {
  const value = parseInt(hex.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const part = (n: number) => Math.round(clamp(n, 0, 255)).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = 60 * (((gn - bn) / delta) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
    else h = 60 * ((rn - gn) / delta + 4);
  }
  if (h < 0) h += 360;

  return { h, s: max === 0 ? 0 : delta / max, v: max };
}

function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function createFileRow(label: string, hint: string, isEnabled: () => boolean = () => true): HTMLElement {
  const { row, controls } = createRow(label, hint);

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.hidden = true;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ll-settings-surface ll-settings-action-btn";
  button.addEventListener("click", () => input.click());

  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    button.textContent = "Storing...";
    const stored = await storeBackgroundFile(file).catch(() => false);
    input.value = "";
    if (!stored) {
      button.textContent = "Too large — try a smaller image";
      window.setTimeout(runSync, 2600);
      return;
    }
    runSync();
  });

  controls.append(button, input);

  registerSync(() => {
    const enabled = isEnabled();
    row.classList.toggle("is-disabled", !enabled);
    button.disabled = !enabled;
    button.textContent = getBackgroundImage() ? "Replace image" : "Choose image";
  });

  return row;
}

function createStepper(
  range: { min: number; max: number; step: number },
  read: () => number,
  write: (value: number) => void,
) {
  const el = document.createElement("div");
  el.className = "ll-settings-inline";

  const minus = createStepperButton("-", "Decrease");
  const plus = createStepperButton("+", "Increase");

  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "ll-settings-surface ll-settings-number-input";

  el.append(minus, input, plus);

  const commit = (value: number) => write(clamp(Math.round(value), range.min, range.max));

  minus.addEventListener("click", () => commit(read() - range.step));
  plus.addEventListener("click", () => commit(read() + range.step));

  input.addEventListener("blur", () => {
    const parsed = parseInt(input.value, 10);
    if (Number.isFinite(parsed)) commit(parsed);
    else sync();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") input.blur();
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      commit(read() + range.step);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      commit(read() - range.step);
    }
  });

  const sync = () => {
    const value = read();
    if (document.activeElement !== input) input.value = String(value);
    minus.disabled = minus.dataset.forcedDisabled === "true" || value <= range.min;
    plus.disabled = plus.dataset.forcedDisabled === "true" || value >= range.max;
  };

  const setEnabled = (enabled: boolean) => {
    input.disabled = !enabled;
    minus.dataset.forcedDisabled = String(!enabled);
    plus.dataset.forcedDisabled = String(!enabled);
  };

  sync();
  return { el, sync, setEnabled };
}

function createStepperButton(glyph: string, label: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "ll-settings-surface ll-settings-stepper-btn";
  button.textContent = glyph;
  button.setAttribute("aria-label", label);
  return button;
}

let openSelect: { button: HTMLElement; menu: HTMLElement; dispose: () => void } | null = null;

function createSelect<T extends string>(
  options: Array<{ value: T; label: string }>,
  read: () => T,
  write: (value: T) => void,
) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "ll-settings-surface ll-settings-select";
  el.innerHTML = '<span class="ll-settings-select-label"></span><span class="ll-settings-select-chevron"></span>';

  const labelEl = el.querySelector<HTMLElement>(".ll-settings-select-label")!;

  const sync = () => {
    const current = read();
    labelEl.textContent = options.find((option) => option.value === current)?.label ?? String(current);
  };

  el.addEventListener("click", (event) => {
    event.stopPropagation();
    if (openSelect?.button === el) {
      closeSelectMenu();
      return;
    }
    openSelectMenu(el, options, read(), (value) => {
      write(value);
      sync();
    });
  });

  sync();
  return { el, sync };
}

function openSelectMenu<T extends string>(
  button: HTMLElement,
  options: Array<{ value: T; label: string }>,
  current: T,
  onPick: (value: T) => void,
) {
  closeSelectMenu();

  const menu = document.createElement("div");
  menu.className = "ll-settings-select-menu";

  options.forEach((option, index) => {
    const item = document.createElement("div");
    item.className = "ll-settings-select-item";
    item.style.setProperty("--i", String(Math.min(index, 12)));
    item.setAttribute("role", "option");
    item.textContent = option.label;
    item.classList.toggle("is-selected", option.value === current);
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      closeSelectMenu();
      onPick(option.value);
    });
    menu.appendChild(item);
  });

  getHost().appendChild(menu);
  button.classList.add("isOpen");

  const rect = button.getBoundingClientRect();
  const margin = 6;
  menu.style.minWidth = `${rect.width}px`;

  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  const bounds = document.querySelector<HTMLElement>(".ll-settings-body")?.getBoundingClientRect();
  const minTop = (bounds?.top ?? 0) + margin;
  const maxTop = Math.max(minTop, (bounds?.bottom ?? window.innerHeight) - height - margin);

  const below = rect.bottom + margin + height <= (bounds?.bottom ?? window.innerHeight);
  const preferred = below ? rect.bottom + margin : rect.top - height - margin;

  menu.style.top = `${clamp(preferred, minTop, maxTop)}px`;
  menu.style.left = `${clamp(rect.right - width, margin, Math.max(margin, window.innerWidth - width - margin))}px`;
  menu.classList.toggle("ll-opens-up", !below);
  const unlockScroll = lockSettingsScroll();

  const onOutside = (event: Event) => {
    const target = event.target as Node | null;
    if (target && (menu.contains(target) || button.contains(target))) return;
    event.stopPropagation();
    closeSelectMenu();
  };
  document.addEventListener("pointerdown", onOutside, true);

  openSelect = {
    button,
    menu,
    dispose: () => {
      document.removeEventListener("pointerdown", onOutside, true);
      button.classList.remove("isOpen");
      unlockScroll();
      dismissPopup(menu);
    },
  };
}

function closeSelectMenu() {
  openSelect?.dispose();
  openSelect = null;
}

export function registerSettingsMenuItem() {
  try {
    (window as any).SpotiKit?.ProfileMenu?.add({
      label: "Liquid Lyrics Settings",
      icon: CONTEXT_MENU_ICON,
      onSelect: () => openSettingsMenu(),
    });
  } catch {
  }
}

function registerSync(sync: () => void) {
  syncControls.push(sync);
  sync();
}

function runSync() {
  for (const sync of syncControls) sync();
  refreshGroupVisibility();
}

function refreshGroupVisibility() {
  document.querySelectorAll<HTMLElement>(`#${OVERLAY_ID} .ll-settings-subsection`).forEach((sub) => {
    const hasRow = Array.from(sub.querySelectorAll<HTMLElement>(".ll-settings-row")).some(
      (row) => !row.classList.contains("is-hidden") && row.style.display !== "none",
    );
    sub.style.display = hasRow ? "" : "none";
  });
}
