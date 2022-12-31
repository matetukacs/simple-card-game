import { Card } from "./card";

export class Deck<T extends Card> {
  constructor(private readonly cards: T[]) {}

  // borrowed from https://stackoverflow.com/a/2450976
  public shuffle() {
    let currentIndex = this.cards.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
  }

  public takeTop(): T {
    const card = this.cards.pop();
    if (card === undefined) throw new EmptyDeckError();

    return card;
  }

  public size(): number {
    return this.cards.length;
  }

  public forEach(callback: (card: T, index: number) => void) {
    this.cards.forEach(callback);
  }

  public getCardAtIndex(index: number): T | null {
    const card = this.cards[index];

    return card ?? null;
  }

  public shallowCopy() {
    return new Deck([...this.cards]);
  }
}

export class EmptyDeckError extends Error {
  constructor() {
    super(`Deck is empty`);
  }
}
