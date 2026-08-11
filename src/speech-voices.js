const EFFECT_VOICE_PATTERN = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|effect|good news|hysterical|organ|superstar|trinoids|whisper|wobble|zarvox/i;

const TARGET_LANGUAGES = {
  en: "en-GB",
  es: "es-ES"
};

const PREFERRED_VOICE_NAMES = {
  en: ["daniel", "google uk english", "microsoft sonia", "microsoft ryan", "samantha", "alex"],
  es: ["mónica", "monica", "jorge", "paulina", "google español", "microsoft elvira", "microsoft alvaro"]
};

export function selectSpeechVoice(voices, language) {
  const candidates = voices.filter((voice) => isSuitableVoice(voice, language));
  candidates.sort((first, second) => compareVoices(first, second, language));
  return candidates[0] ?? null;
}

export function createSpeechVoiceResolver() {
  const selectedVoices = new Map();
  return (voices, language) => {
    let selectedVoice = selectedVoices.get(language) ?? null;
    if (!selectedVoice) {
      selectedVoice = selectSpeechVoice(voices, language);
      if (selectedVoice) {
        selectedVoices.set(language, selectedVoice);
      }
    }
    return selectedVoice;
  };
}

function isSuitableVoice(voice, language) {
  const voiceLanguage = voice.lang.toLowerCase();
  const languagePrefix = language.toLowerCase();
  const matchesLanguage = voiceLanguage === languagePrefix || voiceLanguage.startsWith(`${languagePrefix}-`);
  return matchesLanguage && !EFFECT_VOICE_PATTERN.test(voice.name);
}

function compareVoices(first, second, language) {
  const scoreDifference = getVoiceScore(second, language) - getVoiceScore(first, language);
  return scoreDifference || first.name.localeCompare(second.name, "en");
}

function getVoiceScore(voice, language) {
  let score = 0;
  const targetLanguage = TARGET_LANGUAGES[language] ?? language;
  const preferredIndex = getPreferredVoiceIndex(voice.name, language);
  if (voice.lang.toLowerCase() === targetLanguage.toLowerCase()) {
    score += 100;
  }
  if (preferredIndex >= 0) {
    score += 50 - preferredIndex;
  }
  if (voice.default) {
    score += 20;
  }
  if (voice.localService) {
    score += 5;
  }
  return score;
}

function getPreferredVoiceIndex(voiceName, language) {
  const normalizedName = voiceName.toLowerCase();
  const preferredNames = PREFERRED_VOICE_NAMES[language] ?? [];
  return preferredNames.findIndex((name) => normalizedName.includes(name));
}
