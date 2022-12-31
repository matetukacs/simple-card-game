import { CardComparator } from "src/entities";
import { Card } from "src/entities/card";
import { DeckFactory } from "../entities/deck-factory";
import { Game } from "../entities/game";
import { GameProvider } from "../entityProviders/game-provider";
import { PlayerProvider } from "../entityProviders/player-provider";
import { GameStatus } from "./game-status";

export class StartGame<T extends Card> {
  constructor(
    private readonly playerProvider: PlayerProvider,
    private readonly gameProvider: GameProvider,
    private readonly deckFactory: DeckFactory<T>,
    private readonly cardComparator: CardComparator<T>
  ) {}

  public run(playerNames: string[]) {
    const players = this.playerProvider.createPlayers(playerNames);

    const deck = this.deckFactory.createDeck();
    // calculate the number of turns by finding the max number of cards each player can have in a way that everyone has the same number of cards,
    // even if the number of players is not divisible by 2
    const totalTurns = Math.floor(deck.size() / players.length);

    const game = this.gameProvider.createGame(
      players,
      deck,
      this.cardComparator,
      totalTurns
    );

    game.deck.shuffle();

    // deal everyone the same amount of cards as the number of turns the game will have
    for (let i = 0; i < totalTurns; i++) {
      game.dealRound();
    }

    return new GameStartedStatus(game);
  }
}

export class GameStartedStatus implements GameStatus {
  constructor(private game: Game<Card>) {}

  public toString(): string {
    let string = `The game has started (game id: ${this.game.id}). Players: `;

    string +=
      this.game.players
        .map((player) => `${player.name} (user id: ${player.id})`)
        .join(", ") + ".";

    string += "Run the playTurn command to continue.";

    return string;
  }
}
