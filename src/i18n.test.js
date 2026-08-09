import { describe, expect, it } from "vitest";
import { formatDartLabel, getGameText, getNextLanguage, translate } from "./i18n.js";

describe("internationalization", () => {
  it("translates interface text and parameters", () => {
    expect(translate("en", "turnOf")).toBe("Turn of");
    expect(translate("en", "round", { round: 3 })).toBe("ROUND 3");
    expect(getGameText("clock", "en").name).toBe("Around the clock");
  });

  it("localizes dart labels and alternates languages", () => {
    expect(formatDartLabel({ value: 20, multiplier: 3 }, "en")).toBe("Triple 20");
    expect(formatDartLabel({ value: 0, multiplier: 1 }, "en")).toBe("Miss");
    expect(getNextLanguage("es")).toBe("en");
  });
});
