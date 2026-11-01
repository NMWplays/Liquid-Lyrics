import type { EditorBackground, EditorDraft, EditorLine, StoredSync, SyncMode } from "@/lib/customSync/types";
import {
  createDraft,
  draftToLyrics,
  isDraftFullySynced,
  lyricsToDraft,
  type TrackMeta,
} from "@/lib/customSync/convert";
import { linesToText, parseText } from "@/lib/customSync/parse";
import { lrcToDraft, textToDraft } from "@/lib/customSync/importers";
import {
  deleteCustomSync,
  getCustomSync,
  hasCustomSync,
  normalizeTrackId,
  parseImportedSync,
  saveCustomSync,
} from "@/lib/customSync/store";
import { getLyrics } from "@/lib/api/lyrics";
import { scrollOffsetFor } from "@/lib/dom/scroll";
import {
  getPlayerProgress,
  getTrackDuration,
  isPlayerPlaying,
  pausePlayback,
  seekTo,
  togglePlayback,
} from "@/ui/lyrics/playback";
import { subscribeClock } from "@/ui/lyrics/clock";
import { LyricsView } from "@/ui/lyrics/view";
import { registerTooltip } from "@/ui/tooltip";
import { currentItem, currentUri, notify as showNotification, onPlayer, player, windowControlsStrip } from "@/lib/spotikit";

const OVERLAY_ID = "liquid-lyrics-editor";
export const EDITOR_VISIBILITY_EVENT = "liquid-lyrics:editor-visibility";
const NUDGE_MS = 100;
const NUDGE_MS_LARGE = 300;
const LOOP_END_ZONE_MS = 3000;
const LOOP_START_ZONE_MS = 3000;
const SEEK_SUPPRESS_MS = 900;
const END_STOP_MS = 250;
const PREVIEW_LEAD_MS = 500;
const WORD_PREVIEW_LEAD_MS = 180;
const CONTROLS_GAP_PX = 16;

type Stage = "text" | "sync" | "preview";

type TapTarget =
  | { kind: "line"; lineIndex: number }
  | { kind: "token"; lineIndex: number; tokenIndex: number }
  | { kind: "lineEnd"; lineIndex: number }
  | { kind: "bgToken"; lineIndex: number; bgIndex: number; tokenIndex: number }
  | { kind: "bgEnd"; lineIndex: number; bgIndex: number }
  | { kind: "end" };

const ICONS = {
  close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.6 12 8 5.6Z" fill="currentColor" stroke="none"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M7.5 5h3v14h-3z" fill="currentColor" stroke="none"/><path d="M13.5 5h3v14h-3z" fill="currentColor" stroke="none"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
  chevronsLeft: '<svg viewBox="0 0 24 24"><path d="m17 6-6 6 6 6"/><path d="m11 6-6 6 6 6"/></svg>',
  chevronsRight: '<svg viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',
  jump: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',
  finish: '<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4.5h11l-2 3 2 3H5"/></svg>',
  clear: '<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7"/><path d="M8 20v-6h8v6"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none"/></svg>',
} as const;

let editor: LyricsEditor | null = null;

export function openEditor(): void {
  editor ??= new LyricsEditor();
  void editor.open();
}

export function isEditorOpen(): boolean {
  return Boolean(editor?.isOpen());
}

class LyricsEditor {
  private overlay: HTMLElement | null = null;
  private draft: EditorDraft = createDraft(emptyMeta(), "line");
  private stage: Stage = "text";
  private targets: TapTarget[] = [];
  private cursor = 0;
  private previewView: LyricsView | null = null;
  private unsubscribeClock: (() => void) | null = null;
  private currentRowEl: HTMLElement | null = null;
  private fileInput: HTMLInputElement | null = null;
  private savedSignature = "";
  private dragging = false;
  private prevRepeat: string | null = null;
  private offSongChange: (() => void) | null = null;
  private prevProgress = 0;
  private suppressLoopUntil = 0;
  private suppressFillUntil = 0;
  private confirmResolve: ((result: boolean) => void) | null = null;
  private confirmOverlay: HTMLElement | null = null;

  private refs: {
    songLabel: HTMLElement;
    modeButtons: HTMLButtonElement[];
    stepButtons: HTMLButtonElement[];
    body: HTMLElement;
    transport: HTMLElement;
    playBtn: HTMLButtonElement;
    seekFill: HTMLElement;
    seekTrack: HTMLElement;
    curTime: HTMLElement;
    durTime: HTMLElement;
    menu: HTMLElement;
    deleteItem: HTMLButtonElement;
  } | null = null;

  isOpen(): boolean {
    return this.overlay?.classList.contains("visible") ?? false;
  }

  async open(): Promise<void> {
    const meta = readTrackMeta();
    if (!meta.trackId) {
      notify("No song playing - start a song to create a sync.");
      return;
    }

    this.draft = await this.loadDraft(meta);
    this.savedSignature = signature(this.draft);
    this.build();
    this.rebuildTargets();

    const startStage: Stage = this.draft.lines.length === 0
      ? "text"
      : isDraftFullySynced(this.draft)
        ? "preview"
        : "sync";
    this.setStage(startStage);
    this.show();
  }

