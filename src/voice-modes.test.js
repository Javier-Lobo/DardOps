import { describe, expect, it } from "vitest";
import { getNextVoiceMode, normalizeVoiceMode, VOICE_MODES } from "./voice-modes.js";

describe("modos de voz", () => {
  it("recorre completa, solo turno y silencio en el mismo botón", () => {
    expect(getNextVoiceMode(VOICE_MODES.FULL)).toBe(VOICE_MODES.TURN_ONLY);
    expect(getNextVoiceMode(VOICE_MODES.TURN_ONLY)).toBe(VOICE_MODES.SILENT);
    expect(getNextVoiceMode(VOICE_MODES.SILENT)).toBe(VOICE_MODES.FULL);
  });

  it("migra la preferencia booleana anterior", () => {
    expect(normalizeVoiceMode("false")).toBe(VOICE_MODES.SILENT);
    expect(normalizeVoiceMode("true")).toBe(VOICE_MODES.FULL);
  });
});
