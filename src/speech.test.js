import { describe, expect, it } from "vitest";
import { buildDartAnnouncement, buildTurnAnnouncement, buildTurnSpeech } from "./speech.js";
import { VOICE_MODES } from "./voice-modes.js";

describe("locución de Cricket", () => {
  it("anuncia marcas sin cantar puntos no concedidos", () => {
    const dart = { value: 20, label: "Triple 20", points: 60, awardedPoints: 0, marksAdded: 3 };
    expect(buildDartAnnouncement(dart, "cricket")).toBe("Triple 20. Tres marcas.");
  });

  it("anuncia únicamente los puntos realmente añadidos", () => {
    const dart = { value: 20, label: "Doble 20", points: 40, awardedPoints: 40, marksAdded: 0 };
    expect(buildDartAnnouncement(dart, "cricket")).toBe("Doble 20. 40 puntos.");
  });

  it("omite los cero puntos del resumen de Cricket", () => {
    const turn = { playerName: "Raquel", bust: false, gameKind: "cricket", points: 0 };
    expect(buildTurnAnnouncement(turn)).toBe("Raquel, turno completado.");
  });

  it("limita el modo de turno al total y la pulla", () => {
    const message = buildTurnSpeech("Raquel, 60 puntos en este turno.", "Raquel tiene 441.", "Qué desastre.", VOICE_MODES.TURN_ONLY);
    expect(message).toBe("Raquel, 60 puntos en este turno. Qué desastre.");
  });
});