  private async loadDraft(meta: TrackMeta): Promise<EditorDraft> {
    const existing = getCustomSync(meta.trackUri);
    if (existing) {
      return { ...existing.draft, durationMs: meta.durationMs || existing.draft.durationMs };
    }

    try {
      const result = await getLyrics({ id: meta.trackId, uri: meta.trackUri, data: { name: meta.title } });
      if (result.status === "success" && result.data) {
        return lyricsToDraft(result.data, meta);
      }
    } catch {
    }
    return createDraft(meta, "line");
  }

private build(): void {
    document.getElementById(OVERLAY_ID)?.remove();

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.className = "liquid-lyrics-editor";

    const glass = h("div", "ll-editor-glass-bg");
    const shell = h("div", "ll-editor-shell");

    const header = h("header", "ll-editor-header");

    const titleGroup = h("div", "ll-editor-title-group");
    const title = h("h2", "ll-editor-title");
    title.textContent = "Sync Editor";
    const songLabel = h("div", "ll-editor-song");
    songLabel.textContent = `${this.draft.title} - ${this.draft.artist}`;
    titleGroup.append(title, songLabel);

    const modeSwitch = h("div", "ll-editor-mode-switch");
    const modeButtons = (["line", "word"] as SyncMode[]).map((mode) => {
      const btn = h("button", "ll-editor-mode-btn") as HTMLButtonElement;
      btn.type = "button";
      btn.dataset.mode = mode;
      btn.textContent = mode === "line" ? "Block" : "Karaoke";
      btn.addEventListener("click", () => this.setMode(mode));
      modeSwitch.appendChild(btn);
      return btn;
    });

    const actions = h("div", "ll-editor-header-actions");
    const menuWrap = h("div", "ll-editor-menu-wrap");
    const menuBtn = iconButton("ll-editor-icon-btn", ICONS.menu, "More");
    const menu = h("div", "ll-editor-menu");
    const deleteItem = this.buildMenu(menu);
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      menu.classList.toggle("open");
    });
    menuWrap.append(menuBtn, menu);

    const saveBtn = h("button", "ll-editor-save-btn") as HTMLButtonElement;
    saveBtn.type = "button";
    saveBtn.innerHTML = `${ICONS.save}<span class="ll-editor-btn-label">Save</span>`;
    saveBtn.setAttribute("aria-label", "Save on this device");
    registerTooltip(saveBtn, "Save this sync on your device");
    saveBtn.addEventListener("click", () => this.save());

    const closeBtn = iconButton("ll-editor-icon-btn", ICONS.close, "Close");
    closeBtn.addEventListener("click", () => this.requestClose());

    actions.append(menuWrap, saveBtn, closeBtn);
    header.append(titleGroup, modeSwitch, actions);

    const steps = h("nav", "ll-editor-steps");
    const stepDefs: { stage: Stage; label: string }[] = [
      { stage: "text", label: "1 · Text" },
      { stage: "sync", label: "2 · Sync" },
      { stage: "preview", label: "3 · Preview" },
    ];
    const stepButtons = stepDefs.map(({ stage, label }) => {
      const btn = h("button", "ll-editor-step-btn") as HTMLButtonElement;
      btn.type = "button";
      btn.dataset.stage = stage;
      btn.textContent = label;
      btn.addEventListener("click", () => this.setStage(stage));
      steps.appendChild(btn);
      return btn;
    });

    const body = h("div", "ll-editor-body");
    const transport = this.buildTransport();

    shell.append(header, steps, body, transport.el);

    const transparentControls = h("div", "liquid-lyrics-transparent-controls");
    transparentControls.setAttribute("aria-hidden", "true");
    const { width: tcWidth, height: tcHeight } = readControlsStrip();
    overlay.style.setProperty("--ll-transparent-controls-width", `${tcWidth}px`);
    overlay.style.setProperty("--ll-transparent-controls-height", `${tcHeight}px`);

    overlay.append(glass, transparentControls, shell);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => menu.classList.remove("open"));

    this.overlay = overlay;
    this.refs = {
      songLabel,
      modeButtons,
      stepButtons,
      body,
      transport: transport.el,
      playBtn: transport.playBtn,
      seekFill: transport.fill,
      seekTrack: transport.track,
      curTime: transport.cur,
      durTime: transport.dur,
      menu,
      deleteItem,
    };

    this.updateModeButtons();
    this.bindSeek();
    this.updateControlsInset();
  }

  private updateControlsInset(): void {
    const overlay = this.overlay;
    const shell = overlay?.querySelector<HTMLElement>(".ll-editor-shell");
    const header = overlay?.querySelector<HTMLElement>(".ll-editor-header");
    if (!overlay || !shell || !header) return;

    const strip = readControlsStrip();
    const shellRect = shell.getBoundingClientRect();
    const headerTop = shellRect.top + parseFloat(getComputedStyle(shell).paddingTop || "0");
    const clearsStrip = headerTop >= strip.height + CONTROLS_GAP_PX;
    const overlapPx = shellRect.right - (window.innerWidth - strip.width) + CONTROLS_GAP_PX;
    const inset = clearsStrip ? 0 : Math.max(0, Math.round(overlapPx));
    overlay.style.setProperty("--ll-editor-controls-inset", `${inset}px`);
  }

  private bindSeek(): void {
    const refs = this.refs;
    if (!refs) return;
    const track = refs.seekTrack;

    const ratioFromEvent = (event: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      return Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(1, rect.width)));
    };
    const preview = (ratio: number) => {
      refs.seekFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
      const duration = getTrackDuration();
      if (duration > 0) refs.curTime.textContent = formatClock(duration * ratio);
    };

    track.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.dragging = true;
      track.setPointerCapture?.(event.pointerId);
      preview(ratioFromEvent(event));

      const onMove = (moveEvent: PointerEvent) => preview(ratioFromEvent(moveEvent));
      const onUp = (upEvent: PointerEvent) => {
        this.dragging = false;
        track.releasePointerCapture?.(upEvent.pointerId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        const duration = getTrackDuration();
        if (duration > 0) {
          const ms = duration * ratioFromEvent(upEvent);
          this.seek(ms);
          if (this.stage === "sync") this.moveCursorToTime(ms);
        }
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    });
  }

  private buildMenu(menu: HTMLElement): HTMLButtonElement {
    const importItem = menuItem("Import file (.lrc / .txt / .json)");
    importItem.addEventListener("click", () => this.pickFile());

    const exportItem = menuItem("Export as file (.json)");
    exportItem.addEventListener("click", () => this.exportFile());

    const deleteItem = menuItem("Delete saved sync");
    deleteItem.classList.add("ll-editor-menu-danger");
    deleteItem.addEventListener("click", () => void this.deleteSaved());

    menu.append(importItem, exportItem, deleteItem);
    return deleteItem;
  }

  private buildTransport(): {
    el: HTMLElement;
    playBtn: HTMLButtonElement;
    track: HTMLElement;
    fill: HTMLElement;
    cur: HTMLElement;
    dur: HTMLElement;
  } {
    const el = h("footer", "ll-editor-transport");

    const playBtn = iconButton("ll-editor-play-btn", ICONS.play, "Play/Pause");
    playBtn.addEventListener("click", () => this.togglePlayback());

    const cur = h("span", "ll-editor-time ll-editor-time-cur");
    cur.textContent = "0:00";
    const dur = h("span", "ll-editor-time ll-editor-time-dur");
    dur.textContent = "0:00";

    const track = h("div", "ll-editor-seek-track");
    const bar = h("div", "ll-editor-seek-bar");
    const fill = h("div", "ll-editor-seek-fill");
    bar.appendChild(fill);
    track.appendChild(bar);

    el.append(playBtn, cur, track, dur);
    return { el, playBtn, track, fill, cur, dur };
  }

  private onViewportResize = (): void => this.updateControlsInset();

  private show(): void {
    if (!this.overlay) return;
    this.overlay.classList.add("visible");
    window.addEventListener("resize", this.onViewportResize);
    this.updateControlsInset();
    window.addEventListener("keydown", this.onKeyDown, true);
    this.offSongChange = onPlayer("track", this.onSongChangeGuard);
    this.prevRepeat = getRepeatSafe();
    setRepeatSafe("track");
    this.prevProgress = 0;
    this.unsubscribeClock ??= subscribeClock(this.onTick);
    window.dispatchEvent(new Event(EDITOR_VISIBILITY_EVENT));
  }

  private close(): void {
    window.removeEventListener("keydown", this.onKeyDown, true);
    window.removeEventListener("resize", this.onViewportResize);
    this.offSongChange?.();
    this.offSongChange = null;
    if (this.prevRepeat != null) setRepeatSafe(this.prevRepeat);
    this.prevRepeat = null;
    this.unsubscribeClock?.();
    this.unsubscribeClock = null;
    this.previewView?.destroy();
    this.previewView = null;
    this.overlay?.classList.remove("visible");
    this.overlay?.remove();
    this.overlay = null;
    this.refs = null;
    window.dispatchEvent(new Event(EDITOR_VISIBILITY_EVENT));
  }

  private onSongChangeGuard = (): void => {
    const uri = currentUri();
    if (uri && uri !== this.draft.trackUri) pausePlayback();
  };

  private async requestClose(): Promise<void> {
    if (this.confirmResolve) return;
    if (this.isDirty()) {
      const ok = await this.showConfirm({
        title: "Discard changes?",
        message: "You have unsaved changes. Closing the editor will lose them.",
        confirm: "Discard",
        cancel: "Keep editing",
        danger: true,
      });
      if (!ok) return;
    }
    this.close();
  }

  private togglePlayback(): void {
    if (!isPlayerPlaying()) {
      const duration = getTrackDuration();
      if (duration > 0 && getPlayerProgress() >= duration - 500) this.seek(0);
    }
    togglePlay();
  }

  private seek(ms: number): void {
    const now = performance.now();
    this.suppressLoopUntil = now + SEEK_SUPPRESS_MS;
    this.suppressFillUntil = now + 320;
    if (this.refs) {
      const duration = getTrackDuration();
      const ratio = duration > 0 ? Math.min(1, Math.max(0, ms / duration)) : 0;
      this.refs.seekFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
      this.refs.curTime.textContent = formatClock(ms);
    }
    seekTo(ms);
  }

  private isDirty(): boolean {
    return signature(this.draft) !== this.savedSignature;
  }

  private showConfirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      const overlay = h("div", "ll-editor-confirm");
      const dialog = h("div", "ll-editor-confirm-dialog");

      const title = h("h3", "ll-editor-confirm-title");
      title.textContent = options.title;
      const message = h("p", "ll-editor-confirm-message");
      message.textContent = options.message;

      const actions = h("div", "ll-editor-confirm-actions");
      const cancelBtn = h("button", "ll-editor-confirm-btn ll-editor-confirm-cancel") as HTMLButtonElement;
      cancelBtn.type = "button";
      cancelBtn.textContent = options.cancel;
      const confirmBtn = h("button", "ll-editor-confirm-btn ll-editor-confirm-accept") as HTMLButtonElement;
      confirmBtn.type = "button";
      confirmBtn.textContent = options.confirm;
      confirmBtn.classList.toggle("ll-editor-confirm-danger", Boolean(options.danger));
      actions.append(cancelBtn, confirmBtn);

      dialog.append(title, message, actions);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add("visible"));

      cancelBtn.addEventListener("click", () => this.resolveConfirm(false));
      confirmBtn.addEventListener("click", () => this.resolveConfirm(true));
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) this.resolveConfirm(false);
      });

      this.confirmOverlay = overlay;
      this.confirmResolve = resolve;
      confirmBtn.focus();
    });
  }

  private resolveConfirm(result: boolean): void {
    const resolve = this.confirmResolve;
    const overlay = this.confirmOverlay;
    this.confirmResolve = null;
    this.confirmOverlay = null;
    if (overlay) {
      overlay.classList.remove("visible");
      setTimeout(() => overlay.remove(), 200);
    }
    resolve?.(result);
  }

