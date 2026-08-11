import { describe, expect, it } from "vitest";
import { getRestartModalView } from "./restart-modal.js";

describe("contenido del modal de nueva partida", () => {
  it("mantiene el aviso destructivo durante una partida activa", () => {
    const view = getRestartModalView("es", false);
    expect(view.title).toBe("¿Abandonar la partida?");
    expect(view.confirmClass).toBe("danger");
  });

  it("ofrece una revancha coherente al terminar en ambos idiomas", () => {
    const spanishView = getRestartModalView("es", true);
    const englishView = getRestartModalView("en", true);
    expect(spanishView.title).toBe("¿Otra humillación?");
    expect(spanishView.confirmClass).toBe("primary confirm");
    expect(englishView.title).toBe("Ready for another humiliation?");
  });
});
