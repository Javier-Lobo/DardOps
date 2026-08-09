import { describe, expect, it } from "vitest";
import { getCricketMarkView } from "./cricket-marks.js";

describe("indicadores de Cricket", () => {
  it.each([
    [1, "mark-1", "●", "Una marca"],
    [2, "mark-2", "●●", "Dos marcas"],
    [3, "mark-3", "●●●", "Tres marcas"]
  ])("representa %i marcas con puntos y color propio", (count, className, dots, label) => {
    expect(getCricketMarkView(count)).toEqual({ className, dots, label });
  });

  it("traduce las etiquetas accesibles al inglés", () => {
    expect(getCricketMarkView(2, "en").label).toBe("Two marks");
  });
});