private setStage(stage: Stage): void {
    if (this.stage === "text" && stage !== "text") this.commitText();

    this.stage = stage;
    this.refs?.stepButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.stage === stage));

    if (this.previewView) {
      this.previewView.setEnabled(stage === "preview");
    }

    if (!this.refs) return;
    this.refs.body.replaceChildren();

    if (stage === "text") this.renderTextStage();
    else if (stage === "sync") this.renderSyncStage();
    else this.renderPreviewStage();
  }

  private setMode(mode: SyncMode): void {
    if (this.draft.mode === mode) return;
    this.draft.mode = mode;
    this.updateModeButtons();
    this.rebuildTargets();
    if (this.stage === "sync") {
      this.refs?.body.replaceChildren();
      this.renderSyncStage();
    } else if (this.stage === "preview") {
      this.refreshPreview();
    }
  }

  private updateModeButtons(): void {
    this.refs?.modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === this.draft.mode));
  }

private renderTextStage(): void {
    if (!this.refs) return;
    const stage = h("div", "ll-editor-text-stage");

    const hint = h("div", "ll-editor-hint");
    hint.innerHTML =
      "One line per lyric line. Blank line = separator. " +
      "Put <b>#interlude</b> on its own line to add an instrumental interlude. " +
      "Wrap a line in <b>[ ]</b> to make it a background sub-lyric of the line above (karaoke). " +
      "Long pauses are detected as interludes automatically.";

    const textarea = h("textarea", "ll-editor-textarea") as HTMLTextAreaElement;
    textarea.spellcheck = false;
    textarea.placeholder = "Paste or type the song's lyrics here - one line per lyric line.";
    textarea.value = linesToText(this.draft.lines);
    textarea.addEventListener("input", () => this.updateTextStats(textarea.value, stats));

    const creditRow = h("label", "ll-editor-credit-row");
    const creditLabel = h("span", "ll-editor-credit-label");
    creditLabel.textContent = "Credit";
    const creditInput = h("input", "ll-editor-credit-input") as HTMLInputElement;
    creditInput.type = "text";
    creditInput.maxLength = 60;
    creditInput.placeholder = "Optional - your name/handle, shown as “Synced by …” under the lyrics";
    creditInput.value = this.draft.credit ?? "";
    creditInput.addEventListener("input", () => {
      this.draft.credit = creditInput.value;
      this.draft.updatedAt = Date.now();
    });
    creditRow.append(creditLabel, creditInput);

    const footer = h("div", "ll-editor-text-footer");
    const stats = h("div", "ll-editor-text-stats");
    const next = h("button", "ll-editor-primary-btn") as HTMLButtonElement;
    next.type = "button";
    next.textContent = "Continue to sync →";
    next.addEventListener("click", () => this.setStage("sync"));
    footer.append(stats, next);

    stage.append(hint, textarea, creditRow, footer);
    this.refs.body.appendChild(stage);
    this.updateTextStats(textarea.value, stats);
    textarea.focus();
  }

  private updateTextStats(text: string, stats: HTMLElement): void {
    const lines = parseText(text);
    const lyrics = lines.filter((line) => line.kind === "lyric").length;
    const interludes = lines.filter((line) => line.kind === "interlude").length;
    stats.textContent = `${lyrics} lines · ${interludes} interludes`;
  }

  private commitText(): void {
    const textarea = this.overlay?.querySelector<HTMLTextAreaElement>(".ll-editor-textarea");
    if (!textarea) return;

    const parsed = parseText(textarea.value);
    this.draft.lines = carryTimings(this.draft.lines, parsed);
    this.draft.updatedAt = Date.now();
    this.rebuildTargets();
  }

