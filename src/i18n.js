export const LANGUAGES = Object.freeze({ ES: "es", EN: "en" });

const TEXT = Object.freeze({
  es: {
    brandTagline: "LA DIANA JUZGA",
    newGameLabel: "DardOps, nueva partida",
    voiceChange: "Pulsar para cambiar de modo",
    soundToggle: "Activar o silenciar sonidos",
    themeToggle: "Cambiar tema",
    languageToggle: "Cambiar idioma a inglés",
    player: "Jugador {number}",
    victimPlaceholder: "Nombre de la víctima {number}",
    setupPlayersTitle: "Reúne a las víctimas",
    setupPlayersSubtitle: "Pon nombre a quienes van a perder la dignidad.",
    playerCount: "Número de jugadores",
    chooseGame: "Elegir juego",
    setupStep: "CONFIGURACIÓN · PASO {step} DE 2",
    gameSetupTitle: "Elige el método de humillación",
    select: "SELECCIONAR",
    backPlayers: "Cambiar jugadores",
    turnOf: "Turno de",
    scoreboard: "MARCADOR",
    undo: "Deshacer",
    newGame: "Nueva",
    closed: "{count}/7 cerrados",
    currentTarget: "objetivo actual",
    turns: "{count} turnos",
    total: "TOTAL",
    state: "ESTADO",
    round: "RONDA {round}",
    lastVerdict: "ÚLTIMO VEREDICTO",
    waitingVerdict: "La diana espera. De momento no ha tenido motivos para reírse.",
    objective: "OBJ",
    quickRule: "REGLA RÁPIDA",
    ruleX01: "Resta cada impacto. Si bajas de cero, dejas 1 o llegas a 0 sin doble, pierdes todo el turno.",
    ruleClock: "Acierta el número indicado. Cualquier anillo sirve. Después del 20, remata con bull.",
    ruleHigh: "Suma todos los impactos durante ocho rondas. Gana quien tenga más puntos. Innovador, ¿eh?",
    winnerFallback: "Contra todo pronóstico y, probablemente, por un error administrativo.",
    gameFinished: "PARTIDA TERMINADA",
    wins: "{name} gana",
    anotherHumiliation: "Otra humillación",
    restartKicker: "OPERACIÓN IRREVERSIBLE · MÁS O MENOS",
    restartTitle: "¿Abandonar la partida?",
    restartCopy: "El marcador olvidará el desastre, pero quienes estaban mirando probablemente no.",
    continueGame: "Seguir sufriendo",
    confirmRestart: "Sí, huir",
    playersRound: "{players} JUGADORES · RONDA {round}",
    systemReady: "SISTEMA PREPARADO",
    footerLocal: "LOCAL · SIN CUENTAS · SIN EXCUSAS",
    missingNames: "Pon nombre a todo el mundo. Cobarde también cuenta, pero no puede repetirse.",
    undoVerdict: "Rectificar es de sabios. Tú solo has pulsado deshacer.",
    dartboardLabel: "Diana de dardos interactiva",
    outside: "Fuera",
    outsideButton: "FUERA · 0",
    points: "{points} puntos",
    double: "Doble {value}",
    triple: "Triple {value}",
    bull: "Bull 25",
    doubleBull: "Doble bull 50",
    noMarks: "Sin marcar",
    oneMark: "Una marca",
    twoMarks: "Dos marcas",
    threeMarks: "Tres marcas",
    voiceFull: "Voz completa",
    voiceTurn: "Solo turno, total y pulla",
    voiceSilent: "Voz en silencio",
    game501Name: "501 · Doble salida",
    game501Description: "Baja desde 501. Llegar a cero exige un doble.",
    game301Name: "301 · Doble salida",
    game301Description: "Más corto, igual de despiadado. Cero exacto con doble.",
    gameCricketName: "Cricket",
    gameCricketDescription: "Cierra 15–20 y bull. Puntúa mientras alguien siga abierto.",
    gameClockName: "Vuelta al reloj",
    gameClockDescription: "Acierta 1–20 en orden y termina en bull.",
    gameHighName: "Puntuación alta",
    gameHighDescription: "Ocho rondas. Suma todo y finge que había estrategia.",
    statusWinner: "{name} ha ganado. Qué inesperado.",
    statusX01: "{name} tiene {score} puntos restantes. Ronda {round}.",
    statusCricket: "{name} lidera con {score}. Cerrados para todos: {closed} de 7.",
    statusClock: "{name} busca el {target}. Ronda {round}.",
    statusHigh: "{name} lidera con {score}. Ronda {round} de {maxRounds}.",
    speechOutside: "Fuera. Cero puntos.",
    speechTurnBust: "{name}, turno anulado. Cero puntos.",
    speechTurnComplete: "{name}, turno completado.",
    speechCricketPoints: "{name}, {points} puntos añadidos en este turno.",
    speechTurnPoints: "{name}, {points} puntos en este turno.",
    speechPlayerTurn: "Turno de {name}.",
    speechWinner: "Fin de la partida. Ha ganado {name}. {insult}"
  },
  en: {
    brandTagline: "THE BOARD JUDGES",
    newGameLabel: "DardOps, new game",
    voiceChange: "Press to change mode",
    soundToggle: "Enable or mute sounds",
    themeToggle: "Change theme",
    languageToggle: "Switch language to Spanish",
    player: "Player {number}",
    victimPlaceholder: "Victim's name {number}",
    setupPlayersTitle: "Gather the victims",
    setupPlayersSubtitle: "Name the people about to lose their dignity.",
    playerCount: "Number of players",
    chooseGame: "Choose game",
    setupStep: "SETUP · STEP {step} OF 2",
    gameSetupTitle: "Choose the method of humiliation",
    select: "SELECT",
    backPlayers: "Change players",
    turnOf: "Turn of",
    scoreboard: "SCOREBOARD",
    undo: "Undo",
    newGame: "New",
    closed: "{count}/7 closed",
    currentTarget: "current target",
    turns: "{count} turns",
    total: "TOTAL",
    state: "STATUS",
    round: "ROUND {round}",
    lastVerdict: "LATEST VERDICT",
    waitingVerdict: "The board is waiting. So far, you have given it no reason to laugh.",
    objective: "TGT",
    quickRule: "QUICK RULE",
    ruleX01: "Subtract every hit. Go below zero, leave 1, or reach 0 without a double and the whole turn is lost.",
    ruleClock: "Hit the requested number. Any ring counts. After 20, finish on the bull.",
    ruleHigh: "Add every hit over eight rounds. Highest score wins. Groundbreaking stuff.",
    winnerFallback: "Against all odds and probably due to an administrative error.",
    gameFinished: "GAME OVER",
    wins: "{name} wins",
    anotherHumiliation: "Another humiliation",
    restartKicker: "IRREVERSIBLE OPERATION · MORE OR LESS",
    restartTitle: "Abandon the game?",
    restartCopy: "The scoreboard will forget this disaster. The people watching probably will not.",
    continueGame: "Keep suffering",
    confirmRestart: "Yes, run away",
    playersRound: "{players} PLAYERS · ROUND {round}",
    systemReady: "SYSTEM READY",
    footerLocal: "LOCAL · NO ACCOUNTS · NO EXCUSES",
    missingNames: "Name everyone. Coward is allowed, but it cannot be used twice.",
    undoVerdict: "Correcting mistakes is wise. You merely pressed undo.",
    dartboardLabel: "Interactive dartboard",
    outside: "Miss",
    outsideButton: "MISS · 0",
    points: "{points} points",
    double: "Double {value}",
    triple: "Triple {value}",
    bull: "Bull 25",
    doubleBull: "Double bull 50",
    noMarks: "No marks",
    oneMark: "One mark",
    twoMarks: "Two marks",
    threeMarks: "Three marks",
    voiceFull: "Full voice",
    voiceTurn: "Turn, total and insult only",
    voiceSilent: "Voice muted",
    game501Name: "501 · Double out",
    game501Description: "Count down from 501. Reaching zero requires a double.",
    game301Name: "301 · Double out",
    game301Description: "Shorter, equally merciless. Exact zero with a double.",
    gameCricketName: "Cricket",
    gameCricketDescription: "Close 15–20 and bull. Score while an opponent remains open.",
    gameClockName: "Around the clock",
    gameClockDescription: "Hit 1–20 in order, then finish on the bull.",
    gameHighName: "High score",
    gameHighDescription: "Eight rounds. Add everything and pretend there was a strategy.",
    statusWinner: "{name} has won. How unexpected.",
    statusX01: "{name} has {score} points left. Round {round}.",
    statusCricket: "{name} leads with {score}. Closed for everyone: {closed} of 7.",
    statusClock: "{name} is aiming for {target}. Round {round}.",
    statusHigh: "{name} leads with {score}. Round {round} of {maxRounds}.",
    speechOutside: "Miss. Zero points.",
    speechTurnBust: "{name}, turn void. Zero points.",
    speechTurnComplete: "{name}, turn complete.",
    speechCricketPoints: "{name}, {points} points added this turn.",
    speechTurnPoints: "{name}, {points} points this turn.",
    speechPlayerTurn: "It is {name}'s turn.",
    speechWinner: "Game over. {name} wins. {insult}"
  }
});

