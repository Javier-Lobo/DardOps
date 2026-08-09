export const MAX_UNDO_STEPS = 30;

export function compactGameState(game, includeHistory = true) {
  const history = includeHistory ? compactHistory(game.history) : [];
  return compactSnapshot({ ...game, history });
}

function compactHistory(history = []) {
  return history.slice(-MAX_UNDO_STEPS).map((snapshot) => compactSnapshot(snapshot));
}

function compactSnapshot(snapshot) {
  const stateWithoutHeatmap = { ...snapshot };
  Reflect.deleteProperty(stateWithoutHeatmap, "heatmap");
  return {
    ...stateWithoutHeatmap,
    version: 2,
    players: snapshot.players.map(compactPlayer),
    history: snapshot.history ?? []
  };
}

function compactPlayer(player) {
  const { turns, ...compact } = player;
  return { ...compact, turnsPlayed: getTurnsPlayed(player, turns) };
}

function getTurnsPlayed(player, legacyTurns) {
  if (Number.isInteger(player.turnsPlayed)) {
    return player.turnsPlayed;
  }
  return legacyTurns?.length ?? 0;
}
