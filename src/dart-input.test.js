import { describe, expect, it } from "vitest";
import { isMissAreaClick } from "./dart-input.js";

function createClickTarget({ insideMissArea, scoringSegment }) {
  return {
    closest(selector) {
      const matches = {
        "[data-miss-area]": insideMissArea,
        "[data-value]": scoringSegment
      };
      return matches[selector] ? {} : null;
    }
  };
}

describe("entrada de dardos", () => {
  it("considera miss cualquier clic de la card que no sea un sector", () => {
    expect(isMissAreaClick(createClickTarget({ insideMissArea: true, scoringSegment: false }))).toBe(true);
  });

  it("preserva los impactos puntuables y los clics externos", () => {
    expect(isMissAreaClick(createClickTarget({ insideMissArea: true, scoringSegment: true }))).toBe(false);
    expect(isMissAreaClick(createClickTarget({ insideMissArea: false, scoringSegment: false }))).toBe(false);
  });
});