const GAME_KEYS = Object.freeze({
  501: ["game501Name", "game501Description"],
  301: ["game301Name", "game301Description"],
  cricket: ["gameCricketName", "gameCricketDescription"],
  clock: ["gameClockName", "gameClockDescription"],
  high: ["gameHighName", "gameHighDescription"]
});

export function normalizeLanguage(language) {
  return language === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.ES;
}

export function getNextLanguage(language) {
  return normalizeLanguage(language) === LANGUAGES.ES ? LANGUAGES.EN : LANGUAGES.ES;
}

export function translate(language, key, parameters = {}) {
  const normalizedLanguage = normalizeLanguage(language);
  const template = TEXT[normalizedLanguage][key] ?? TEXT.es[key] ?? key;
  return Object.entries(parameters).reduce(
    (message, [name, value]) => message.replaceAll(`{${name}}`, String(value)),
    template
  );
}

export function getGameText(gameId, language) {
  const [nameKey, descriptionKey] = GAME_KEYS[gameId];
  return { name: translate(language, nameKey), description: translate(language, descriptionKey) };
}

export function formatDartLabel(dart, language) {
  let label = String(dart.value);
  if (dart.value === 0) {
    label = translate(language, "outside");
  } else if (dart.value === 25 && dart.multiplier === 2) {
    label = translate(language, "doubleBull");
  } else if (dart.value === 25) {
    label = translate(language, "bull");
  } else if (dart.multiplier === 2) {
    label = translate(language, "double", { value: dart.value });
  } else if (dart.multiplier === 3) {
    label = translate(language, "triple", { value: dart.value });
  }
  return label;
}
