import { SimpleDeckCard } from "./card";
import { Deck } from "./deck";
import { Player, PlayerHasNoCardsError } from "./player";

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
  ]);
}

describe("Player", () => {
  describe("playTopCard", () => {
    const player = new Player<SimpleDeckCard>("p1");
    beforeAll(() => {
      player.deal(new SimpleDeckCard(1));
      player.deal(new SimpleDeckCard(2));
      player.deal(new SimpleDeckCard(3));
    });
    it("removes and returns the top card", () => {
      expect(player.playTopCard().number).toBe(3);
      expect(player.playTopCard().number).toBe(2);
      expect(player.playTopCard().number).toBe(1);

      expect(() => {
        expect(player.playTopCard().number).toBe(10);
      }).toThrowError(new PlayerHasNoCardsError(player.id));
    });
  });
});
