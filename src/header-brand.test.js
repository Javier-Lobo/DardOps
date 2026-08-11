import { describe, expect, it } from "vitest";
import { renderHeaderBrand } from "./header-brand.js";

describe("marca de la cabecera", () => {
  it("usa la diana gráfica como logo decorativo", () => {
    const markup = renderHeaderBrand();
    expect(markup).toContain("diana.png");
    expect(markup).toContain('class="brand-mark"');
    expect(markup).toContain('alt=""');
  });
});
