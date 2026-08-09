import { normalizeVoiceMode } from "./voice-modes.js";
import { compactGameState } from "./game-state.js";
import { normalizeLanguage } from "./i18n.js";

const GAME_KEY = "dardops.game.v1";
const THEME_KEY = "dardops.theme";
const SOUND_KEY = "dardops.sound";
const VOICE_KEY = "dardops.voice";
const LANGUAGE_KEY = "dardops.language";

export function loadGame() {
  try {
    const serializedGame = localStorage.getItem(GAME_KEY);
    return serializedGame ? compactGameState(JSON.parse(serializedGame)) : null;
  } catch {
    localStorage.removeItem(GAME_KEY);
    return null;
  }
}

export function saveGame(game) {
  const compactGame = compactGameState(game);
  const savedWithHistory = trySaveGame(compactGame);
  return savedWithHistory || trySaveGame(compactGameState(game, false));
}

function trySaveGame(game) {
  let saved = true;
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(game));
  } catch {
    saved = false;
  }
  return saved;
}

export function clearGame() {
  localStorage.removeItem(GAME_KEY);
}

export function loadPreferences() {
  const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return {
    theme: localStorage.getItem(THEME_KEY) ?? (systemDark ? "dark" : "light"),
    sound: localStorage.getItem(SOUND_KEY) !== "false",
    voiceMode: normalizeVoiceMode(localStorage.getItem(VOICE_KEY)),
    language: normalizeLanguage(localStorage.getItem(LANGUAGE_KEY))
  };
}

export function savePreference(name, value) {
  const keys = { theme: THEME_KEY, sound: SOUND_KEY, voiceMode: VOICE_KEY, language: LANGUAGE_KEY };
  localStorage.setItem(keys[name], String(value));
}
