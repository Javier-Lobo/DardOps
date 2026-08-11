import { describe, expect, it } from "vitest";
import { createSpeechVoiceResolver, selectSpeechVoice } from "./speech-voices.js";

function createVoice(name, lang, overrides = {}) {
  return { name, lang, default: false, localService: true, ...overrides };
}

describe("selección de voz", () => {
  it("descarta Whisper aunque el navegador la devuelva primero", () => {
    const whisper = createVoice("Whisper", "en-US", { default: true });
    const daniel = createVoice("Daniel", "en-GB");
    expect(selectSpeechVoice([whisper, daniel], "en")).toBe(daniel);
  });

  it("elige la misma voz inglesa aunque cambie el orden del catálogo", () => {
    const samantha = createVoice("Samantha", "en-US", { default: true });
    const daniel = createVoice("Daniel", "en-GB");
    expect(selectSpeechVoice([samantha, daniel], "en")).toBe(daniel);
    expect(selectSpeechVoice([daniel, samantha], "en")).toBe(daniel);
  });

  it("no asigna una voz cuando solo existen voces de efectos", () => {
    const voices = [createVoice("Whisper", "en-US"), createVoice("Zarvox", "en-US")];
    expect(selectSpeechVoice(voices, "en")).toBeNull();
  });

  it("mantiene la primera voz segura durante toda la sesión", () => {
    const resolveVoice = createSpeechVoiceResolver();
    const samantha = createVoice("Samantha", "en-US");
    const daniel = createVoice("Daniel", "en-GB");
    expect(resolveVoice([samantha], "en")).toBe(samantha);
    expect(resolveVoice([daniel, samantha], "en")).toBe(samantha);
  });
});