private renderSyncStage(): void {
    if (!this.refs) return;
    const stage = h("div", "ll-editor-sync-stage");

    const bar = h("div", "ll-editor-sync-bar");
    const setBtn = h("button", "ll-editor-tap-btn") as HTMLButtonElement;
    setBtn.type = "button";
    setBtn.innerHTML = "<b>Set cue</b><span>Right Alt</span>";
    setBtn.addEventListener("click", () => this.tap());

    const hint = h("div", "ll-editor-sync-hint");
    hint.innerHTML =
      "Play and tap to the beat. <b>Right Alt</b> sets the next cue · " +
      "<b>⌫</b> back · <b>←/→</b> ±100 ms (Shift ±300) · <b>Del</b> clear.";

    const status = h("div", "ll-editor-sync-status");
    bar.append(setBtn, hint, this.buildOffsetGroup(), status);

    const list = h("div", "ll-editor-lines");

    stage.append(bar, list);
    this.refs.body.appendChild(stage);
    this.renderSyncList();
  }

  private renderSyncList(scroll = true): void {
    const list = this.overlay?.querySelector<HTMLElement>(".ll-editor-lines");
    if (!list) return;

    const keepScrollTop = scroll ? null : list.scrollTop;
    list.replaceChildren();
    this.currentRowEl = null;
    const current = this.targets[this.cursor];
    const currentLineIndex = current && current.kind !== "end" ? current.lineIndex : -1;

    this.draft.lines.forEach((line, lineIndex) => {
      const row = h("div", "ll-editor-line");
      row.dataset.lineIndex = String(lineIndex);
      const isInterlude = line.kind === "interlude";
      row.classList.toggle("is-interlude", isInterlude);
      row.classList.toggle("is-synced", line.start != null);

      const isCurrentLine =
        currentLineIndex === lineIndex && (current?.kind === "line" || this.draft.mode === "word");
      if (current?.kind === "line" && currentLineIndex === lineIndex) {
        row.classList.add("is-current");
        this.currentRowEl = row;
      }

      const index = h("div", "ll-editor-line-index");
      index.innerHTML = isInterlude ? ICONS.note : String(countLyricsUpTo(this.draft.lines, lineIndex));

      const main = h("div", "ll-editor-line-main");
      if (isInterlude) {
        main.textContent = "Interlude";
        main.classList.add("ll-editor-line-interlude-text");
      } else if (this.draft.mode === "word") {
        main.appendChild(this.buildTokenRow(line, lineIndex, current));
      } else {
        main.textContent = line.text;
      }

      const time = h("div", "ll-editor-line-time");
      time.textContent = formatMs(line.start);

      const controls = h("div", "ll-editor-line-controls");
      controls.append(
        lineControl(ICONS.chevronsLeft, "−300 ms", () => this.nudgeLine(lineIndex, -NUDGE_MS_LARGE)),
        lineControl(ICONS.chevronLeft, "−100 ms", () => this.nudgeLine(lineIndex, -NUDGE_MS)),
        lineControl(ICONS.chevronRight, "+100 ms", () => this.nudgeLine(lineIndex, NUDGE_MS)),
        lineControl(ICONS.chevronsRight, "+300 ms", () => this.nudgeLine(lineIndex, NUDGE_MS_LARGE)),
        lineControl(ICONS.jump, "Play from here", () => this.jumpToLine(lineIndex)),
        lineControl(ICONS.clear, "Clear timing", () => this.clearLine(lineIndex)),
      );

      row.append(index, main, time, controls);
      row.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).closest(".ll-editor-line-controls, .ll-editor-token")) return;
        this.selectLine(lineIndex);
      });

      if (isCurrentLine && this.draft.mode === "word" && !this.currentRowEl) {
        this.currentRowEl = row;
      }

      list.appendChild(row);
    });

    this.renderEndRow(list, current);
    this.updateSyncStatus();
    if (scroll) this.scrollCurrentIntoView();
    else if (keepScrollTop != null) list.scrollTop = keepScrollTop;
  }

  private renderEndRow(list: HTMLElement, current: TapTarget | undefined): void {
    const endIndex = this.targets.findIndex((target) => target.kind === "end");
    if (endIndex < 0) return;

    const row = h("div", "ll-editor-line ll-editor-end-row");
    row.classList.toggle("is-synced", this.draft.endMs != null);
    if (current?.kind === "end") {
      row.classList.add("is-current");
      this.currentRowEl = row;
    }

    const index = h("div", "ll-editor-line-index");
    index.innerHTML = ICONS.finish;

    const main = h("div", "ll-editor-line-main ll-editor-line-interlude-text");
    main.textContent = "End of lyrics";

    const time = h("div", "ll-editor-line-time");
    time.textContent = formatMs(this.draft.endMs);

    const controls = h("div", "ll-editor-line-controls");
    controls.append(
      lineControl(ICONS.chevronsLeft, "−300 ms", () => this.nudgeEnd(-NUDGE_MS_LARGE)),
      lineControl(ICONS.chevronLeft, "−100 ms", () => this.nudgeEnd(-NUDGE_MS)),
      lineControl(ICONS.chevronRight, "+100 ms", () => this.nudgeEnd(NUDGE_MS)),
      lineControl(ICONS.chevronsRight, "+300 ms", () => this.nudgeEnd(NUDGE_MS_LARGE)),
      lineControl(ICONS.jump, "Play from here", () => this.jumpEnd()),
      lineControl(ICONS.clear, "Clear end", () => this.clearEnd()),
    );

    row.append(index, main, time, controls);
    row.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).closest(".ll-editor-line-controls")) return;
      this.cursor = endIndex;
      if (this.draft.endMs != null) this.seek(this.draft.endMs);
      this.renderSyncList(false);
    });

    list.appendChild(row);
  }

  private buildTokenRow(line: EditorLine, lineIndex: number, current: TapTarget | undefined): HTMLElement {
    const block = h("div", "ll-editor-token-block");
    if (line.kind !== "lyric") return block;

    const leadRow = h("div", "ll-editor-tokens");
    line.tokens.forEach((token, tokenIndex) => {
      const isCurrent =
        current?.kind === "token" && current.lineIndex === lineIndex && current.tokenIndex === tokenIndex;
      leadRow.appendChild(
        this.tokenChip(token.text, token.start != null, isCurrent, () => this.selectToken(lineIndex, tokenIndex)),
      );
    });
    leadRow.appendChild(
      this.endChip(
        line.end != null,
        current?.kind === "lineEnd" && current.lineIndex === lineIndex,
        "Line end",
        () => this.selectLineEnd(lineIndex),
      ),
    );
    block.appendChild(leadRow);

    line.backgrounds.forEach((background, bgIndex) => {
      const bgRow = h("div", "ll-editor-tokens ll-editor-bg-tokens");
      background.tokens.forEach((token, tokenIndex) => {
        const isCurrent =
          current?.kind === "bgToken" &&
          current.lineIndex === lineIndex &&
          current.bgIndex === bgIndex &&
          current.tokenIndex === tokenIndex;
        bgRow.appendChild(
          this.tokenChip(token.text, token.start != null, isCurrent, () =>
            this.selectBgToken(lineIndex, bgIndex, tokenIndex),
          ),
        );
      });
      bgRow.appendChild(
        this.endChip(
          background.end != null,
          current?.kind === "bgEnd" && current.lineIndex === lineIndex && current.bgIndex === bgIndex,
          "Sub-lyric end",
          () => this.selectBgEnd(lineIndex, bgIndex),
        ),
      );
      block.appendChild(bgRow);
    });

    return block;
  }

  private tokenChip(text: string, synced: boolean, current: boolean, onSelect: () => void): HTMLElement {
    const chip = h("span", "ll-editor-token") as HTMLElement;
    chip.textContent = text;
    chip.classList.toggle("is-synced", synced);
    if (current) chip.classList.add("is-current");
    chip.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelect();
    });
    return chip;
  }

  private endChip(synced: boolean, current: boolean, label: string, onSelect: () => void): HTMLElement {
    const chip = h("span", "ll-editor-token ll-editor-lineend-chip") as HTMLElement;
    chip.innerHTML = ICONS.finish;
    chip.setAttribute("aria-label", label);
    registerTooltip(chip, label);
    chip.classList.toggle("is-synced", synced);
    if (current) chip.classList.add("is-current");
    chip.addEventListener("click", (event) => {
      event.stopPropagation();
      onSelect();
    });
    return chip;
  }

  private selectLineEnd(lineIndex: number): void {
    const index = this.targets.findIndex((target) => target.kind === "lineEnd" && target.lineIndex === lineIndex);
    if (index < 0) return;
    this.cursor = index;
    this.renderSyncList(false);
    const line = this.draft.lines[lineIndex];
    if (line?.kind === "lyric" && line.end != null) this.previewTime(line.end, WORD_PREVIEW_LEAD_MS);
  }

  private selectBgToken(lineIndex: number, bgIndex: number, tokenIndex: number): void {
    const index = this.targets.findIndex(
      (target) =>
        target.kind === "bgToken" &&
        target.lineIndex === lineIndex &&
        target.bgIndex === bgIndex &&
        target.tokenIndex === tokenIndex,
    );
    if (index < 0) return;
    this.cursor = index;
    this.renderSyncList(false);
    const token = this.backgroundAt(lineIndex, bgIndex)?.tokens[tokenIndex];
    if (token?.start != null) this.previewTime(token.start, WORD_PREVIEW_LEAD_MS);
  }

  private selectBgEnd(lineIndex: number, bgIndex: number): void {
    const index = this.targets.findIndex(
      (target) => target.kind === "bgEnd" && target.lineIndex === lineIndex && target.bgIndex === bgIndex,
    );
    if (index < 0) return;
    this.cursor = index;
    this.renderSyncList(false);
    const background = this.backgroundAt(lineIndex, bgIndex);
    if (background?.end != null) this.previewTime(background.end, WORD_PREVIEW_LEAD_MS);
  }

  private backgroundAt(lineIndex: number, bgIndex: number): EditorBackground | undefined {
    const line = this.draft.lines[lineIndex];
    return line?.kind === "lyric" ? line.backgrounds[bgIndex] : undefined;
  }

  private updateSyncStatus(): void {
    const status = this.overlay?.querySelector<HTMLElement>(".ll-editor-sync-status");
    if (!status) return;
    const total = this.targets.length;
    const done = this.targets.filter((target) => this.targetTime(target) != null).length;
    status.textContent = `${done}/${total} synced`;
  }

  private scrollCurrentIntoView(): void {
    const row = this.currentRowEl;
    const list = this.overlay?.querySelector<HTMLElement>(".ll-editor-lines");
    if (!row || !list) return;

    const top = scrollOffsetFor(list, row, "center");
    if (top === null) return;
    list.scrollTo({ top, behavior: "smooth" });
  }

