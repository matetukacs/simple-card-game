export interface Card {
  equals(card: Card | null): boolean;
  toString(): string;
}

// a "simple deck" is a deck where cards only have numbers
export class SimpleDeckCard implements Card {
  constructor(public readonly number: number) {}

  public equals(card: SimpleDeckCard | null) {
    if (card === null) return false;
    return this.number === card.number;
  }

  public toString(): string {
    return `${this.number}`;
  }
}

export enum StandardDeckRank {
  "Two" = "Two",
  "Three" = "Three",
  "Four" = "Four",
  "Five" = "Five",
  "Six" = "Six",
  "Seven" = "Seven",
  "Eight" = "Eight",
  "Nine" = "Nine",
  "Ten" = "Ten",
  "Jack" = "Jack",
  "Queen" = "Queen",
  "King" = "King",
  "Ace" = "Ace",
}

export enum StandardDeckSuit {
  "Clubs" = "Clubs",
  "Diamonds" = "Diamonds",
  "Hearts" = "Hearts",
  "Spades" = "Spades",
}

// a "standard deck" is the standard playing card deck, where cards have suits (clubs, diamonds, hearts, spades) and ranks (two, three, four, five, six, seven, eight, nince, ten, jack, queen, king, ace)
export class StandardDeckCard implements Card {
  constructor(
    public readonly rank: StandardDeckRank,
    public readonly suit: StandardDeckSuit
  ) {}

  public equals(card: StandardDeckCard | null) {
    if (card === null) return false;
    return this.rank === card.rank && this.suit === card.suit;
  }

  public toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}
