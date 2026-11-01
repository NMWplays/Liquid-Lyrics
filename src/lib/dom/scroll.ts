export function scrollOffsetFor(
  scroller: HTMLElement,
  target: HTMLElement,
  block: "start" | "center" = "start",
): number | null {
  if (!target.isConnected || target.getClientRects().length === 0) return null;

  const scrollerBox = scroller.getBoundingClientRect();
  const targetBox = target.getBoundingClientRect();
  const style = getComputedStyle(target);
  const marginTop = parseFloat(style.scrollMarginTop) || 0;
  const marginBottom = parseFloat(style.scrollMarginBottom) || 0;

  const distance = targetBox.top - scrollerBox.top - scroller.clientTop;
  const boxTop = scroller.scrollTop + distance - marginTop;
  const boxHeight = targetBox.height + marginTop + marginBottom;

  const top = block === "center" ? boxTop - (scroller.clientHeight - boxHeight) / 2 : boxTop;
  return Math.max(0, Math.min(top, scroller.scrollHeight - scroller.clientHeight));
}