private tap(): void {
    const target = this.targets[this.cursor];
    if (!target) return;
    this.setTargetTime(target, Math.round(getPlayerProgress()));
    this.cursor += 1;
    this.afterSyncChange();
  }

  private undo(): void {
    if (this.cursor > 0) this.cursor -= 1;
    const target = this.targets[this.cursor];
    if (target) this.clearTargetTime(target);
    this.afterSyncChange();
  }

  private buildOffsetGroup(): HTMLElement {
    const group = h("div", "ll-editor-offset-group");
    const label = h("span", "ll-editor-offset-label");
    label.textContent = "Shift all";
    const steps: { icon: string; delta: number }[] = [
      { icon: ICONS.chevronsLeft, delta: -NUDGE_MS_LARGE },
      { icon: ICONS.chevronLeft, delta: -NUDGE_MS },
      { icon: ICONS.chevronRight, delta: NUDGE_MS },
      { icon: ICONS.chevronsRight, delta: NUDGE_MS_LARGE },
    ];
    group.append(
      label,
      ...steps.map(({ icon, delta }) =>
        lineControl(icon, `Shift every timing ${delta > 0 ? "+" : "-"}${Math.abs(delta)} ms`, () =>
          this.shiftAll(delta),
        ),
      ),
    );
    return group;
  }

  private shiftAll(delta: number): void {
    const times = this.targets
      .map((target) => this.targetTime(target))
      .filter((time): time is number => time != null);
    if (times.length === 0) {
      notify("Nothing is synced yet - nothing to shift.");
      return;
    }

    let clamped = 0;
    const shift = (value: number): number => {
      const next = value + delta;
      if (next < 0) clamped++;
      return Math.max(0, next);
    };

    for (const line of this.draft.lines) {
      if (line.start != null) line.start = shift(line.start);
      if (line.kind !== "lyric") continue;
      if (line.end != null) line.end = shift(line.end);
      for (const token of line.tokens) if (token.start != null) token.start = shift(token.start);
      for (const background of line.backgrounds) {
        if (background.start != null) background.start = shift(background.start);
        if (background.end != null) background.end = shift(background.end);
        for (const token of background.tokens) if (token.start != null) token.start = shift(token.start);
      }
    }
    if (this.draft.endMs != null) this.draft.endMs = shift(this.draft.endMs);

    this.afterSyncChange(false);
    const held = clamped ? ` (${clamped} held at 0:00)` : "";
    notify(`Shifted every timing by ${delta > 0 ? "+" : ""}${delta} ms${held}.`);
  }

  private nudgeCurrent(delta: number): void {
    const target = this.targets[this.cursor];
    if (!target) return;
    const current = this.targetTime(target);
    if (current == null) return;
    const next = Math.max(0, current + delta);
    this.setTargetTime(target, next);
    this.draft.updatedAt = Date.now();
    this.refreshTimes();
    const wordLevel = target.kind !== "line" && target.kind !== "end";
    this.previewTime(next, wordLevel ? WORD_PREVIEW_LEAD_MS : PREVIEW_LEAD_MS);
  }

  private clearCurrent(): void {
    const target = this.targets[this.cursor];
    if (target) this.clearTargetTime(target);
    this.afterSyncChange();
  }

  private nudgeLine(lineIndex: number, delta: number): void {
    const current = this.targets[this.cursor];
    if (
      this.draft.mode === "word" &&
      current &&
      current.kind !== "end" &&
      current.kind !== "line" &&
      current.lineIndex === lineIndex &&
      this.targetTime(current) != null
    ) {
      this.nudgeCurrent(delta);
      return;
    }

    const line = this.draft.lines[lineIndex];
    if (!line || line.start == null) return;
    const next = Math.max(0, line.start + delta);
    this.shiftLine(line, next - line.start);
    this.draft.updatedAt = Date.now();
    this.refreshTimes();
    this.previewTime(next);
  }

  private jumpToLine(lineIndex: number): void {
    const line = this.draft.lines[lineIndex];
    if (line?.start != null) this.seek(line.start);
  }

  private nudgeEnd(delta: number): void {
    if (this.draft.endMs == null) return;
    this.draft.endMs = Math.max(0, this.draft.endMs + delta);
    this.draft.updatedAt = Date.now();
    this.refreshTimes();
    this.previewTime(this.draft.endMs);
  }

  private jumpEnd(): void {
    if (this.draft.endMs != null) this.seek(this.draft.endMs);
  }

  private refreshTimes(): void {
    const list = this.overlay?.querySelector<HTMLElement>(".ll-editor-lines");
    if (!list) return;
    this.draft.lines.forEach((line, index) => {
      const row = list.querySelector<HTMLElement>(`.ll-editor-line[data-line-index="${index}"]`);
      if (!row) return;
      row.classList.toggle("is-synced", line.start != null);
      const timeEl = row.querySelector<HTMLElement>(".ll-editor-line-time");
      if (timeEl) timeEl.textContent = formatMs(line.start);
    });
    const endRow = list.querySelector<HTMLElement>(".ll-editor-end-row");
    if (endRow) {
      endRow.classList.toggle("is-synced", this.draft.endMs != null);
      const timeEl = endRow.querySelector<HTMLElement>(".ll-editor-line-time");
      if (timeEl) timeEl.textContent = formatMs(this.draft.endMs);
    }
    this.updateSyncStatus();
  }

  private previewTime(ms: number, lead = PREVIEW_LEAD_MS): void {
    this.seek(Math.max(0, ms - lead));
    ensurePlaying();
  }

  private moveCursorToTime(ms: number): void {
    let best = -1;
    this.targets.forEach((target, index) => {
      const time = this.targetTime(target);
      if (time != null && time <= ms + 60) best = index;
    });
    this.cursor = best >= 0 ? best : 0;
    this.renderSyncList();
  }

  private clearEnd(): void {
    this.draft.endMs = null;
    this.cursor = this.firstUnsetTarget();
    this.afterSyncChange(false);
  }

  private clearLine(lineIndex: number): void {
    const line = this.draft.lines[lineIndex];
    if (!line) return;
    line.start = null;
    if (line.kind === "lyric") {
      line.tokens.forEach((token) => (token.start = null));
      line.end = null;
      line.backgrounds.forEach((background) => {
        background.start = null;
        background.end = null;
        background.tokens.forEach((token) => (token.start = null));
      });
    }
    this.cursor = this.firstUnsetTarget();
    this.afterSyncChange(false);
  }

  private selectLine(lineIndex: number): void {
    const index = this.targets.findIndex((target) => target.kind !== "end" && target.lineIndex === lineIndex);
    if (index < 0) return;
    this.cursor = index;
    this.renderSyncList(false);
    const line = this.draft.lines[lineIndex];
    if (line?.start != null) this.previewTime(line.start);
  }

  private selectToken(lineIndex: number, tokenIndex: number): void {
    const index = this.targets.findIndex(
      (target) => target.kind === "token" && target.lineIndex === lineIndex && target.tokenIndex === tokenIndex,
    );
    if (index < 0) return;
    this.cursor = index;
    this.renderSyncList(false);
    const line = this.draft.lines[lineIndex];
    const token = line?.kind === "lyric" ? line.tokens[tokenIndex] : undefined;
    if (token?.start != null) this.previewTime(token.start, WORD_PREVIEW_LEAD_MS);
  }

  private afterSyncChange(scroll = true): void {
    this.draft.updatedAt = Date.now();
    this.renderSyncList(scroll);
  }

