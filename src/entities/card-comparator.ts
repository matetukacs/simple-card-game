import {
  Card,
  SimpleDeckCard,
  StandardDeckCard,
  StandardDeckRank,
} from "./card";

export interface CardComparator<T extends Card> {
  // Compares its two arguments for order. Returns a negative number, zero, or a positive number as the first argument is less than, equal to, or greater than the second.
  compare(card1: T, card2: T): number;
}

export enum AceValueConfig {
  AceIsHighestCard,
  AceIsLowestCard,
}

export class SimpleDeckCardComparator
  implements CardComparator<SimpleDeckCard>
{
  public compare(card1: SimpleDeckCard, card2: SimpleDeckCard): number {
    return card1.number - card2.number;
  }
}

export class StandardDeckCardComparator
  implements CardComparator<StandardDeckCard>
{
  constructor(private readonly aceValueConfig: AceValueConfig) {}

  public compare(card1: StandardDeckCard, card2: StandardDeckCard): number {
    return this.getCardValue(card1) - this.getCardValue(card2);
  }

  private getCardValue(card: StandardDeckCard) {
    switch (card.rank) {
      case StandardDeckRank.Two:
        return 2;
      case StandardDeckRank.Three:
        return 3;
      case StandardDeckRank.Four:
        return 4;
      case StandardDeckRank.Five:
        return 5;
      case StandardDeckRank.Six:
        return 6;
      case StandardDeckRank.Seven:
        return 7;
      case StandardDeckRank.Eight:
        return 8;
      case StandardDeckRank.Nine:
        return 9;
      case StandardDeckRank.Ten:
        return 10;
      case StandardDeckRank.Jack:
        return 11;
      case StandardDeckRank.Queen:
        return 12;
      case StandardDeckRank.King:
        return 13;
      case StandardDeckRank.Ace:
        return this.aceValueConfig === AceValueConfig.AceIsHighestCard ? 14 : 1;
    }
  }
}
