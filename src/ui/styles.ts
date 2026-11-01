import css from "./styles.css";

export function injectStyles() {
  const STYLE_ID = "liquid-lyrics-styles";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}