private rebuildTargets(): void {
    const targets: TapTarget[] = [];
    this.draft.lines.forEach((line, lineIndex) => {
      if (this.draft.mode === "line" || line.kind === "interlude") {
        targets.push({ kind: "line", lineIndex });
      } else {
        line.tokens.forEach((_, tokenIndex) => targets.push({ kind: "token", lineIndex, tokenIndex }));
        targets.push({ kind: "lineEnd", lineIndex });
        line.backgrounds.forEach((background, bgIndex) => {
          background.tokens.forEach((_, tokenIndex) => targets.push({ kind: "bgToken", lineIndex, bgIndex, tokenIndex }));
          targets.push({ kind: "bgEnd", lineIndex, bgIndex });
        });
      }
    });
    if (this.draft.mode === "line" && this.draft.lines.some((line) => line.kind === "lyric")) {
      targets.push({ kind: "end" });
    }
    this.targets = targets;
    this.cursor = this.firstUnsetTarget();
  }

  private firstUnsetTarget(): number {
    const index = this.targets.findIndex((target) => this.targetTime(target) == null);
    return index < 0 ? Math.max(0, this.targets.length - 1) : index;
  }

  private targetTime(target: TapTarget): number | null {
    if (target.kind === "end") return this.draft.endMs;
    const line = this.draft.lines[target.lineIndex];
    if (!line) return null;
    if (target.kind === "line") return line.start;
    if (line.kind !== "lyric") return null;
    if (target.kind === "lineEnd") return line.end;
    if (target.kind === "token") return line.tokens[target.tokenIndex]?.start ?? null;
    const background = line.backgrounds[target.bgIndex];
    if (!background) return null;
    if (target.kind === "bgEnd") return background.end;
    return background.tokens[target.tokenIndex]?.start ?? null;
  }

  private setTargetTime(target: TapTarget, ms: number): void {
    if (target.kind === "end") {
      this.draft.endMs = ms;
      return;
    }
    const line = this.draft.lines[target.lineIndex];
    if (!line) return;

    if (target.kind === "line") {
      line.start = ms;
      return;
    }
    if (line.kind !== "lyric") return;
    if (target.kind === "lineEnd") {
      line.end = ms;
      return;
    }
    if (target.kind === "token") {
      const token = line.tokens[target.tokenIndex];
      if (!token) return;
      token.start = ms;
      line.start = earliestTokenStart(line);
      return;
    }
    const background = line.backgrounds[target.bgIndex];
    if (!background) return;
    if (target.kind === "bgEnd") {
      background.end = ms;
      return;
    }
    const bgToken = background.tokens[target.tokenIndex];
    if (!bgToken) return;
    bgToken.start = ms;
    background.start = earliestBackgroundStart(background);
  }

  private clearTargetTime(target: TapTarget): void {
    if (target.kind === "end") {
      this.draft.endMs = null;
      return;
    }
    const line = this.draft.lines[target.lineIndex];
    if (!line) return;

    if (target.kind === "line") {
      line.start = null;
      return;
    }
    if (line.kind !== "lyric") return;
    if (target.kind === "lineEnd") {
      line.end = null;
      return;
    }
    if (target.kind === "token") {
      const token = line.tokens[target.tokenIndex];
      if (token) token.start = null;
      line.start = earliestTokenStart(line);
      return;
    }
    const background = line.backgrounds[target.bgIndex];
    if (!background) return;
    if (target.kind === "bgEnd") {
      background.end = null;
      return;
    }
    const bgToken = background.tokens[target.tokenIndex];
    if (bgToken) bgToken.start = null;
    background.start = earliestBackgroundStart(background);
  }

  private shiftLine(line: EditorLine, delta: number): void {
    if (line.start != null) line.start += delta;
    if (line.kind === "lyric") {
      line.tokens.forEach((token) => {
        if (token.start != null) token.start += delta;
      });
      if (line.end != null) line.end += delta;
      line.backgrounds.forEach((background) => {
        if (background.start != null) background.start += delta;
        background.tokens.forEach((token) => {
          if (token.start != null) token.start += delta;
        });
        if (background.end != null) background.end += delta;
      });
    }
  }

