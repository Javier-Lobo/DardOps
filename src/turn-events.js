export function getCompletedTurnCount(game) {
  return game.players.reduce((total, player) => total + player.turnsPlayed, 0);
}

export function hasCompletedTurn(previousGame, currentGame) {
  return getCompletedTurnCount(currentGame) > getCompletedTurnCount(previousGame);
}
