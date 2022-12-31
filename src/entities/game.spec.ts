import { SimpleDeckCard } from "./card";
import { SimpleDeckCardComparator } from "./card-comparator";
import { Deck } from "./deck";
import { Game } from "./game";
import { Player } from "./player";

describe("Game", () => {
  describe("dealRound", () => {
    const players = [new Player("p1"), new Player("p2"), new Player("p3")];
    const deck = new Deck([
      new SimpleDeckCard(1),
      new SimpleDeckCard(2),
      new SimpleDeckCard(3),
    ]);
    const game = new Game(players, deck, new SimpleDeckCardComparator(), 1);
    beforeAll(() => {
      jest.spyOn(players[0], "deal");
      jest.spyOn(players[1], "deal");
      jest.spyOn(players[2], "deal");

      jest.spyOn(deck, "takeTop");

      game.dealRound();
    });

    it("takes the top card off of the deck 3 times", () => {
      expect(deck.takeTop).toBeCalledTimes(3);
    });

    it("deals the next top card of the deck to each player", () => {
      expect(players[0].deal).toBeCalledTimes(1);
      expect(players[0].deal).toBeCalledWith(new SimpleDeckCard(3));

      expect(players[1].deal).toBeCalledTimes(1);
      expect(players[1].deal).toBeCalledWith(new SimpleDeckCard(2));

      expect(players[2].deal).toBeCalledTimes(1);
      expect(players[2].deal).toBeCalledWith(new SimpleDeckCard(1));
    });
  });
  describe("getPlayerWithHighestScore", () => {
    describe("if there is a winner", () => {
      const p1 = new Player("p1");
      const p2 = new Player("p2");
      const p3 = new Player("p3");
      const p4 = new Player("p4");

      const players = [p1, p2, p3, p4];

      const deck = new Deck([]);
      const game = new Game(players, deck, new SimpleDeckCardComparator(), 1);

      beforeAll(() => {
        p1.score = 1;
        p2.score = 3;
        p3.score = 4;
        p4.score = 2;
      });

      it("returns player with highest score", () => {
        expect(game.getPlayerWithHighestScore()).toBe(p3);
      });
    });
    describe("if there score is a draw", () => {
      const p1 = new Player("p1");
      const p2 = new Player("p2");
      const p3 = new Player("p3");
      const p4 = new Player("p4");

      const players = [p1, p2, p3, p4];

      const deck = new Deck([]);
      const game = new Game(players, deck, new SimpleDeckCardComparator(), 1);

      beforeAll(() => {
        p1.score = 1;
        p2.score = 4;
        p3.score = 4;
        p4.score = 2;
      });

      it("returns player with highest score", () => {
        expect(game.getPlayerWithHighestScore()).toBe(null);
      });
    });
  });
});