private renderPreviewStage(): void {
    if (!this.refs) return;
    const stage = h("div", "ll-editor-preview-stage");

    if (!isDraftFullySynced(this.draft)) {
      const warn = h("div", "ll-editor-preview-warn");
      warn.textContent = "Not everything is synced yet — the preview only shows what's already timed.";
      stage.appendChild(warn);
    }

    const frame = h("div", "ll-editor-preview-frame");
    const scroll = h("div", "ll-editor-preview-scroll");
    const lines = h("div", "ll-editor-preview-lines");
    scroll.appendChild(lines);
    frame.appendChild(scroll);
    stage.appendChild(frame);
    this.refs.body.appendChild(stage);

    this.previewView?.destroy();
    this.previewView = new LyricsView({
      container: lines,
      scroller: scroll,
      variant: "panel",
      virtualize: false,
    });
    this.refreshPreview();
    this.previewView.setEnabled(true);
  }

  private refreshPreview(): void {
    if (!this.previewView) return;
    try {
      this.previewView.setLyrics(draftToLyrics(this.draft));
    } catch (error) {
      console.error("[Liquid Lyrics] Preview build failed", error);
    }
  }

private save(): void {
    if (this.stage === "text") this.commitText();
    if (this.draft.lines.length === 0) {
      notify("Add some lyrics first (Text step).");
      return;
    }

    const times = this.targets.map((target) => this.targetTime(target));
    const done = times.filter((time) => time != null).length;
    if (done > 0 && done < times.length) {
      notify(`Sync incomplete (${done}/${times.length}) — finish syncing, or clear all timings to save static lyrics.`);
      return;
    }

    capitalizeLineStarts(this.draft);

    try {
      const stored: StoredSync = {
        version: 1,
        trackId: this.draft.trackId,
        trackUri: this.draft.trackUri,
        title: this.draft.title,
        artist: this.draft.artist,
        durationMs: this.draft.durationMs,
        mode: this.draft.mode,
        credit: this.draft.credit,
        updatedAt: Date.now(),
        lyrics: draftToLyrics(this.draft),
        draft: this.draft,
      };
      saveCustomSync(stored);
      this.savedSignature = signature(this.draft);
      this.refs?.deleteItem.classList.remove("ll-hidden");
      this.close();
      notify("Sync saved and activated.");
    } catch (error) {
      console.error("[Liquid Lyrics] Save failed", error);
      notify("Save failed (storage full?).");
    }
  }

  private async deleteSaved(): Promise<void> {
    this.refs?.menu.classList.remove("open");
    if (!hasCustomSync(this.draft.trackUri)) {
      notify("No custom sync saved for this song.");
      return;
    }
    if (this.confirmResolve) return;
    const ok = await this.showConfirm({
      title: "Delete saved sync?",
      message: "This removes your custom sync for this song and restores the online lyrics.",
      confirm: "Delete",
      cancel: "Cancel",
      danger: true,
    });
    if (!ok) return;
    deleteCustomSync(this.draft.trackUri);
    this.close();
    notify("Saved sync deleted.");
  }

  private exportFile(): void {
    this.refs?.menu.classList.remove("open");
    if (this.stage === "text") this.commitText();
    const stored: StoredSync = {
      version: 1,
      trackId: this.draft.trackId,
      trackUri: this.draft.trackUri,
      title: this.draft.title,
      artist: this.draft.artist,
      durationMs: this.draft.durationMs,
      mode: this.draft.mode,
      credit: this.draft.credit,
      updatedAt: Date.now(),
      lyrics: draftToLyrics(this.draft),
      draft: this.draft,
    };
    const name = `${this.draft.artist} - ${this.draft.title}`.replace(/[^\w\-]+/g, "_").slice(0, 80);
    downloadText(`${name || "liquid-lyrics"}.json`, JSON.stringify(stored, null, 2));
  }

  private pickFile(): void {
    this.refs?.menu.classList.remove("open");
    if (!this.fileInput) {
      this.fileInput = document.createElement("input");
      this.fileInput.type = "file";
      this.fileInput.accept = ".json,.lrc,.txt";
      this.fileInput.style.display = "none";
      this.fileInput.addEventListener("change", () => this.onFileChosen());
      document.body.appendChild(this.fileInput);
    }
    this.fileInput.value = "";
    this.fileInput.click();
  }

  private async onFileChosen(): Promise<void> {
    const file = this.fileInput?.files?.[0];
    if (!file) return;

    const text = await file.text();
    const meta = readTrackMeta();
    const name = file.name.toLowerCase();

    try {
      if (name.endsWith(".json")) {
        const stored = parseImportedSync(text, meta.trackUri);
        this.draft = { ...stored.draft, durationMs: meta.durationMs || stored.draft.durationMs };
      } else if (name.endsWith(".lrc")) {
        const draft = lrcToDraft(text, meta);
        if (!draft) throw new Error("No timings found in the .lrc file");
        this.draft = draft;
      } else {
        this.draft = textToDraft(text, meta, this.draft.mode);
      }
    } catch (error) {
      notify(`Import failed: ${error instanceof Error ? error.message : "Invalid file"}`);
      return;
    }

    this.updateModeButtons();
    if (this.refs) this.refs.songLabel.textContent = `${this.draft.title} - ${this.draft.artist}`;
    this.rebuildTargets();
    this.setStage(isDraftFullySynced(this.draft) ? "preview" : this.draft.lines.length ? "sync" : "text");
    notify("File imported.");
  }

private onTick = (progress: number): void => {
    if (!this.refs) return;

    const duration = getTrackDuration();
    const nearEnd =
      duration > 0 &&
      !this.dragging &&
      isPlayerPlaying() &&
      progress >= duration - END_STOP_MS;
    if (nearEnd) pausePlayback();

    const looped =
      !this.dragging &&
      performance.now() > this.suppressLoopUntil &&
      duration > 0 &&
      isPlayerPlaying() &&
      progress < this.prevProgress &&
      this.prevProgress > duration - LOOP_END_ZONE_MS &&
      progress < LOOP_START_ZONE_MS;
    if (looped) {
      this.seek(0);
      pausePlayback();
    }
    this.prevProgress = progress;

    setIcon(this.refs.playBtn, isPlayerPlaying() ? ICONS.pause : ICONS.play);
    this.refs.durTime.textContent = formatClock(duration);
    if (this.dragging || performance.now() < this.suppressFillUntil) return;
    const ratio = duration > 0 ? Math.min(1, progress / duration) : 0;
    this.refs.seekFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
    this.refs.curTime.textContent = formatClock(progress);
  };

  private static readonly SYNC_KEYS = new Set(["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.isOpen()) return;

    if (this.confirmResolve) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.resolveConfirm(false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.resolveConfirm(true);
      }
      return;
    }

    const target = event.target as HTMLElement | null;
    const typing = target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement;

    if (event.key === "Escape") {
      if (typing) return;
      event.preventDefault();
      void this.requestClose();
      return;
    }

    if (this.stage !== "sync" || typing) return;

    if (event.code === "AltRight") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!event.repeat) this.tap();
      return;
    }

    if (!LyricsEditor.SYNC_KEYS.has(event.key)) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    switch (event.key) {
      case "Backspace":
        this.undo();
        break;
      case "Delete":
        this.clearCurrent();
        break;
      case "ArrowLeft":
        this.nudgeCurrent(event.shiftKey ? -NUDGE_MS_LARGE : -NUDGE_MS);
        break;
      case "ArrowRight":
        this.nudgeCurrent(event.shiftKey ? NUDGE_MS_LARGE : NUDGE_MS);
        break;
      case "ArrowUp":
        this.cursor = Math.max(0, this.cursor - 1);
        this.renderSyncList();
        break;
      case "ArrowDown":
        this.cursor = Math.min(this.targets.length - 1, this.cursor + 1);
        this.renderSyncList();
        break;
      default:
        break;
    }
  };
}

