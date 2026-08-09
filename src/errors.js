export class InvalidGameError extends Error {
  constructor(gameId) {
    super(`Juego no válido: ${gameId}`);
    this.name = "InvalidGameError";
  }
}

export class InvalidPlayersError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPlayersError";
  }
}

export class GameFinishedError extends Error {
  constructor() {
    super("La partida ya ha terminado");
    this.name = "GameFinishedError";
  }
}
