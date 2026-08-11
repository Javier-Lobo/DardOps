import { describe, expect, it } from "vitest";
import { renderAbout } from "./about.js";

describe("sección acerca de", () => {
  it("renderiza logo, autor y tecnologías en español", () => {
    const markup = renderAbout("es");
    expect(markup).toContain("Acerca de DardOps");
    expect(markup).toContain("Creado por Javier Lobo");
    expect(markup).toContain("AudioCSS");
    expect(markup).toContain("dardops.png");
    expect(markup).toContain("javierlobo.png");
  });

  it("renderiza la sección completa en inglés", () => {
    const markup = renderAbout("en");
    expect(markup).toContain("About DardOps");
    expect(markup).toContain("Built by Javier Lobo");
    expect(markup).toContain("Libraries and runtime pieces");
  });
});
