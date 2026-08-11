export function isMissAreaClick(target) {
  const insideMissArea = target.closest("[data-miss-area]");
  const scoringSegment = target.closest("[data-value]");
  return Boolean(insideMissArea && !scoringSegment);
}
