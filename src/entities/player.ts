import { v4 as uuidv4 } from "uuid";
import { Card } from "./card";

export class Player<T extends Card> {
  public readonly id = uuidv4().substring(0, 8);
  public score = 0;
  private readonly cards: T[] = [];
  constructor(public readonly name: string) {}

  public deal(card: T) {
    this.cards.push(card);
  }

  public playTopCard(): T {
    const topCard = this.cards.pop();

    if (topCard === undefined) throw new PlayerHasNoCardsError(this.id);

    return topCard;
  }

  public toString(): string {
    return `name: ${this.name}, id: ${this.id}`;
  }
}

export class PlayerHasNoCardsError extends Error {
  constructor(playerId: string) {
    super(`Player ${playerId} has no cards`);
  }
}
