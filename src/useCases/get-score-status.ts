import { Card } from "src/entities";
import { Game } from "src/entities/game";
import { GameProvider } from "src/entityProviders/game-provider";
import { GameNotFoundError } from "./errors";
import { GameStatus } from "./game-status";

export class GetScoreStatus {
  constructor(private readonly gameProvider: GameProvider) {}

  public run(gameId: string): GameStatus {
    const game = this.gameProvider.getGame(gameId);
    if (game === null) throw new GameNotFoundError(gameId);

    return new ScoreStatus(game);
  }
}

export class ScoreStatus implements GameStatus {
  constructor(private game: Game<Card>) {}

  public toString(): string {
    let string = `Scores: `;

    string +=
      this.game.players
        .map(
          (player) => `${player.name} (user id: ${player.id}): ${player.score}`
        )
        .join(", ") + ".";

    return string;
  }
}
