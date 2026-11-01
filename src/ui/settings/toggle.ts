import { clamp } from "@/lib/settings";

export const TOGGLE_FILTER_SVG = "";

export type LiquidToggle = { el: HTMLButtonElement; sync: () => void };

const INSET = 2;
const WIDTH = 64;
const HEIGHT = 28;
const KNOB_WIDTH = 40;
const PRESSED_SCALE = 1.5;
const DRAG_THRESHOLD = 3;

class Spring {
  value = 0;
  velocity = 0;
  target = 0;
  constructor(
    private readonly dampingRatio: number,
    private readonly stiffness: number,
  ) {}

  get settled(): boolean {
    return Math.abs(this.value - this.target) < 0.0005 && Math.abs(this.velocity) < 0.005;
  }

  snap(value: number) {
    this.value = this.target = value;
    this.velocity = 0;
  }

  step(dt: number) {
    const damping = 2 * this.dampingRatio * Math.sqrt(this.stiffness);
    const h = dt / 4;
    for (let i = 0; i < 4; i++) {
      const acceleration = -this.stiffness * (this.value - this.target) - damping * this.velocity;
      this.velocity += acceleration * h;
      this.value += this.velocity * h;
    }
  }
}

function geometry() {
  const dpr = window.devicePixelRatio || 1;
  const inset = Math.max(1, Math.round(INSET * dpr)) / dpr;
  return { inset, height: HEIGHT - 2 * inset, travel: WIDTH - 2 * inset - KNOB_WIDTH };
}

