// Injected into every bundle by scripts/lifecycle.mjs.
type Fn = (...args: any[]) => any;

export type AddonContext = {
  id: string;
  signal: AbortSignal;
  onStop(fn: () => void): void;
  style(css: string): HTMLStyleElement;
  url(path: string): string;
  [key: string]: any;
};

export type LifecycleOptions = { globals?: RegExp | null; remove?: string | null };

const G: any = globalThis;
const controller = new AbortController();
const stops: Fn[] = [];
const timeouts = new Set<number>();
const intervals = new Set<number>();
const frames = new Set<number>();
const idles = new Set<number>();
const observers = new Set<{ disconnect(): void }>();
const created = new WeakSet<Node>();
const touched: WeakRef<Element>[] = [];
const originals = new WeakMap<Element, Map<string, any>>();
const patches: [any, PropertyKey, PropertyDescriptor | undefined][] = [];
const animations: WeakRef<Animation>[] = [];

let stopped = false;
export let context: AddonContext | null = null;
export const signal = controller.signal;

export function isStopped(): boolean {
  return stopped;
}

export function onStop(fn: () => void): void {
  if (stopped) {
    try { fn(); } catch {}
    return;
  }
  stops.push(fn);
}

export function patch<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  patches.push([obj, key, Object.getOwnPropertyDescriptor(obj, key)]);
  (obj as any)[key] = value;
}

export function patchDescriptor(obj: object, key: PropertyKey, descriptor: PropertyDescriptor): void {
  patches.push([obj, key, Object.getOwnPropertyDescriptor(obj, key)]);
  Object.defineProperty(obj, key, descriptor);
}

function foreign(node: unknown): node is Element {
  return !!node && typeof (node as Element).getAttribute === "function" && !created.has(node as Element);
}

function remember(el: Element, key: string, read: () => any): void {
  if (stopped) return;
  let map = originals.get(el);
  if (!map) {
    map = new Map();
    originals.set(el, map);
    touched.push(new WeakRef(el));
    if (touched.length % 4096 === 0) {
      const alive = touched.filter((ref) => ref.deref()?.isConnected);
      touched.length = 0;
      touched.push(...alive);
    }
  }
  if (!map.has(key)) {
    const kind = key.slice(0, 2);
    const attr = kind === "c:" ? "class" : kind === "s:" || kind === "p:" ? "style" : null;
    if (attr && !map.has("n:" + attr)) map.set("n:" + attr, el.hasAttribute(attr));
    map.set(key, read());
  }
}

function adopt(root: Node): void {
  created.add(root);
  (root as Element).querySelectorAll?.("*").forEach((el) => created.add(el));
}

function track<T>(set: Set<T>, id: T): T {
  set.add(id);
  return id;
}

function observed(name: string): any {
  const Base = G[name];
  if (typeof Base !== "function") return Base;
  return class extends Base {
    observe(...args: any[]) {
      if (stopped) return;
      observers.add(this);
      return super.observe(...args);
    }
    disconnect() {
      observers.delete(this);
      return super.disconnect();
    }
  };
}

function withSignal(options: any): AddEventListenerOptions {
  const out: AddEventListenerOptions = typeof options === "boolean" ? { capture: options } : { ...(options || {}) };
  out.signal = out.signal && typeof (AbortSignal as any).any === "function"
    ? (AbortSignal as any).any([out.signal, controller.signal])
    : controller.signal;
  return out;
}

const createElement = Document.prototype.createElement;
const createElementNS = Document.prototype.createElementNS;

