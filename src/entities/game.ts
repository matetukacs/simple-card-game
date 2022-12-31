import { v4 as uuidv4 } from "uuid";
import { Card } from "./card";
import { CardComparator } from "./card-comparator";
import { Deck } from "./deck";
import { Player } from "./player";

export class Game<T extends Card> {
  public readonly id = uuidv4().substring(0, 8);
  public turnNumber = 0;

  constructor(
    public readonly players: Player<T>[],
    public readonly deck: Deck<T>,
    public readonly cardComparator: CardComparator<T>,
    public readonly totalNumberOfTurns: number
  ) {}

  public hasEnded(): boolean {
    return this.turnNumber === this.totalNumberOfTurns;
  }

  // deal 1 card to each players
  public dealRound(): void {
    for (const player of this.players) {
      player.deal(this.deck.takeTop());
    }
  }

  // returns null if draw (or if there are no players)
  public getPlayerWithHighestScore(): Player<T> | null {
    if (this.players.length === 0) return null;
    if (this.players.length === 1) return this.players[0];

    // since we only need the first two players sorted, it would be nice to find a neat way to perform only a partial sort
    const sortedPlayers = [...this.players].sort(
      (player1, player2) => player2.score - player1.score
    );

    if (sortedPlayers[0].score === sortedPlayers[1].score) return null;
    return sortedPlayers[0];
  }
}
