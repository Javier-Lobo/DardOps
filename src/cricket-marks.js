const MARK_LABELS = ["Sin marcar", "Una marca", "Dos marcas", "Tres marcas"];

export function getCricketMarkView(markCount) {
  const normalizedCount = Math.max(0, Math.min(3, markCount));
  return {
    className: `mark-${normalizedCount}`,
    dots: normalizedCount === 0 ? "·" : "●".repeat(normalizedCount),
    label: MARK_LABELS[normalizedCount]
  };
}