export function createToggle(read: () => boolean, write: (value: boolean) => void): LiquidToggle {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "ll-toggle";
  el.setAttribute("role", "switch");
  el.innerHTML =
    '<span class="ll-toggle-track" aria-hidden="true"></span>' +
    '<span class="ll-toggle-knob" aria-hidden="true">' +
    '<span class="ll-toggle-lens"><span></span></span>' +
    '<span class="ll-toggle-surface"></span>' +
    '<span class="ll-toggle-rim"></span>' +
    "</span>";

  const knob = el.querySelector<HTMLElement>(".ll-toggle-knob")!;
  const lens = el.querySelector<HTMLElement>(".ll-toggle-lens > span")!;
  const surface = el.querySelector<HTMLElement>(".ll-toggle-surface")!;
  const rim = el.querySelector<HTMLElement>(".ll-toggle-rim")!;

  const value = new Spring(1, 1000);
  const velocity = new Spring(0.5, 300);
  const pressSpring = new Spring(1, 1000);
  const scaleX = new Spring(0.6, 250);
  const scaleY = new Spring(0.7, 250);
  const springs = [value, velocity, pressSpring, scaleX, scaleY];
  value.snap(read() ? 1 : 0);
  scaleX.snap(1);
  scaleY.snap(1);

  let frame = 0;
  let lastFrame = 0;
  let releasePending = false;
  let dragging = false;
  let dragged = false;
  let dragFraction = 0;
  let startX = 0;
  let lastX = 0;
  let pending: boolean | null = null;

  const paint = () => {
    const fraction = clamp(value.value, 0, 1);
    const press = clamp(pressSpring.value, 0, 1);
    const speed = Math.abs(velocity.value) / 50;
    const sx = scaleX.value / (1 - clamp(speed * 0.75, 0, 0.2));
    const sy = scaleY.value * (1 - clamp(speed * 0.25, 0, 0.2));
    const g = geometry();
    const x = g.inset + fraction * g.travel;

    el.style.setProperty("--f", String(fraction));
    knob.style.top = `${g.inset}px`;
    knob.style.height = `${g.height}px`;
    knob.style.transform = `translateX(${x}px) scale(${sx}, ${sy})`;
    lens.style.left = `${-x}px`;
    lens.style.top = `${-g.inset}px`;
    lens.style.transformOrigin = `${x + KNOB_WIDTH / 2}px ${g.inset + g.height / 2}px`;
    lens.style.transform = `scale(${1 - 0.25 * press})`;
    surface.style.opacity = String(1 - press);
    rim.style.opacity = String(press);
  };

  const commit = () => {
    const next = pending;
    pending = null;
    if (next === null || next === read()) return;
    write(next);
    sync();
  };

  const rest = () => {
    for (const spring of springs) spring.snap(spring.target);
    paint();
    knob.style.willChange = "";
  };

  const onFrame = (time: number) => {
    const dt = lastFrame ? clamp((time - lastFrame) / 1000, 0, 0.05) : 1 / 60;
    lastFrame = time;

    value.step(dt);
    velocity.target = value.velocity;
    velocity.step(dt);
    pressSpring.step(dt);
    scaleX.step(dt);
    scaleY.step(dt);

    if (releasePending && !dragging && Math.abs(value.value - value.target) < 0.025) {
      releasePending = false;
      pressSpring.target = 0;
      scaleX.target = 1;
      scaleY.target = 1;
    }

    paint();

    if (
      pending !== null &&
      !dragging &&
      !releasePending &&
      Math.abs(value.value - value.target) < 0.005 &&
      pressSpring.value < 0.01 &&
      Math.abs(scaleX.value - 1) < 0.01 &&
      Math.abs(scaleY.value - 1) < 0.01
    ) {
      commit();
    }

    const settled = springs.every((spring) => spring.settled) && !releasePending;
    frame = settled || !el.isConnected ? 0 : requestAnimationFrame(onFrame);
    if (!frame) {
      rest();
      commit();
    }
  };

  const startAnimating = () => {
    if (frame) return;
    knob.style.willChange = "transform";
    lastFrame = 0;
    frame = requestAnimationFrame(onFrame);
  };

  const press = () => {
    releasePending = false;
    pressSpring.target = 1;
    scaleX.target = PRESSED_SCALE;
    scaleY.target = PRESSED_SCALE;
    startAnimating();
  };

  const release = () => {
    releasePending = true;
    startAnimating();
  };

  const animateTo = (checked: boolean) => {
    press();
    value.target = checked ? 1 : 0;
    release();
  };

  let fallback = 0;
  // Without frames (a hidden window) the springs never settle.
  const settleSoon = () => {
    window.clearTimeout(fallback);
    fallback = window.setTimeout(() => {
      if (pending === null || dragging) return;
      cancelAnimationFrame(frame);
      frame = 0;
      releasePending = false;
      pressSpring.target = 0;
      scaleX.target = 1;
      scaleY.target = 1;
      rest();
      commit();
    }, 1000);
  };

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    const current = pending ?? read();
    const next = dragged ? value.target >= 0.5 : !current;
    value.target = next ? 1 : 0;
    pending = next;
    release();
    settleSoon();
  };

  el.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    try {
      el.setPointerCapture?.(event.pointerId);
    } catch {
    }
    dragging = true;
    dragged = false;
    dragFraction = value.target;
    startX = lastX = event.clientX;
    press();
  });

  el.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    if (!dragged && Math.abs(event.clientX - startX) < DRAG_THRESHOLD) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    if (!dx) return;
    dragged = true;
    dragFraction = clamp(dragFraction + dx / geometry().travel, 0, 1);
    value.target = dragFraction;
    startAnimating();
  });

  el.addEventListener("pointerup", (event) => {
    endDrag();
    try {
      el.releasePointerCapture?.(event.pointerId);
    } catch {
    }
  });
  el.addEventListener("pointercancel", endDrag);
  el.addEventListener("lostpointercapture", endDrag);

  el.addEventListener("click", (event) => {
    if (event.detail !== 0) return;
    const next = !(pending ?? read());
    pending = next;
    animateTo(next);
    settleSoon();
  });

  const sync = () => {
    const checked = read();
    el.setAttribute("aria-checked", String(checked));
    if (pending === null && !dragging && (value.target >= 0.5) !== checked) {
      if (el.isConnected) animateTo(checked);
      else {
        value.snap(checked ? 1 : 0);
        paint();
      }
    }
  };

  paint();
  sync();
  return { el, sync };
}
