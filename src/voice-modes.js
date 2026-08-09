export const VOICE_MODES = Object.freeze({
  SILENT: "silent",
  FULL: "full",
  TURN_ONLY: "turn-only"
});

const MODE_ORDER = [VOICE_MODES.FULL, VOICE_MODES.TURN_ONLY, VOICE_MODES.SILENT];

const MODE_VIEWS = Object.freeze({
  [VOICE_MODES.FULL]: { icon: "mic", badge: "A", label: "Voz completa" },
  [VOICE_MODES.TURN_ONLY]: { icon: "mic", badge: "T", label: "Solo turno, total y pulla" },
  [VOICE_MODES.SILENT]: { icon: "muted", badge: "0", label: "Voz en silencio" }
});

export function normalizeVoiceMode(storedValue) {
  let mode = VOICE_MODES.FULL;
  if (storedValue === "false" || storedValue === VOICE_MODES.SILENT) {
    mode = VOICE_MODES.SILENT;
  } else if (storedValue === VOICE_MODES.TURN_ONLY) {
    mode = VOICE_MODES.TURN_ONLY;
  }
  return mode;
}

export function getNextVoiceMode(currentMode) {
  const currentIndex = MODE_ORDER.indexOf(currentMode);
  return MODE_ORDER[(currentIndex + 1) % MODE_ORDER.length];
}

export function getVoiceModeView(mode) {
  return MODE_VIEWS[mode] ?? MODE_VIEWS[VOICE_MODES.FULL];
}
