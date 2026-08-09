import { describe, expect, it } from "vitest";
import { createDartboardMarkup } from "./dartboard.js";

describe("colores de la diana", () => {
  it("renderiza el 20 claro y rojo, y el 1 oscuro y verde", () => {
    const board = createDartboardMarkup();
    expect(board).toMatch(/single-light[^>]+data-value="20"/);
    expect(board).toMatch(/triple-red[^>]+data-value="20"/);
    expect(board).toMatch(/single-dark[^>]+data-value="1"/);
    expect(board).toMatch(/triple-green[^>]+data-value="1"/);
  });

  it("traduce la diana y los impactos al inglés", () => {
    const board = createDartboardMarkup("en");
    expect(board).toContain('aria-label="Interactive dartboard"');
    expect(board).toContain('data-label="Double 20"');
    expect(board).toContain("MISS · 0");
  });
});