function h(tag: string, className: string): HTMLElement {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

function iconButton(className: string, icon: string, label: string): HTMLButtonElement {
  const btn = h("button", className) as HTMLButtonElement;
  btn.type = "button";
  btn.innerHTML = icon;
  btn.setAttribute("aria-label", label);
  registerTooltip(btn, label);
  return btn;
}

function lineControl(icon: string, label: string, onClick: () => void): HTMLButtonElement {
  const btn = h("button", "ll-editor-line-btn") as HTMLButtonElement;
  btn.type = "button";
  btn.innerHTML = icon;
  btn.setAttribute("aria-label", label);
  registerTooltip(btn, label);
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    onClick();
  });
  return btn;
}

function menuItem(label: string): HTMLButtonElement {
  const btn = h("button", "ll-editor-menu-item") as HTMLButtonElement;
  btn.type = "button";
  btn.textContent = label;
  return btn;
}

function setIcon(btn: HTMLElement, icon: string): void {
  if (btn.dataset.icon === icon) return;
  btn.dataset.icon = icon;
  btn.innerHTML = icon;
}

function togglePlay(): void {
  togglePlayback();
}

function ensurePlaying(): void {
  if (!isPlayerPlaying()) togglePlay();
}

function clampNum(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function readControlsStrip(): { width: number; height: number } {
  const { width, height } = windowControlsStrip();
  return { width: clampNum(width, 50, 400), height: clampNum(height, 20, 300) };
}

function getRepeatSafe(): string | null {
  return player()?.repeat ?? null;
}

function setRepeatSafe(mode: string): void {
  try {
    void player()?.setRepeat(mode);
  } catch {
  }
}

function readTrackMeta(): TrackMeta {
  const item = currentItem();
  const uri = String(item?.uri ?? "");
  const artists = Array.isArray(item?.artists)
    ? item.artists.map((artist: any) => artist?.name).filter(Boolean).join(", ")
    : "";
  const metadata = item?.metadata ?? {};

  return {
    trackId: normalizeTrackId(uri),
    trackUri: uri,
    title: item?.name || metadata.title || "Unknown title",
    artist: artists || metadata.artist_name || metadata.artist || "Unknown artist",
    durationMs: getTrackDuration(),
  };
}

function emptyMeta(): TrackMeta {
  return { trackId: "", trackUri: "", title: "", artist: "", durationMs: 0 };
}

function earliestTokenStart(line: EditorLine): number | null {
  if (line.kind !== "lyric") return line.start;
  const starts = line.tokens.map((token) => token.start).filter((value): value is number => value != null);
  return starts.length ? Math.min(...starts) : null;
}

function earliestBackgroundStart(background: EditorBackground): number | null {
  const starts = background.tokens.map((token) => token.start).filter((value): value is number => value != null);
  return starts.length ? Math.min(...starts) : null;
}

function countLyricsUpTo(lines: EditorLine[], index: number): number {
  let count = 0;
  for (let i = 0; i <= index; i++) if (lines[i].kind === "lyric") count++;
  return count;
}

function capitalizeLineStarts(draft: EditorDraft): void {
  for (const line of draft.lines) {
    if (line.kind !== "lyric") continue;
    line.text = capitalizeFirstLetter(line.text);
    const firstToken = line.tokens[0];
    if (firstToken) firstToken.text = capitalizeFirstLetter(firstToken.text);
  }
}

function capitalizeFirstLetter(text: string): string {
  const index = text.search(/\p{L}/u);
  if (index < 0) return text;
  return text.slice(0, index) + text[index].toUpperCase() + text.slice(index + 1);
}

function carryTimings(oldLines: EditorLine[], newLines: EditorLine[]): EditorLine[] {
  const byText = new Map<string, EditorLine[]>();
  const interludes: EditorLine[] = [];
  for (const line of oldLines) {
    if (line.kind === "interlude") interludes.push(line);
    else {
      const bucket = byText.get(line.text) ?? [];
      bucket.push(line);
      byText.set(line.text, bucket);
    }
  }

  return newLines.map((line): EditorLine => {
    if (line.kind === "interlude") {
      const match = interludes.shift();
      return { kind: "interlude", start: match ? match.start : null };
    }
    const match = byText.get(line.text)?.shift();
    if (match && match.kind === "lyric") {
      const tokens = line.tokens.map((token, index) => ({
        text: token.text,
        start: match.tokens[index]?.text === token.text ? match.tokens[index].start : null,
      }));
      const backgrounds = line.backgrounds.map((background, bgIndex): EditorBackground => {
        const oldBackground = match.backgrounds[bgIndex];
        const sameText = oldBackground?.text === background.text;
        return {
          text: background.text,
          tokens: background.tokens.map((token, index) => ({
            text: token.text,
            start: sameText && oldBackground.tokens[index]?.text === token.text ? oldBackground.tokens[index].start : null,
          })),
          start: sameText ? oldBackground.start : null,
          end: sameText ? oldBackground.end : null,
        };
      });
      return { kind: "lyric", text: line.text, tokens, backgrounds, start: match.start, end: match.end };
    }
    return line;
  });
}

function signature(draft: EditorDraft): string {
  return JSON.stringify({
    mode: draft.mode,
    credit: draft.credit ?? "",
    end: draft.endMs,
    lines: draft.lines.map((line) =>
      line.kind === "interlude"
        ? { i: line.start }
        : {
            t: line.text,
            s: line.start,
            e: line.end,
            w: line.tokens.map((token) => token.start),
            b: line.backgrounds.map((background) => ({
              t: background.text,
              s: background.start,
              e: background.end,
              w: background.tokens.map((token) => token.start),
            })),
          },
    ),
  });
}

function formatMs(ms: number | null): string {
  if (ms == null || !Number.isFinite(ms)) return "–:––.–––";
  const total = Math.max(0, ms);
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const millis = Math.floor(total % 1000);
  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function downloadText(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

function notify(message: string): void {
  const overlay = document.getElementById(OVERLAY_ID);
  if (overlay?.classList.contains("visible")) {
    showEditorToast(overlay, message);
    return;
  }
  showNotification(message);
}

function showEditorToast(overlay: HTMLElement, message: string): void {
  let toast = overlay.querySelector<HTMLElement>(".ll-editor-toast");
  if (!toast) {
    toast = h("div", "ll-editor-toast");
    overlay.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("visible");
  void toast.offsetWidth;
  toast.classList.add("visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast?.classList.remove("visible");
    toastTimer = null;
  }, 3400);
}

type ConfirmOptions = {
  title: string;
  message: string;
  confirm: string;
  cancel: string;
  danger?: boolean;
};
