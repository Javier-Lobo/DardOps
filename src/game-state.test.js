import { describe, expect, it } from "vitest";
import { compactGameState, MAX_UNDO_STEPS } from "./game-state.js";

describe("estado compacto de partida", () => {
  it("migra los turnos antiguos y conserva solo el historial reversible", () => {
    const legacyPlayer = { id: "player-1", name: "Raquel", turns: [{}, {}, {}] };
    const legacyGame = {
      version: 1,
      players: [legacyPlayer],
      heatmap: { "20:3:triple": 4 },
      history: Array.from({ length: 50 }, () => ({ players: [legacyPlayer], history: [] }))
    };
    const compact = compactGameState(legacyGame);
    expect(compact.version).toBe(2);
    expect(compact.players[0]).toMatchObject({ turnsPlayed: 3 });
    expect(compact.players[0].turns).toBeUndefined();
    expect(compact.heatmap).toBeUndefined();
    expect(compact.history).toHaveLength(MAX_UNDO_STEPS);
    expect(compact.history[0].players[0].turns).toBeUndefined();
  });
});
