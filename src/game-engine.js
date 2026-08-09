import { CRICKET_TARGETS, GAME_CONFIGS } from "./game-config.js";
import { GameFinishedError, InvalidGameError, InvalidPlayersError } from "./errors.js";
import { MAX_UNDO_STEPS } from "./game-state.js";

export function createGame(playerNames, gameId) {
  const names = normalizePlayerNames(playerNames);
  const config = GAME_CONFIGS[gameId];
  if (!config) {
    throw new InvalidGameError(gameId);
  }

  return {
    version: 2,
    gameId,
    players: names.map((name, index) => createPlayer(name, index, config)),
    currentPlayer: 0,
    round: 1,
    darts: [],
    turnStartScore: config.initialScore ?? 0,
    history: [],
    winnerId: null,
    lastTurn: null
  };
}

export function throwDart(game, dart) {
  if (game.winnerId) {
    throw new GameFinishedError();
  }
  const nextGame = cloneGame(game);
  nextGame.history.push(createSnapshot(game));
  nextGame.history = nextGame.history.slice(-MAX_UNDO_STEPS);
  const player = nextGame.players[nextGame.currentPlayer];
  const config = GAME_CONFIGS[nextGame.gameId];
  const result = applyDart(nextGame, player, dart, config);
  nextGame.darts.push({
    ...dart,
    points: dart.value * dart.multiplier,
    awardedPoints: result.awardedPoints,
    marksAdded: result.marksAdded
  });
  if (result.winner) {
    nextGame.winnerId = player.id;
    const summary = createTurnSummary(nextGame, player, result.message, false);
    player.turnsPlayed += 1;
    nextGame.lastTurn = summary;
  } else if (result.bust || nextGame.darts.length === 3) {
    completeTurn(nextGame, result.message, result.bust);
  }
  return nextGame;
}

export function undoDart(game) {
  if (game.history.length === 0) {
    return game;
  }
  const previous = game.history.at(-1);
  return { ...previous, history: game.history.slice(0, -1) };
}

export function getGameStatus(game) {
  const config = GAME_CONFIGS[game.gameId];
  let status;
  if (game.winnerId) {
    status = `${getWinner(game).name} ha ganado. Qué inesperado.`;
  } else if (config.kind === "x01") {
    status = buildX01Status(game);
  } else if (config.kind === "cricket") {
    status = buildCricketStatus(game);
  } else if (config.kind === "clock") {
    status = buildClockStatus(game);
  } else {
    status = buildHighScoreStatus(game, config);
  }
  return status;
}

export function getTurnTotal(game) {
  return game.darts.reduce((total, dart) => total + dart.points, 0);
}

export function getTurnAwardedTotal(game) {
  return game.darts.reduce((total, dart) => total + (dart.awardedPoints ?? dart.points), 0);
}

export function getWinner(game) {
  return game.players.find((player) => player.id === game.winnerId) ?? null;
}

function normalizePlayerNames(playerNames) {
  const names = playerNames.map((name) => name.trim()).filter(Boolean);
  if (names.length < 1 || names.length > 8) {
    throw new InvalidPlayersError("Debe haber entre 1 y 8 jugadores");
  }
  if (new Set(names.map((name) => name.toLocaleLowerCase("es"))).size !== names.length) {
    throw new InvalidPlayersError("Los nombres no pueden repetirse");
  }
  return names;
}

function createPlayer(name, index, config) {
  return {
    id: `player-${index + 1}`,
    name,
    score: config.initialScore ?? 0,
    cricket: Object.fromEntries(CRICKET_TARGETS.map((target) => [target, 0])),
    clockTarget: 1,
    turnsPlayed: 0
  };
}

function applyDart(game, player, dart, config) {
  let result;
  if (config.kind === "x01") {
    result = applyX01Dart(player, dart);
  } else if (config.kind === "cricket") {
    result = applyCricketDart(game, player, dart);
  } else if (config.kind === "clock") {
    result = applyClockDart(player, dart);
  } else {
    const awardedPoints = dart.value * dart.multiplier;
    player.score += awardedPoints;
    result = createDartResult({ awardedPoints });
  }
  return result;
}

function applyX01Dart(player, dart) {
  const points = dart.value * dart.multiplier;
  const remaining = player.score - points;
  const bust = remaining < 0 || remaining === 1 || (remaining === 0 && dart.multiplier !== 2);
  if (bust) {
    return createDartResult({ bust: true, message: "Turno anulado por pasarte o cerrar sin doble." });
  }
  player.score = remaining;
  return createDartResult({
    winner: remaining === 0,
    awardedPoints: points,
    message: remaining === 0 ? "Cierre válido con doble." : ""
  });
}

