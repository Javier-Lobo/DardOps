import { translate } from "./i18n.js";

const MARK_KEYS = ["noMarks", "oneMark", "twoMarks", "threeMarks"];

export function getCricketMarkView(markCount, language = "es") {
  const normalizedCount = Math.max(0, Math.min(3, markCount));
  return {
    className: `mark-${normalizedCount}`,
    dots: normalizedCount === 0 ? "·" : "●".repeat(normalizedCount),
    label: translate(language, MARK_KEYS[normalizedCount])
  };
}
