import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getCricketNameOffset } from "./cricket-name-scroll.js";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("scroll de nombres de Cricket", () => {
  it("calcula el recorrido completo cuando el nombre desborda", () => {
    expect(getCricketNameOffset(124, 72)).toBe(-52);
  });

  it("mantiene quietos los nombres que caben", () => {
    expect(getCricketNameOffset(64, 72)).toBe(0);
  });

  it("deja separación lateral entre cabeceras sin mover sus columnas", () => {
    expect(styles).toContain(".cricket-grid thead th { padding-inline: clamp(6px, .65vw, 9px); }");
  });
});
