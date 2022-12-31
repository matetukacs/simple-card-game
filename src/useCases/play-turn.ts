import { Player } from "src/entities";
import { Card } from "src/entities/card";
import { GameProvider } from "src/entityProviders";
import { CardComparator } from "../entities/card-comparator";
import { GameEndedError, GameNotFoundError } from "./errors";
import { GameStatus } from "./game-status";

export class PlayTurn {
  constructor(private readonly gameProvider: GameProvider) {}

  public run(gameId: string): GameStatus {
    const game = this.gameProvider.getGame(gameId);

    if (game === null) throw new GameNotFoundError(gameId);
    if (game.hasEnded()) throw new GameEndedError(game.id);

    game.turnNumber++;

    let highestCard: Card | null = null;

    const turnResultStatusBuilder = new TurnResultStatusBuilder(
      game.turnNumber
    );

    const turnResults: { player: Player<Card>; card: Card }[] = [];

    for (const player of game.players) {
      const card = player.playTopCard();
      turnResults.push({ player, card });
    }

    turnResultStatusBuilder.setTurnResults(turnResults);

    // passing a copy so that the original turnResults (that the GameStatus instance will have a ref to) does not get resorted
    const turnWinner = this.getTurnWinner(
      [...turnResults],
      game.cardComparator
    );

    turnResultStatusBuilder.setTurnWinner(turnWinner);

    if (turnWinner !== null) turnWinner.score++;

    if (game.hasEnded()) {
      turnResultStatusBuilder
        .setIsFinalTurn(true)
        .setPlayers(game.players)
        .setGameWinner(game.getPlayerWithHighestScore());
    }

    return turnResultStatusBuilder.build();
  }

  /// returns null if draw (or if there are no results)
  private getTurnWinner(
    turnResults: { player: Player<Card>; card: Card }[] = [],
    cardComparator: CardComparator<Card>
  ) {
    if (turnResults.length === 0) return null;
    if (turnResults.length === 1) return turnResults[0].player;

    // since we only need the first two results sorted, it would be nice to find a neat way to perform only a partial sort
    turnResults.sort((result1, result2) =>
      // swapped because we need descending order
      cardComparator.compare(result2.card, result1.card)
    );

    const isDraw =
      cardComparator.compare(turnResults[0].card, turnResults[1].card) === 0;

    if (isDraw) return null;

    return turnResults[0].player;
  }
}

class TurnResultStatusBuilder {
  private turnResults: { player: Player<Card>; card: Card }[] = [];
  private turnWinner: Player<Card> | null = null;

  private isFinalTurn: boolean = false;
  private gameWinner: Player<Card> | null = null;
  private players: Player<Card>[] = [];

  constructor(private readonly turnNumber: number) {}

  public setTurnResults(
    turnResults: { player: Player<Card>; card: Card }[]
  ): TurnResultStatusBuilder {
    this.turnResults = turnResults;
    return this;
  }

  public setTurnWinner(winner: Player<Card> | null): TurnResultStatusBuilder {
    this.turnWinner = winner;
    return this;
  }

  public setIsFinalTurn(isFinalTurn: boolean): TurnResultStatusBuilder {
    this.isFinalTurn = isFinalTurn;
    return this;
  }

  public setGameWinner(winner: Player<Card> | null): TurnResultStatusBuilder {
    this.gameWinner = winner;
    return this;
  }

  public setPlayers(players: Player<Card>[]): TurnResultStatusBuilder {
    this.players = players;
    return this;
  }

  public build(): TurnResultStatus {
    if (this.isFinalTurn)
      return new FinalTurnResultStatus(
        this.gameWinner,
        this.players,
        this.turnNumber,
        this.turnResults,
        this.turnWinner
      );

    return new TurnResultStatus(
      this.turnNumber,
      this.turnResults,
      this.turnWinner
    );
  }
}

export class TurnResultStatus implements GameStatus {
  constructor(
    private readonly turnNumber: number,
    private readonly turnResults: { player: Player<Card>; card: Card }[],
    private readonly turnWinner: Player<Card> | null
  ) {}

  public toString(): string {
    let string = `Turn ${this.turnNumber} results: `;

    const resultsStrings: string[] = [];
    for (const { player, card } of this.turnResults) {
      resultsStrings.push(
        `${player.name} (user id: ${player.id}) played ${card.toString()}`
      );
    }

    string += resultsStrings.join(", ") + ". ";

    if (this.turnWinner === null) string += `The turn ended in a draw.`;
    else
      string += `${this.turnWinner.name} won the turn. ${this.turnWinner.name}'s new score: ${this.turnWinner.score}.`;

    return string;
  }
}

export class FinalTurnResultStatus extends TurnResultStatus {
  constructor(
    private readonly gameWinner: Player<Card> | null,
    private readonly players: Player<Card>[],
    turnNumber: number,
    turnResults: { player: Player<Card>; card: Card }[],
    turnWinner: Player<Card> | null
  ) {
    super(turnNumber, turnResults, turnWinner);
  }

  public toString(): string {
    let string = super.toString();

    if (this.gameWinner === null)
      string += ` The game has ended with a draw. Final scores: `;
    else
      string += ` The game has ended. ${this.gameWinner.name} won. Final scores: `;

    string +=
      this.players
        .map((player) => `${player.name}: ${player.score}`)
        .join(", ") + ".";

    return string;
  }
}
