import { Injectable } from "@nestjs/common";
import { SimpleDeckCardComparator } from "./entities/card-comparator";
import { SimpleDeckFactory } from "./entities/deck-factory";
import { PlayerProvider } from "./entityProviders";
import { GameProvider } from "./entityProviders/game-provider";
import { GetScoreStatus, PlayTurn, StartGame } from "./useCases";
import { GameStatus } from "./useCases/game-status";

@Injectable()
export class GameService {
  private readonly simpleOneTo52NumberedCardComparator =
    new SimpleDeckCardComparator();
  constructor(
    private readonly gameProvider: GameProvider,
    private readonly playerProvider: PlayerProvider,
    private readonly simpleDeckFactory: SimpleDeckFactory
  ) {}

  public getScoreStatus(gameId: string): GameStatus {
    const getScoreStatusUseCase = new GetScoreStatus(this.gameProvider);
    return getScoreStatusUseCase.run(gameId);
  }

  // though the underlying generic implementation supports a variable number of players and different types of decks,
  // the service is opinionated about only exposing the "2 player game" functionality with the "1 to 52" deck
  public startGame(player1Name: string, player2Name: string): GameStatus {
    const startGameUseCase = new StartGame(
      this.playerProvider,
      this.gameProvider,
      this.simpleDeckFactory,
      this.simpleOneTo52NumberedCardComparator
    );

    return startGameUseCase.run([player1Name, player2Name]);
  }

  public playTurn(gameId: string): GameStatus {
    const playTurnUseCase = new PlayTurn(this.gameProvider);

    return playTurnUseCase.run(gameId);
  }
}
