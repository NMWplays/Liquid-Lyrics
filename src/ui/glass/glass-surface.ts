import {
  createGlassFilter,
  generateDisplacementMap,
  removeGlassFilter,
  type GlassFilterNodes,
  type GlassFilterOptions,
} from "./glass-filter";

let surfaceCount = 0;

export interface GlassSurfaceState {
  filterId: string;
  nodes: GlassFilterNodes;
  observer: ResizeObserver;
  destroy: () => void;
}

export function applyGlassSurface(
  el: HTMLElement,
  options?: Partial<Omit<GlassFilterOptions, "filterId">>,
): GlassSurfaceState {
  const filterId = `ll-glass-${surfaceCount++}`;

  const opts: GlassFilterOptions = {
    filterId,
    borderRadius: 20,
    borderWidth: 0.07,
    brightness: 50,
    opacity: 0.93,
    blur: 11,
    displace: 0.2,
    distortionScale: -80,
    redOffset: 0,
    greenOffset: 6,
    blueOffset: 10,
    xChannel: "R",
    yChannel: "G",
    mixBlendMode: "screen",
    ...options,
  };

  const nodes = createGlassFilter(opts);

  let lastWidth = 0;
  let lastHeight = 0;

  const fullOpts = {
    borderRadius: opts.borderRadius ?? 20,
    borderWidth: opts.borderWidth ?? 0.07,
    brightness: opts.brightness ?? 50,
    opacity: opts.opacity ?? 0.93,
    blur: opts.blur ?? 11,
    displace: opts.displace ?? 0.2,
    distortionScale: opts.distortionScale ?? -80,
    redOffset: opts.redOffset ?? 0,
    greenOffset: opts.greenOffset ?? 6,
    blueOffset: opts.blueOffset ?? 10,
    xChannel: opts.xChannel ?? "R",
    yChannel: opts.yChannel ?? "G",
    mixBlendMode: opts.mixBlendMode ?? "screen",
    filterId,
  };

  function updateMap() {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (rect.width === lastWidth && rect.height === lastHeight) return;

    lastWidth = rect.width;
    lastHeight = rect.height;

    const dataUrl = generateDisplacementMap(rect.width, rect.height, fullOpts);
    nodes.feImage.setAttribute("href", dataUrl);
    nodes.feImage.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      dataUrl,
    );
  }

  updateMap();

  const observer = new ResizeObserver(() => {
    requestAnimationFrame(updateMap);
  });
  observer.observe(el);

  el.style.setProperty("--ll-glass-filter", `url(#${filterId})`);
  el.style.setProperty("backdrop-filter", `url(#${filterId})`);
  el.style.setProperty("-webkit-backdrop-filter", `url(#${filterId})`);
  if (typeof opts.borderRadius === "number") {
    el.style.borderRadius = `${opts.borderRadius}px`;
  }

  const destroy = () => {
    observer.disconnect();
    el.style.removeProperty("--ll-glass-filter");
    el.style.removeProperty("backdrop-filter");
    el.style.removeProperty("-webkit-backdrop-filter");
    removeGlassFilter(filterId);
  };

  return { filterId, nodes, observer, destroy };
}
