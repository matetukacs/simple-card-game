import { GameProvider } from "./game-provider";
import {
  Card,
  Deck,
  Game,
  Player,
  SimpleDeckCardComparator,
} from "src/entities";

describe("GameProvider", () => {
  describe("createGame", () => {
    const provider = new GameProvider();
    let result: Game<Card>;
    const players = [new Player("p1"), new Player("p2"), new Player("p3")];

    beforeAll(() => {
      result = provider.createGame(
        players,
        new Deck([]),
        new SimpleDeckCardComparator(),
        1
      );
    });

    it("returns the newly created game", () => {
      expect(result).toBeInstanceOf(Game);
    });
    it("exposes the game for fetching", () => {
      expect(provider.getGame(result.id)).toBe(result);
    });
  });
});
