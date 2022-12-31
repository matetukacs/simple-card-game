export class GameNotFoundError extends Error {
  constructor(gameId: string) {
    super(`Game (${gameId}) not found`);
  }
}

export class GameEndedError extends Error {
  constructor(gameId: string) {
    super(`The game (game id: ${gameId}) has ended`);
  }
}
