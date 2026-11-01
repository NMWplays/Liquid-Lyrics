const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";

export interface GlassFilterOptions {
  filterId: string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: string;
  yChannel?: string;
  mixBlendMode?: string;
}

const GLASS_DEFAULTS: Required<Omit<GlassFilterOptions, "filterId">> = {
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
};

export interface GlassFilterNodes {
  filter: SVGFilterElement;
  feImage: SVGFEImageElement;
  feDispRed: SVGFEDisplacementMapElement;
  feDispGreen: SVGFEDisplacementMapElement;
  feDispBlue: SVGFEDisplacementMapElement;
  feGaussian: SVGFEGaussianBlurElement;
}

let svgRoot: SVGSVGElement | null = null;

function ensureSvgRoot(): SVGSVGElement {
  if (svgRoot && document.body.contains(svgRoot)) return svgRoot;

  svgRoot = document.createElementNS(SVG_NS, "svg");
  svgRoot.setAttribute("id", "liquid-lyrics-glass-svg");
  svgRoot.setAttribute("width", "0");
  svgRoot.setAttribute("height", "0");
  svgRoot.setAttribute("aria-hidden", "true");
  svgRoot.style.cssText = "position:fixed;left:-9999px;top:-9999px;pointer-events:none;";

  const defs = document.createElementNS(SVG_NS, "defs");
  svgRoot.appendChild(defs);
  document.body.appendChild(svgRoot);
  return svgRoot;
}

export function generateDisplacementMap(
  width: number,
  height: number,
  opts: Required<Omit<GlassFilterOptions, "filterId">> & { filterId: string },
): string {
  const edgeSize = Math.min(width, height) * (opts.borderWidth * 0.5);
  const redGradId = `ll-red-grad-${opts.filterId}`;
  const blueGradId = `ll-blue-grad-${opts.filterId}`;

  const svgContent = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="red"/>
    </linearGradient>
    <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0000"/>
      <stop offset="100%" stop-color="blue"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
  <rect x="0" y="0" width="${width}" height="${height}" rx="${opts.borderRadius}" fill="url(#${redGradId})"/>
  <rect x="0" y="0" width="${width}" height="${height}" rx="${opts.borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${opts.mixBlendMode}"/>
  <rect x="${edgeSize}" y="${edgeSize}" width="${width - edgeSize * 2}" height="${height - edgeSize * 2}" rx="${opts.borderRadius}" fill="hsl(0 0% ${opts.brightness}% / ${opts.opacity})" style="filter:blur(${opts.blur}px)"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
}

export function createGlassFilter(options: GlassFilterOptions): GlassFilterNodes {
  const svg = ensureSvgRoot();
  const defs = svg.querySelector("defs")!;

  const opts = { ...GLASS_DEFAULTS, ...options };

  const filter = document.createElementNS(SVG_NS, "filter") as SVGFilterElement;
  filter.setAttribute("id", opts.filterId);
  filter.setAttribute("color-interpolation-filters", "sRGB");
  filter.setAttribute("x", "0%");
  filter.setAttribute("y", "0%");
  filter.setAttribute("width", "100%");
  filter.setAttribute("height", "100%");

  const feImage = document.createElementNS(SVG_NS, "feImage") as SVGFEImageElement;
  feImage.setAttribute("x", "0");
  feImage.setAttribute("y", "0");
  feImage.setAttribute("width", "100%");
  feImage.setAttribute("height", "100%");
  feImage.setAttribute("preserveAspectRatio", "none");
  feImage.setAttribute("result", "map");

  const feDispRed = document.createElementNS(SVG_NS, "feDisplacementMap") as SVGFEDisplacementMapElement;
  feDispRed.setAttribute("in", "SourceGraphic");
  feDispRed.setAttribute("in2", "map");
  feDispRed.setAttribute("scale", String(opts.distortionScale + opts.redOffset));
  feDispRed.setAttribute("xChannelSelector", opts.xChannel);
  feDispRed.setAttribute("yChannelSelector", opts.yChannel);
  feDispRed.setAttribute("result", "dispRed");

  const feRedMatrix = document.createElementNS(SVG_NS, "feColorMatrix");
  feRedMatrix.setAttribute("in", "dispRed");
  feRedMatrix.setAttribute("type", "matrix");
  feRedMatrix.setAttribute("values", "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0");
  feRedMatrix.setAttribute("result", "red");

  const feDispGreen = document.createElementNS(SVG_NS, "feDisplacementMap") as SVGFEDisplacementMapElement;
  feDispGreen.setAttribute("in", "SourceGraphic");
  feDispGreen.setAttribute("in2", "map");
  feDispGreen.setAttribute("scale", String(opts.distortionScale + opts.greenOffset));
  feDispGreen.setAttribute("xChannelSelector", opts.xChannel);
  feDispGreen.setAttribute("yChannelSelector", opts.yChannel);
  feDispGreen.setAttribute("result", "dispGreen");

  const feGreenMatrix = document.createElementNS(SVG_NS, "feColorMatrix");
  feGreenMatrix.setAttribute("in", "dispGreen");
  feGreenMatrix.setAttribute("type", "matrix");
  feGreenMatrix.setAttribute("values", "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0");
  feGreenMatrix.setAttribute("result", "green");

  const feDispBlue = document.createElementNS(SVG_NS, "feDisplacementMap") as SVGFEDisplacementMapElement;
  feDispBlue.setAttribute("in", "SourceGraphic");
  feDispBlue.setAttribute("in2", "map");
  feDispBlue.setAttribute("scale", String(opts.distortionScale + opts.blueOffset));
  feDispBlue.setAttribute("xChannelSelector", opts.xChannel);
  feDispBlue.setAttribute("yChannelSelector", opts.yChannel);
  feDispBlue.setAttribute("result", "dispBlue");

  const feBlueMatrix = document.createElementNS(SVG_NS, "feColorMatrix");
  feBlueMatrix.setAttribute("in", "dispBlue");
  feBlueMatrix.setAttribute("type", "matrix");
  feBlueMatrix.setAttribute("values", "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0");
  feBlueMatrix.setAttribute("result", "blue");

  const feBlendRG = document.createElementNS(SVG_NS, "feBlend");
  feBlendRG.setAttribute("in", "red");
  feBlendRG.setAttribute("in2", "green");
  feBlendRG.setAttribute("mode", "screen");
  feBlendRG.setAttribute("result", "rg");

  const feBlendRGB = document.createElementNS(SVG_NS, "feBlend");
  feBlendRGB.setAttribute("in", "rg");
  feBlendRGB.setAttribute("in2", "blue");
  feBlendRGB.setAttribute("mode", "screen");
  feBlendRGB.setAttribute("result", "output");

  const feGaussian = document.createElementNS(SVG_NS, "feGaussianBlur") as SVGFEGaussianBlurElement;
  feGaussian.setAttribute("in", "output");
  feGaussian.setAttribute("stdDeviation", String(opts.displace));

  filter.appendChild(feImage);
  filter.appendChild(feDispRed);
  filter.appendChild(feRedMatrix);
  filter.appendChild(feDispGreen);
  filter.appendChild(feGreenMatrix);
  filter.appendChild(feDispBlue);
  filter.appendChild(feBlueMatrix);
  filter.appendChild(feBlendRG);
  filter.appendChild(feBlendRGB);
  filter.appendChild(feGaussian);

  defs.appendChild(filter);

  return { filter, feImage, feDispRed, feDispGreen, feDispBlue, feGaussian };
}

export function removeGlassFilter(filterId: string): void {
  const filter = document.getElementById(filterId);
  if (filter) filter.remove();
}
