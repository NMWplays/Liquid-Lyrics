import {
  addImages,
  deleteImage,
  getSelectedImageId,
  isVideoBlob,
  listImages,
  selectImage,
} from "@/lib/backgroundLibrary";

const CLOSE_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5 19 19"/><path d="M19 5 5 19"/></svg>';
const CLOSE_MS = 240;

let active: { close: () => void } | null = null;

export function isGalleryOpen(): boolean {
  return active !== null;
}

export function closeGallery(): void {
  active?.close();
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

export function openGallery(host: HTMLElement, onChange: () => void): void {
  closeGallery();

  const scrim = element("div", "ll-gallery-scrim");
  const card = element("div", "ll-gallery");
  const head = element("div", "ll-gallery-head");
  const title = element("div", "ll-gallery-title");
  title.textContent = "Background gallery";

  const add = element("button", "ll-settings-surface ll-settings-action-btn");
  add.type = "button";
  add.textContent = "Add images or videos";

  const close = element("button", "ll-settings-surface ll-settings-header-btn ll-settings-close-btn");
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  close.innerHTML = CLOSE_ICON;

  const input = element("input", "");
  input.type = "file";
  input.accept = "image/*,video/*";
  input.multiple = true;
  input.hidden = true;

  const grid = element("div", "ll-gallery-grid");
  const remove = element("button", "ll-gallery-delete");
  remove.type = "button";
  remove.setAttribute("aria-label", "Remove image");
  remove.innerHTML = CLOSE_ICON;

  head.append(title, add, close, input);
  card.append(head, grid);
  scrim.append(card, remove);

  let urls: string[] = [];
  let hoverId = "";
  let closed = false;

  const playHovered = () => {
    for (const video of Array.from(grid.querySelectorAll("video"))) {
      if ((video.closest(".ll-gallery-tile") as HTMLElement | null)?.dataset.id === hoverId) void video.play().catch(() => {});
      else video.pause();
    }
  };

  const hideRemove = () => {
    hoverId = "";
    remove.classList.remove("visible");
    playHovered();
  };

  const showRemove = (tile: HTMLElement) => {
    const rect = tile.getBoundingClientRect();
    hoverId = tile.dataset.id || "";
    remove.style.top = `${rect.top + 7}px`;
    remove.style.left = `${rect.right - 35}px`;
    remove.classList.add("visible");
    playHovered();
  };

  const markSelected = () => {
    const selected = getSelectedImageId();
    for (const tile of Array.from(grid.children) as HTMLElement[]) {
      tile.classList.toggle("is-selected", !!selected && tile.dataset.id === selected);
    }
  };

  const render = async () => {
    const items = await listImages();
    if (closed) return;
    for (const url of urls) URL.revokeObjectURL(url);
    urls = [];
    hideRemove();
    grid.replaceChildren();

    if (!items.length) {
      const empty = element("div", "ll-gallery-empty");
      empty.textContent = "No images or videos yet. Add some and pick one as your background.";
      grid.appendChild(empty);
      return;
    }

    items.forEach((item, index) => {
      const tile = element("div", "ll-gallery-tile");
      tile.dataset.id = item.id;
      tile.title = item.name;
      tile.style.setProperty("--i", String(Math.min(index, 12)));
      const url = URL.createObjectURL(item.blob);
      urls.push(url);
      if (isVideoBlob(item.blob)) {
        const video = element("video", "");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.src = url;
        tile.appendChild(video);
      } else {
        const img = element("img", "");
        img.src = url;
        img.alt = item.name;
        tile.appendChild(img);
      }
      tile.addEventListener("mouseenter", () => showRemove(tile));
      tile.addEventListener("click", () => {
        selectImage(item.id);
        markSelected();
        onChange();
      });
      grid.appendChild(tile);
    });
    markSelected();
  };

  const finish = () => {
    if (closed) return;
    closed = true;
    active = null;
    scrim.classList.remove("visible");
    scrim.classList.add("closing");
    window.setTimeout(() => {
      scrim.remove();
      for (const url of urls) URL.revokeObjectURL(url);
      urls = [];
    }, CLOSE_MS);
  };

  add.addEventListener("click", () => input.click());
  close.addEventListener("click", finish);
  input.addEventListener("change", async () => {
    const files = Array.from(input.files || []);
    input.value = "";
    if (!files.length) return;
    await addImages(files);
    if (!getSelectedImageId()) {
      const [newest] = await listImages();
      if (newest) selectImage(newest.id);
    }
    await render();
    onChange();
  });

  remove.addEventListener("click", async (event) => {
    event.stopPropagation();
    const id = hoverId;
    if (!id) return;
    hideRemove();
    await deleteImage(id);
    await render();
    onChange();
  });

  grid.addEventListener("scroll", hideRemove, { passive: true });
  scrim.addEventListener("mousemove", (event) => {
    const target = event.target as HTMLElement;
    if (target === remove || remove.contains(target) || target.closest(".ll-gallery-tile")) return;
    hideRemove();
  });
  scrim.addEventListener("pointerdown", (event) => {
    if (event.target === scrim) finish();
  });

  host.appendChild(scrim);
  requestAnimationFrame(() => requestAnimationFrame(() => scrim.classList.add("visible")));
  active = { close: finish };
  void render();
}