export const __lq = {
  setTimeout(fn: Fn, ms?: number, ...args: any[]): number {
    if (stopped) return 0;
    const id: number = G.setTimeout((...a: any[]) => {
      timeouts.delete(id);
      if (typeof fn === "function") fn(...a);
    }, ms, ...args);
    return track(timeouts, id);
  },
  clearTimeout(id?: number): void {
    if (id) timeouts.delete(id);
    G.clearTimeout(id);
  },
  setInterval(fn: Fn, ms?: number, ...args: any[]): number {
    if (stopped) return 0;
    return track(intervals, G.setInterval(fn, ms, ...args));
  },
  clearInterval(id?: number): void {
    if (id) intervals.delete(id);
    G.clearInterval(id);
  },
  requestAnimationFrame(fn: FrameRequestCallback): number {
    if (stopped) return 0;
    const id: number = G.requestAnimationFrame((time: number) => {
      frames.delete(id);
      fn(time);
    });
    return track(frames, id);
  },
  cancelAnimationFrame(id: number): void {
    frames.delete(id);
    G.cancelAnimationFrame(id);
  },
  requestIdleCallback(fn: IdleRequestCallback, options?: IdleRequestOptions): number {
    if (stopped) return 0;
    if (typeof G.requestIdleCallback !== "function") {
      return __lq.setTimeout(() => fn({ didTimeout: false, timeRemaining: () => 8 } as IdleDeadline), 1);
    }
    const id: number = G.requestIdleCallback((deadline: IdleDeadline) => {
      idles.delete(id);
      fn(deadline);
    }, options);
    return track(idles, id);
  },
  cancelIdleCallback(id: number): void {
    idles.delete(id);
    if (typeof G.cancelIdleCallback === "function") G.cancelIdleCallback(id);
    else __lq.clearTimeout(id);
  },
  MutationObserver: observed("MutationObserver") as typeof MutationObserver,
  ResizeObserver: observed("ResizeObserver") as typeof ResizeObserver,
  IntersectionObserver: observed("IntersectionObserver") as typeof IntersectionObserver,
  createElement(tag: string, options?: ElementCreationOptions): HTMLElement {
    const el = createElement.call(document, tag, options);
    created.add(el);
    return el;
  },
  createElementNS(ns: string | null, tag: string, options?: any): Element {
    const el = createElementNS.call(document, ns, tag, options);
    created.add(el);
    return el;
  },
};

export function __lqOn(target: any, type: string, listener: any, options?: any): void {
  if (!target || stopped || !listener) return;
  target.addEventListener(type, listener, withSignal(options));
}

export function __lqStyle(el: any, prop: string, value: any): any {
  if (foreign(el)) remember(el, "s:" + prop, () => (el as any).style[prop]);
  if (el) el.style[prop] = value;
  return value;
}

export function __lqSetProp(el: any, name: string, value: any, priority?: string): void {
  if (foreign(el)) {
    const style = (el as HTMLElement).style;
    remember(el, "p:" + name, () => [style.getPropertyValue(name), style.getPropertyPriority(name)]);
  }
  el?.style.setProperty(name, value, priority);
}

export function __lqDelProp(el: any, name: string): string {
  if (foreign(el)) {
    const style = (el as HTMLElement).style;
    remember(el, "p:" + name, () => [style.getPropertyValue(name), style.getPropertyPriority(name)]);
  }
  return el?.style.removeProperty(name) ?? "";
}

export function __lqSetPropDecl(style: any, name: string, value: any, priority?: string): void {
  const root = document.documentElement;
  const host = style === root?.style ? root : style === document.body?.style ? document.body : null;
  if (host) __lqSetProp(host, name, value, priority);
  else style?.setProperty(name, value, priority);
}

export function __lqClass(el: any, method: string, ...args: any[]): any {
  if (!el) return undefined;
  if (foreign(el)) {
    const names = method === "toggle" ? [args[0]] : args;
    for (const name of names) {
      if (typeof name === "string" && name && !el.classList.contains(name)) remember(el, "c:" + name, () => false);
    }
  }
  return el.classList[method](...args);
}

export function __lqAttr(el: any, method: string, name: string, ...args: any[]): any {
  if (!el) return undefined;
  if (foreign(el) && typeof name === "string") remember(el, "a:" + name.toLowerCase(), () => el.getAttribute(name));
  return el[method](name, ...args);
}

function dataName(key: string): string {
  return "data-" + key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}

export function __lqData(el: any, key: string, value: any): any {
  if (foreign(el)) remember(el, "a:" + dataName(key), () => el.getAttribute(dataName(key)));
  if (el) el.dataset[key] = value;
  return value;
}

export function __lqDataDel(el: any, key: string): boolean {
  if (foreign(el)) remember(el, "a:" + dataName(key), () => el.getAttribute(dataName(key)));
  return el ? delete el.dataset[key] : true;
}

