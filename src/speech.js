import { VOICE_MODES } from "./voice-modes.js";

export function speakDart(dart, gameKind, voiceMode) {
  if (!canSpeakDarts(voiceMode)) {
    return;
  }
  window.speechSynthesis.cancel();
  const message = buildDartAnnouncement(dart, gameKind);
  window.speechSynthesis.speak(createSpanishUtterance(message));
}

export function speakTurn(turn, insult, voiceMode) {
  if (!canSpeak(voiceMode)) {
    return;
  }
  const pointsMessage = buildTurnAnnouncement(turn);
  const message = buildTurnSpeech(pointsMessage, turn.status, insult, voiceMode);
  const utterance = createSpanishUtterance(message);
  window.speechSynthesis.speak(utterance);
}

export function buildTurnSpeech(pointsMessage, status, insult, voiceMode) {
  const parts = voiceMode === VOICE_MODES.FULL
    ? [pointsMessage, status, insult]
    : [pointsMessage, insult];
  return parts.join(" ");
}

export function buildDartAnnouncement(dart, gameKind) {
  let message;
  if (dart.value === 0) {
    message = "Fuera. Cero puntos.";
  } else if (gameKind === "cricket") {
    message = buildCricketDartAnnouncement(dart);
  } else {
    message = `${dart.label}. ${dart.points} puntos.`;
  }
  return message;
}

export function buildTurnAnnouncement(turn) {
  let message;
  if (turn.bust) {
    message = `${turn.playerName}, turno anulado. Cero puntos.`;
  } else if (turn.gameKind === "cricket" && turn.points === 0) {
    message = `${turn.playerName}, turno completado.`;
  } else if (turn.gameKind === "cricket") {
    message = `${turn.playerName}, ${turn.points} puntos añadidos en este turno.`;
  } else {
    message = `${turn.playerName}, ${turn.points} puntos en este turno.`;
  }
  return message;
}

function buildCricketDartAnnouncement(dart) {
  const parts = [dart.label];
  if (dart.marksAdded > 0) {
    parts.push(formatMarksAnnouncement(dart.marksAdded));
  }
  if (dart.awardedPoints > 0) {
    parts.push(`${dart.awardedPoints} puntos`);
  }
  return `${parts.join(". ")}.`;
}

function formatMarksAnnouncement(marks) {
  const labels = { 1: "Una marca", 2: "Dos marcas", 3: "Tres marcas" };
  return labels[marks];
}

export function speakPlayerTurn(playerName, voiceMode) {
  if (!canSpeak(voiceMode)) {
    return;
  }
  window.speechSynthesis.speak(createSpanishUtterance(`Turno de ${playerName}.`));
}

export function speakWinner(playerName, insult, voiceMode) {
  if (voiceMode !== VOICE_MODES.FULL || !canSpeak(voiceMode)) {
    return;
  }
  const message = `Fin de la partida. Ha ganado ${playerName}. ${insult}`;
  window.speechSynthesis.speak(createSpanishUtterance(message));
}

export function cancelSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function createSpanishUtterance(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "es-ES";
  utterance.rate = 0.96;
  utterance.pitch = 0.88;
  utterance.volume = 0.95;
  const spanishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.startsWith("es"));
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }
  return utterance;
}

function canSpeak(voiceMode) {
  return voiceMode !== VOICE_MODES.SILENT && "speechSynthesis" in window;
}

function canSpeakDarts(voiceMode) {
  return voiceMode === VOICE_MODES.FULL && "speechSynthesis" in window;
}
