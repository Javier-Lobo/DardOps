import { describe, expect, it } from "vitest";
import { getInsult } from "./insults.js";
import { getWinnerInsult } from "./winner-insults.js";

const lowTurn = {
  bust: false,
  playerName: "Raquel",
  rawPoints: 12
};

describe("pullas", () => {
  it("no repite consecutivamente una pulla de turno", () => {
    const first = getInsult(lowTurn, "", 0);
    const second = getInsult(lowTurn, first, 0);
    expect(second).not.toBe(first);
    expect(second).toContain("Raquel");
  });

  it("genera una pulla específica para el ganador sin repetir la anterior", () => {
    const first = getWinnerInsult("Dani", "", 0);
    const second = getWinnerInsult("Dani", first, 0);
    expect(second).not.toBe(first);
    expect(second).toContain("Dani");
  });
});