function applyCricketDart(game, player, dart) {
  if (!CRICKET_TARGETS.includes(dart.value)) {
    return createDartResult();
  }
  const target = dart.value;
  const previousMarks = player.cricket[target];
  const newMarks = Math.min(3, previousMarks + dart.multiplier);
  player.cricket[target] = newMarks;
  const extraMarks = Math.max(0, previousMarks + dart.multiplier - 3);
  const canScore = extraMarks > 0 && isCricketTargetOpen(game, target, player.id);
  const awardedPoints = canScore ? extraMarks * target : 0;
  player.score += awardedPoints;
  return createDartResult({
    winner: hasWonCricket(game, player),
    awardedPoints,
    marksAdded: newMarks - previousMarks
  });
}

function applyClockDart(player, dart) {
  const hitTarget = player.clockTarget <= 20 && dart.value === player.clockTarget;
  const hitBull = player.clockTarget === 25 && dart.value === 25;
  if (hitTarget) {
    player.clockTarget += 1;
  }
  if (player.clockTarget === 21) {
    player.clockTarget = 25;
  } else if (hitBull) {
    player.clockTarget = 26;
  }
  return createDartResult({ winner: player.clockTarget === 26 });
}

function completeTurn(game, message, bust) {
  const player = game.players[game.currentPlayer];
  if (bust) {
    player.score = game.turnStartScore;
  }
  const summary = createTurnSummary(game, player, message, bust);
  player.turnsPlayed += 1;
  game.lastTurn = summary;
  advancePlayer(game);
}

function createTurnSummary(game, player, message, bust) {
  const config = GAME_CONFIGS[game.gameId];
  const scoredPoints = config.kind === "cricket" ? getTurnAwardedTotal(game) : getTurnTotal(game);
  return {
    playerId: player.id,
    playerName: player.name,
    points: bust ? 0 : scoredPoints,
    rawPoints: getTurnTotal(game),
    gameKind: config.kind,
    darts: game.darts.map((dart) => ({ ...dart })),
    bust,
    message,
    status: getGameStatus(game)
  };
}

function advancePlayer(game) {
  const wasLastPlayer = game.currentPlayer === game.players.length - 1;
  const config = GAME_CONFIGS[game.gameId];
  if (wasLastPlayer && config.kind === "high" && game.round >= config.maxRounds) {
    game.winnerId = getHighScoreWinner(game).id;
    return;
  }
  game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
  game.round += wasLastPlayer ? 1 : 0;
  game.darts = [];
  game.turnStartScore = game.players[game.currentPlayer].score;
}

function isCricketTargetOpen(game, target, currentPlayerId) {
  return game.players.some((player) => player.id !== currentPlayerId && player.cricket[target] < 3);
}

function createDartResult(overrides = {}) {
  return {
    winner: false,
    bust: false,
    message: "",
    awardedPoints: 0,
    marksAdded: 0,
    ...overrides
  };
}

function hasWonCricket(game, player) {
  const allClosed = CRICKET_TARGETS.every((target) => player.cricket[target] === 3);
  const topScore = Math.max(...game.players.map((candidate) => candidate.score));
  return allClosed && player.score >= topScore;
}

function getHighScoreWinner(game) {
  return [...game.players].sort((left, right) => right.score - left.score)[0];
}

function buildX01Status(game) {
  const player = game.players[game.currentPlayer];
  return `${player.name} tiene ${player.score} puntos restantes. Ronda ${game.round}.`;
}

function buildCricketStatus(game) {
  const leader = [...game.players].sort((left, right) => right.score - left.score)[0];
  const closed = CRICKET_TARGETS.filter((target) => game.players.every((player) => player.cricket[target] === 3));
  return `${leader.name} lidera con ${leader.score}. Cerrados para todos: ${closed.length} de 7.`;
}

function buildClockStatus(game) {
  const player = game.players[game.currentPlayer];
  const target = player.clockTarget === 25 ? "bull" : player.clockTarget;
  return `${player.name} busca el ${target}. Ronda ${game.round}.`;
}

function buildHighScoreStatus(game, config) {
  const leader = [...game.players].sort((left, right) => right.score - left.score)[0];
  return `${leader.name} lidera con ${leader.score}. Ronda ${game.round} de ${config.maxRounds}.`;
}

function cloneGame(game) {
  return structuredClone(game);
}

function createSnapshot(game) {
  const snapshot = cloneGame(game);
  snapshot.history = [];
  return snapshot;
}
