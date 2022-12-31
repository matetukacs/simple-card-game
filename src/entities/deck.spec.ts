import { SimpleDeckCard } from "./card";
import { Deck, EmptyDeckError } from "./deck";

function makeSampleDeck() {
  return new Deck([
    new SimpleDeckCard(1),
    new SimpleDeckCard(2),
    new SimpleDeckCard(3),
    new SimpleDeckCard(4),
    new SimpleDeckCard(5),
    new SimpleDeckCard(6),
    new SimpleDeckCard(7),
    new SimpleDeckCard(8),
    new SimpleDeckCard(9),
    new SimpleDeckCard(10),
    new SimpleDeckCard(11),
    new SimpleDeckCard(12),
    new SimpleDeckCard(13),
    new SimpleDeckCard(14),
    new SimpleDeckCard(15),
    new SimpleDeckCard(16),
    new SimpleDeckCard(17),
    new SimpleDeckCard(18),
    new SimpleDeckCard(19),
    new SimpleDeckCard(20),
  ]);
}

describe("Deck", () => {
  describe("shuffle", () => {
    const deck = makeSampleDeck();
    it("shuffles the cards", () => {
      let prevDeck: Deck<SimpleDeckCard>;

      // test the expected result by repeatingly shuffling and inferring that at least half the cards are in different positions than before
      for (let i = 0; i < 5; i++) {
        prevDeck = deck.shallowCopy();
        deck.shuffle();

        let cardsInSamePosition = 0;

        deck.forEach((card, index) => {
          if (card.equals(prevDeck.getCardAtIndex(index))) {
            cardsInSamePosition++;
          }
        });

        expect(cardsInSamePosition).toBeLessThan(deck.size() / 2);
      }
    });
  });
  describe("takeTop", () => {
    const deck = makeSampleDeck();
    it("removes and returns the top card", () => {
      expect(deck.takeTop().number).toBe(20);
      expect(deck.size()).toBe(19);
      expect(deck.takeTop().number).toBe(19);
      expect(deck.size()).toBe(18);
      expect(deck.takeTop().number).toBe(18);
      expect(deck.size()).toBe(17);
      expect(deck.takeTop().number).toBe(17);
      expect(deck.size()).toBe(16);
      expect(deck.takeTop().number).toBe(16);
      expect(deck.size()).toBe(15);
      expect(deck.takeTop().number).toBe(15);
      expect(deck.size()).toBe(14);
      expect(deck.takeTop().number).toBe(14);
      expect(deck.size()).toBe(13);
      expect(deck.takeTop().number).toBe(13);
      expect(deck.size()).toBe(12);
      expect(deck.takeTop().number).toBe(12);
      expect(deck.size()).toBe(11);
      expect(deck.takeTop().number).toBe(11);
      expect(deck.size()).toBe(10);

      expect(deck.takeTop().number).toBe(10);
      expect(deck.size()).toBe(9);
      expect(deck.takeTop().number).toBe(9);
      expect(deck.size()).toBe(8);
      expect(deck.takeTop().number).toBe(8);
      expect(deck.size()).toBe(7);
      expect(deck.takeTop().number).toBe(7);
      expect(deck.size()).toBe(6);
      expect(deck.takeTop().number).toBe(6);
      expect(deck.size()).toBe(5);
      expect(deck.takeTop().number).toBe(5);
      expect(deck.size()).toBe(4);
      expect(deck.takeTop().number).toBe(4);
      expect(deck.size()).toBe(3);
      expect(deck.takeTop().number).toBe(3);
      expect(deck.size()).toBe(2);
      expect(deck.takeTop().number).toBe(2);
      expect(deck.size()).toBe(1);
      expect(deck.takeTop().number).toBe(1);
      expect(deck.size()).toBe(0);

      expect(() => {
        deck.takeTop();
      }).toThrowError(new EmptyDeckError());
    });
  });
});
