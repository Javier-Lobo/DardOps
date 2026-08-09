import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadGame, saveGame } from "./preferences.js";

const game = {
  version: 2,
  players: [{ id: "player-1", name: "Raquel", turnsPlayed: 0 }],
  history: [{ players: [{ id: "player-1", name: "Raquel", turnsPlayed: 0 }], history: [] }]
};

describe("persistencia de partida", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("reintenta sin historial cuando el navegador rechaza el estado completo", () => {
    const storedValues = [];
    const setItem = vi.fn((key, value) => {
      storedValues.push(value);
      if (storedValues.length === 1) {
        throw new DOMException("Cuota agotada", "QuotaExceededError");
      }
    });
    vi.stubGlobal("localStorage", { setItem });
    expect(saveGame(game)).toBe(true);
    expect(JSON.parse(storedValues[1]).history).toEqual([]);
  });

  it("migra una partida antigua al cargarla", () => {
    const legacy = { ...game, version: 1, players: [{ id: "player-1", name: "Raquel", turns: [{}, {}] }] };
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => JSON.stringify(legacy)),
      removeItem: vi.fn()
    });
    expect(loadGame().players[0]).toMatchObject({ turnsPlayed: 2 });
  });
});