export function __lqProp(el: any, prop: string, value: any): any {
  if (foreign(el)) remember(el, "x:" + prop, () => (el as any)[prop]);
  if (el) el[prop] = value;
  return value;
}

export function __lqHtml(el: any, _prop: string, html: any): any {
  if (!el) return html;
  if (foreign(el)) remember(el, "h:", () => el.innerHTML);
  el.innerHTML = html;
  el.querySelectorAll?.("*").forEach((child: Element) => created.add(child));
  return html;
}

export function __lqClone(node: any, ...args: any[]): any {
  const copy = node?.cloneNode(...args);
  if (copy) adopt(copy);
  return copy;
}

export function __lqAnimate(target: any, ...args: any[]): any {
  if (!target) return undefined;
  const animation = target.animate(...args);
  if (typeof Element !== "undefined" && target instanceof Element && animation) {
    if (stopped) animation.cancel();
    else {
      animations.push(new WeakRef(animation));
      if (animations.length % 1024 === 0) {
        const live = animations.filter((ref) => ref.deref()?.playState !== "idle");
        animations.length = 0;
        animations.push(...live);
      }
    }
  }
  return animation;
}

function restore(el: Element, map: Map<string, any>): void {
  const style = (el as HTMLElement).style;
  for (const [key, value] of map) {
    const kind = key.slice(0, 2);
    const name = key.slice(2);
    try {
      if (kind === "s:") (style as any)[name] = value;
      else if (kind === "p:") {
        if (value[0]) style.setProperty(name, value[0], value[1]);
        else style.removeProperty(name);
      } else if (kind === "c:") el.classList.remove(name);
      else if (kind === "a:") {
        if (value === null) el.removeAttribute(name);
        else el.setAttribute(name, value);
      } else if (kind === "x:") (el as any)[name] = value;
      else if (kind === "h:") el.innerHTML = value;
    } catch {}
  }
  for (const [key, had] of map) {
    if (key.startsWith("n:") && !had && el.getAttribute(key.slice(2)) === "") el.removeAttribute(key.slice(2));
  }
}

function cleanup(options: LifecycleOptions): void {
  if (stopped) return;
  stopped = true;

  for (const stop of stops.splice(0).reverse()) {
    try { stop(); } catch (e) { console.error(e); }
  }
  controller.abort();
  timeouts.forEach((id) => G.clearTimeout(id));
  intervals.forEach((id) => G.clearInterval(id));
  frames.forEach((id) => G.cancelAnimationFrame(id));
  idles.forEach((id) => G.cancelIdleCallback?.(id));
  observers.forEach((observer) => observer.disconnect());
  timeouts.clear();
  intervals.clear();
  frames.clear();
  idles.clear();
  observers.clear();

  for (const ref of animations.splice(0)) {
    try { ref.deref()?.cancel(); } catch {}
  }

  for (const ref of touched.splice(0).reverse()) {
    const el = ref.deref();
    const map = el && originals.get(el);
    if (el && map) restore(el, map);
  }

  for (const el of Array.from(document.querySelectorAll("*"))) {
    if (created.has(el) && el.isConnected) el.remove();
  }
  if (options.remove) document.querySelectorAll(options.remove).forEach((el) => el.remove());

  for (const [obj, key, descriptor] of patches.splice(0).reverse()) {
    try {
      if (descriptor) Object.defineProperty(obj, key, descriptor);
      else delete obj[key];
    } catch {}
  }

  if (options.globals) {
    for (const key of Object.keys(G)) {
      if (options.globals.test(key)) {
        try { delete G[key]; } catch {}
      }
    }
  }
}

export async function lifecycle(
  ctx: AddonContext,
  main: (ctx: AddonContext) => void | Fn | Promise<void | Fn>,
  options: LifecycleOptions = {},
): Promise<() => void> {
  context = ctx;
  const stop = () => cleanup(options);
  if (ctx.signal.aborted) {
    stop();
    return stop;
  }
  ctx.signal.addEventListener("abort", stop, { once: true });
  try {
    const own = await main(ctx);
    if (typeof own === "function") stops.push(own);
  } catch (e) {
    stop();
    throw e;
  }
  if (stopped) stop();
  return stop;
}
