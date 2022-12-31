import { Injectable } from "@nestjs/common";
import { Card, CardComparator, Deck, Game, Player } from "src/entities";

@Injectable()
export class GameProvider {
  private games = new Map<string, Game<Card>>();

  public createGame<T extends Card>(
    players: Player<T>[],
    deck: Deck<T>,
    cardComparator: CardComparator<T>,
    totalNumberOfTurns: number
  ): Game<T> {
    const game = new Game(players, deck, cardComparator, totalNumberOfTurns);

    this.games.set(game.id, game);

    return game;
  }

  public getGame(gameId: string): Game<Card> | null {
    return this.games.get(gameId) ?? null;
  }
}
