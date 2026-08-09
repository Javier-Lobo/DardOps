import { describe, expect, it } from "vitest";
import { createGame, getGameStatus, getTurnStatus, throwDart, undoDart } from "./game-engine.js";

const single20 = { value: 20, multiplier: 1, label: "20" };

describe("motor de juego", () => {
  it("resta tres dardos y cambia de jugador en 501", () => {
    let game = createGame(["Raquel", "Dani"], "501");
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    expect(game.players[0].score).toBe(441);
    expect(game.currentPlayer).toBe(1);
    expect(game.lastTurn.points).toBe(60);
  });

  it("anula el turno completo si el jugador se pasa", () => {
    let game = createGame(["Raquel"], "301");
    game.players[0].score = 30;
    game.turnStartScore = 30;
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    expect(game.players[0].score).toBe(30);
    expect(game.lastTurn.bust).toBe(true);
  });

  it("exige un doble para cerrar x01", () => {
    let game = createGame(["Raquel"], "301");
    game.players[0].score = 20;
    game.turnStartScore = 20;
    game = throwDart(game, single20);
    expect(game.winnerId).toBeNull();
    expect(game.players[0].score).toBe(20);
  });

  it("declara ganador al cerrar x01 con un doble", () => {
    let game = createGame(["Raquel"], "301");
    game.players[0].score = 20;
    game.turnStartScore = 20;
    game = throwDart(game, { value: 10, multiplier: 2, label: "D10" });
    expect(game.winnerId).toBe("player-1");
    expect(game.players[0].turnsPlayed).toBe(1);
  });

  it("cierra 20 y puntúa los impactos extra en Cricket", () => {
    let game = createGame(["Raquel", "Dani"], "cricket");
    game = throwDart(game, { value: 20, multiplier: 3, label: "T20" });
    expect(game.darts[0].awardedPoints).toBe(0);
    expect(game.darts[0].marksAdded).toBe(3);
    game = throwDart(game, { value: 20, multiplier: 2, label: "D20" });
    expect(game.players[0].cricket[20]).toBe(3);
    expect(game.players[0].score).toBe(40);
    expect(game.darts[1].awardedPoints).toBe(40);
    game = throwDart(game, { value: 1, multiplier: 1, label: "1" });
    expect(game.lastTurn.points).toBe(40);
  });

  it("no puntúa un objetivo de Cricket cerrado por todos", () => {
    let game = createGame(["Raquel", "Dani"], "cricket");
    game.players[0].cricket[20] = 3;
    game.players[1].cricket[20] = 3;
    game = throwDart(game, { value: 20, multiplier: 3, label: "T20" });
    expect(game.players[0].score).toBe(0);
    expect(game.darts[0].awardedPoints).toBe(0);
  });

  it("permite deshacer el último dardo", () => {
    const game = createGame(["Raquel"], "501");
    const changed = throwDart(game, single20);
    expect(undoDart(changed).players[0].score).toBe(501);
  });

  it("limita el historial de deshacer para evitar un estado creciente sin límite", () => {
    let game = createGame(["Raquel"], "501");
    for (let dartIndex = 0; dartIndex < 60; dartIndex += 1) {
      game = throwDart(game, { value: 0, multiplier: 1, label: "Fuera" });
    }
    expect(game.history).toHaveLength(30);
    expect(game.players[0].turnsPlayed).toBe(20);
  });

  it("avanza al siguiente objetivo en Vuelta al reloj", () => {
    let game = createGame(["Raquel"], "clock");
    game = throwDart(game, { value: 1, multiplier: 3, label: "T1" });
    expect(game.players[0].clockTarget).toBe(2);
  });

  it("termina Puntuación alta al completar ocho rondas", () => {
    let game = createGame(["Raquel"], "high");
    for (let dartIndex = 0; dartIndex < 24; dartIndex += 1) {
      game = throwDart(game, single20);
    }
    expect(game.winnerId).toBe("player-1");
    expect(game.players[0].score).toBe(480);
  });

  it("genera el estado general en inglés sin alterar la partida", () => {
    const game = createGame(["Raquel"], "501");
    expect(getGameStatus(game, "en")).toBe("Raquel has 501 points left. Round 1.");
  });

  it("localiza el estado del jugador cuyo turno acaba de terminar", () => {
    let game = createGame(["Raquel", "Dani"], "501");
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    game = throwDart(game, single20);
    expect(getTurnStatus(game, game.lastTurn, "en")).toBe("Raquel has 441 points left. Round 1.");
  });
});
