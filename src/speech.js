import { formatDartLabel, translate } from "./i18n.js";
import { createSpeechVoiceResolver } from "./speech-voices.js";
import { VOICE_MODES } from "./voice-modes.js";

const resolveSpeechVoice = createSpeechVoiceResolver();

export function speakDart(dart, gameKind, voiceMode, language = "es") {
  if (!canSpeakDarts(voiceMode)) {
    return;
  }
  window.speechSynthesis.cancel();
  const message = buildDartAnnouncement(dart, gameKind, language);
  window.speechSynthesis.speak(createLocalizedUtterance(message, language));
}

export function speakTurn(turn, status, insult, voiceMode, language = "es") {
  if (!canSpeak(voiceMode)) {
    return;
  }
  const pointsMessage = buildTurnAnnouncement(turn, language);
  const message = buildTurnSpeech(pointsMessage, status, insult, voiceMode);
  const utterance = createLocalizedUtterance(message, language);
  window.speechSynthesis.speak(utterance);
}

export function buildTurnSpeech(pointsMessage, status, insult, voiceMode) {
  const parts = voiceMode === VOICE_MODES.FULL
    ? [pointsMessage, status, insult]
    : [pointsMessage, insult];
  return parts.join(" ");
}

export function buildDartAnnouncement(dart, gameKind, language = "es") {
  let message;
  if (dart.value === 0) {
    message = translate(language, "speechOutside");
  } else if (gameKind === "cricket") {
    message = buildCricketDartAnnouncement(dart, language);
  } else {
    message = `${formatDartLabel(dart, language)}. ${translate(language, "points", { points: dart.points })}.`;
  }
  return message;
}

export function buildTurnAnnouncement(turn, language = "es") {
  let message;
  if (turn.bust) {
    message = translate(language, "speechTurnBust", { name: turn.playerName });
  } else if (turn.gameKind === "cricket" && turn.points === 0) {
    message = translate(language, "speechTurnComplete", { name: turn.playerName });
  } else if (turn.gameKind === "cricket") {
    message = translate(language, "speechCricketPoints", { name: turn.playerName, points: turn.points });
  } else {
    message = translate(language, "speechTurnPoints", { name: turn.playerName, points: turn.points });
  }
  return message;
}

function buildCricketDartAnnouncement(dart, language) {
  const parts = [formatDartLabel(dart, language)];
  if (dart.marksAdded > 0) {
    parts.push(formatMarksAnnouncement(dart.marksAdded, language));
  }
  if (dart.awardedPoints > 0) {
    parts.push(translate(language, "points", { points: dart.awardedPoints }));
  }
  return `${parts.join(". ")}.`;
}

function formatMarksAnnouncement(marks, language) {
  const keys = { 1: "oneMark", 2: "twoMarks", 3: "threeMarks" };
  return translate(language, keys[marks]);
}

export function speakPlayerTurn(playerName, voiceMode, language = "es") {
  if (!canSpeak(voiceMode)) {
    return;
  }
  const message = translate(language, "speechPlayerTurn", { name: playerName });
  window.speechSynthesis.speak(createLocalizedUtterance(message, language));
}

export function speakWinner(playerName, insult, voiceMode, language = "es") {
  if (voiceMode !== VOICE_MODES.FULL || !canSpeak(voiceMode)) {
    return;
  }
  const message = translate(language, "speechWinner", { name: playerName, insult });
  window.speechSynthesis.speak(createLocalizedUtterance(message, language));
}

export function cancelSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function createLocalizedUtterance(message, language) {
  const voiceLanguage = language === "en" ? "en-GB" : "es-ES";
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = voiceLanguage;
  utterance.rate = 0.96;
  utterance.pitch = 0.88;
  utterance.volume = 0.95;
  const localizedVoice = resolveSpeechVoice(window.speechSynthesis.getVoices(), language);
  if (localizedVoice) {
    utterance.voice = localizedVoice;
  }
  return utterance;
}

function canSpeak(voiceMode) {
  return voiceMode !== VOICE_MODES.SILENT && "speechSynthesis" in window;
}

function canSpeakDarts(voiceMode) {
  return voiceMode === VOICE_MODES.FULL && "speechSynthesis" in window;
}
