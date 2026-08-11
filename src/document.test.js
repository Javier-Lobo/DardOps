import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const documentMarkup = readFileSync(new URL("../index.html", import.meta.url), "utf8");

describe("documento principal", () => {
  it("publica el favicon de DardOps como PNG", () => {
    expect(documentMarkup).toContain('rel="icon"');
    expect(documentMarkup).toContain('type="image/png"');
    expect(documentMarkup).toContain('/src/assets/favicon.png');
  });
});
