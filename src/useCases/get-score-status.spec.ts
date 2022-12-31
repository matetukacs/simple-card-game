import { Deck, Game } from "src/entities";
import { SimpleDeckCardComparator } from "../entities/card-comparator";
import { GameProvider } from "../entityProviders";
import { GameNotFoundError } from "./errors";
import { GameStatus } from "./game-status";
import { GetScoreStatus, ScoreStatus } from "./get-score-status";

describe("GetScoreStatus", () => {
  describe("run", () => {
    describe("if the game is found", () => {
      const gameProvider = new GameProvider();
      const mockGame = new Game(
        [],
        new Deck([]),
        new SimpleDeckCardComparator(),
        1
      );
      let result: GameStatus;
      beforeAll(() => {
        jest
          .spyOn(gameProvider, "getGame")
          .mockImplementation((gameId: string) => mockGame);

        result = new GetScoreStatus(gameProvider).run("game_id");
      });

      it("returns the score status", () => {
        expect(result).toEqual(new ScoreStatus(mockGame));
      });
    });
    describe("if the game is not found", () => {
      const gameProvider = new GameProvider();

      beforeAll(() => {
        jest
          .spyOn(gameProvider, "getGame")
          .mockImplementation((gameId: string) => null);
      });

      it("throws GameNotFoundError", () => {
        expect(() => {
          new GetScoreStatus(gameProvider).run("game_id");
        }).toThrowError(new GameNotFoundError("game_id"));
      });
    });
  });
});
