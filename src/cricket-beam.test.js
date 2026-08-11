import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getCricketBeamView, isActiveCricketColumn, renderCricketBeam } from "./cricket-beam.js";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("border beam de Cricket", () => {
  it("sitúa el haz sobre la columna del jugador activo", () => {
    const view = getCricketBeamView(3, 1, null);
    expect(view.visible).toBe(true);
    expect(view.playerCount).toBe(3);
    expect(view.playerIndex).toBe(1);
    expect(isActiveCricketColumn(1, 1, null)).toBe(true);
    expect(isActiveCricketColumn(0, 1, null)).toBe(false);
  });

  it("desactiva el resaltado cuando existe ganador", () => {
    expect(getCricketBeamView(2, 0, "player-1").visible).toBe(false);
    expect(isActiveCricketColumn(0, 0, "player-1")).toBe(false);
  });

  it("dibuja una ruta SVG que recorre el perímetro completo", () => {
    const markup = renderCricketBeam(getCricketBeamView(2, 0, null));
    expect(markup).toContain('class="cricket-turn-beam"');
    expect(markup).toContain('class="cricket-beam-track"');
    expect(markup).toContain('class="cricket-beam-runner"');
    expect(markup).toContain('data-player-count="2"');
    expect(markup).toContain('data-player-index="0"');
    expect(markup).toContain('pathLength="100"');
    expect(markup.match(/<rect/g)).toHaveLength(2);
    expect(markup).not.toContain("style=");
  });

  it("no renderiza el haz después de finalizar la partida", () => {
    expect(renderCricketBeam(getCricketBeamView(2, 0, "player-1"))).toBe("");
  });

  it("mapea cada tamaño y jugador a una única celda de la cuadrícula", () => {
    for (let playerCount = 1; playerCount <= 8; playerCount += 1) {
      expect(styles).toContain(`[data-player-count="${playerCount}"] { grid-template-columns: repeat(${playerCount + 1},`);
    }
    for (let playerIndex = 0; playerIndex < 8; playerIndex += 1) {
      expect(styles).toContain(`[data-player-index="${playerIndex}"] { grid-column: ${playerIndex + 2}; }`);
    }
  });
});
