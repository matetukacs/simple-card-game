import { Injectable } from "@nestjs/common";
import {
  Card,
  Deck,
  SimpleDeckCard,
  StandardDeckCard,
  StandardDeckRank,
  StandardDeckSuit,
} from "src/entities";

export interface DeckFactory<T extends Card> {
  createDeck(): Deck<T>;
}

@Injectable()
export class SimpleDeckFactory implements DeckFactory<SimpleDeckCard> {
  public createDeck(): Deck<SimpleDeckCard> {
    const cards: SimpleDeckCard[] = [];

    for (let i = 1; i <= 52; i++) {
      cards.push(new SimpleDeckCard(i));
    }

    return new Deck(cards);
  }
}

@Injectable()
export class StandardDeckFactory implements DeckFactory<StandardDeckCard> {
  private static suits = [
    StandardDeckSuit.Clubs,
    StandardDeckSuit.Diamonds,
    StandardDeckSuit.Hearts,
    StandardDeckSuit.Spades,
  ];

  private static ranks = [
    StandardDeckRank.Two,
    StandardDeckRank.Three,
    StandardDeckRank.Four,
    StandardDeckRank.Five,
    StandardDeckRank.Six,
    StandardDeckRank.Seven,
    StandardDeckRank.Eight,
    StandardDeckRank.Nine,
    StandardDeckRank.Ten,
    StandardDeckRank.Jack,
    StandardDeckRank.Queen,
    StandardDeckRank.King,
    StandardDeckRank.Ace,
  ];

  public createDeck(): Deck<StandardDeckCard> {
    const cards: StandardDeckCard[] = [];

    StandardDeckFactory.suits.forEach((suit) =>
      StandardDeckFactory.ranks.forEach((rank) =>
        cards.push(new StandardDeckCard(rank, suit))
      )
    );

    return new Deck(cards);
  }
}
