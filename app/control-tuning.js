// Kimi preview only. Direct tracking, shared across both avatar camera paths.
export function cameraLookDelta(delta, mouse = false) {
  return {x: delta.x * (mouse ? .0052 : .007), y: delta.y * (mouse ? .0035 : .0048)};
}
// Start from where the driver grabbed the wheel; no snap to the pad centre.
export function steeringFromDrag(x, startX) {
  if (!Number.isFinite(x) || !Number.isFinite(startX)) return 0;
  const value = Math.max(-1, Math.min(1, (x - startX) / 44));
  return value * (.72 + .28 * Math.abs(value));
}
