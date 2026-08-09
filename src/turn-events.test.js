import { describe, expect, it } from "vitest";
import { createGame, throwDart } from "./game-engine.js";
import { hasCompletedTurn } from "./turn-events.js";

const single20 = { value: 20, multiplier: 1, label: "20" };

describe("eventos de turno", () => {
  it("no repite el resumen anterior al lanzar en el turno siguiente", () => {
    let game = createGame(["Raquel", "Dani"], "501");
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    const nextDart = throwDart(game, single20);
    expect(hasCompletedTurn(game, nextDart)).toBe(false);
  });

  it("detecta el resumen justo al completar el tercer dardo", () => {
    let game = createGame(["Raquel", "Dani"], "501");
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    const completed = throwDart(game, single20);
    expect(hasCompletedTurn(game, completed)).toBe(true);
  });
});
