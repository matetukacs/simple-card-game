import { Deck, Game, Player } from "src/entities";
import { SimpleDeckCard } from "../entities/card";
import { SimpleDeckCardComparator } from "../entities/card-comparator";
import { GameProvider } from "../entityProviders";
import { GameStatus } from "./game-status";
import { FinalTurnResultStatus, PlayTurn, TurnResultStatus } from "./play-turn";

describe("PlayTurn", () => {
  describe("run", () => {
    describe("if the game exists and has not ended", () => {
      describe("if is not the last turn", () => {
        describe("if the turn has a winner", () => {
          const gameProvider = new GameProvider();
          const mockPlayer1 = new Player("p1");
          const mockPlayer2 = new Player("p2");
          const mockPlayer3 = new Player("p3");
          const mockPlayer4 = new Player("p5");

          const mockGame = new Game(
            [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
            new Deck([]),
            new SimpleDeckCardComparator(),
            2
          );
          let result: GameStatus;
          beforeAll(() => {
            jest
              .spyOn(gameProvider, "getGame")
              .mockImplementation((id: string) => mockGame);

            jest.spyOn(mockGame, "hasEnded");

            jest
              .spyOn(mockPlayer1, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(1));
            jest
              .spyOn(mockPlayer2, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(9));
            jest
              .spyOn(mockPlayer3, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(10));
            jest
              .spyOn(mockPlayer4, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(4));

            result = new PlayTurn(gameProvider).run("game-id");
          });

          it("gets the game", () => {
            expect(gameProvider.getGame).toBeCalledTimes(1);
            expect(gameProvider.getGame).toBeCalledWith("game-id");
          });
          it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
            expect(mockGame.hasEnded).toBeCalledTimes(2);
          });
          it("increments the game's turn number", () => {
            expect(mockGame.turnNumber).toBe(1);
          });
          it("plays the top card of every player", () => {
            expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
          });
          it("determines the turn winner and increments their score", () => {
            expect(mockPlayer1.score).toBe(0);
            expect(mockPlayer2.score).toBe(0);
            expect(mockPlayer3.score).toBe(1);
            expect(mockPlayer4.score).toBe(0);
          });
          it("returns the expected game status", () => {
            expect(result).toEqual(
              new TurnResultStatus(
                1,
                [
                  { player: mockPlayer1, card: new SimpleDeckCard(1) },
                  { player: mockPlayer2, card: new SimpleDeckCard(9) },
                  { player: mockPlayer3, card: new SimpleDeckCard(10) },
                  { player: mockPlayer4, card: new SimpleDeckCard(4) },
                ],
                mockPlayer3
              )
            );
          });
        });
        describe("if the turn ended in a draw", () => {
          const gameProvider = new GameProvider();
          const mockPlayer1 = new Player("p1");
          const mockPlayer2 = new Player("p2");
          const mockPlayer3 = new Player("p3");
          const mockPlayer4 = new Player("p5");

          const mockGame = new Game(
            [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
            new Deck([]),
            new SimpleDeckCardComparator(),
            2
          );
          let result: GameStatus;
          beforeAll(() => {
            jest
              .spyOn(gameProvider, "getGame")
              .mockImplementation((id: string) => mockGame);

            jest.spyOn(mockGame, "hasEnded");

            jest
              .spyOn(mockPlayer1, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(1));
            jest
              .spyOn(mockPlayer2, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(10));
            jest
              .spyOn(mockPlayer3, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(10));
            jest
              .spyOn(mockPlayer4, "playTopCard")
              .mockImplementation(() => new SimpleDeckCard(4));

            result = new PlayTurn(gameProvider).run("game-id");
          });

          it("gets the game", () => {
            expect(gameProvider.getGame).toBeCalledTimes(1);
            expect(gameProvider.getGame).toBeCalledWith("game-id");
          });
          it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
            expect(mockGame.hasEnded).toBeCalledTimes(2);
          });
          it("increments the game's turn number", () => {
            expect(mockGame.turnNumber).toBe(1);
          });
          it("plays the top card of every player", () => {
            expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
            expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
          });
          it("determines the turn winner and increments their score", () => {
            expect(mockPlayer1.score).toBe(0);
            expect(mockPlayer2.score).toBe(0);
            expect(mockPlayer3.score).toBe(0);
            expect(mockPlayer4.score).toBe(0);
          });
          it("returns the expected game status", () => {
            expect(result).toEqual(
              new TurnResultStatus(
                1,
                [
                  { player: mockPlayer1, card: new SimpleDeckCard(1) },
                  { player: mockPlayer2, card: new SimpleDeckCard(10) },
                  { player: mockPlayer3, card: new SimpleDeckCard(10) },
                  { player: mockPlayer4, card: new SimpleDeckCard(4) },
                ],
                null
              )
            );
          });
        });
      });
      describe("if is the last turn", () => {
        describe("if the game has a winner", () => {
          describe("if the turn has a winner", () => {
            const gameProvider = new GameProvider();
            const mockPlayer1 = new Player("p1");
            const mockPlayer2 = new Player("p2");
            const mockPlayer3 = new Player("p3");
            const mockPlayer4 = new Player("p5");

            const mockGame = new Game(
              [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
              new Deck([]),
              new SimpleDeckCardComparator(),
              2
            );
            let result: GameStatus;
            beforeAll(() => {
              jest
                .spyOn(gameProvider, "getGame")
                .mockImplementation((id: string) => mockGame);

              jest.spyOn(mockGame, "hasEnded");

              jest
                .spyOn(mockPlayer1, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(1));
              jest
                .spyOn(mockPlayer2, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(19));
              jest
                .spyOn(mockPlayer3, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer4, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(4));

              mockPlayer1.score = 3;
              mockPlayer2.score = 10;
              mockPlayer3.score = 10;

              mockGame.turnNumber = 1;
              result = new PlayTurn(gameProvider).run("game-id");
            });

            it("gets the game", () => {
              expect(gameProvider.getGame).toBeCalledTimes(1);
              expect(gameProvider.getGame).toBeCalledWith("game-id");
            });
            it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
              expect(mockGame.hasEnded).toBeCalledTimes(2);
            });
            it("increments the game's turn number", () => {
              expect(mockGame.turnNumber).toBe(2);
            });
            it("plays the top card of every player", () => {
              expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
            });
            it("determines the turn winner and increments their score", () => {
              expect(mockPlayer1.score).toBe(3);
              expect(mockPlayer2.score).toBe(11);
              expect(mockPlayer3.score).toBe(10);
              expect(mockPlayer4.score).toBe(0);
            });
            it("returns the expected game status", () => {
              expect(result).toEqual(
                new FinalTurnResultStatus(
                  mockPlayer2,
                  [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
                  2,
                  [
                    { player: mockPlayer1, card: new SimpleDeckCard(1) },
                    { player: mockPlayer2, card: new SimpleDeckCard(19) },
                    { player: mockPlayer3, card: new SimpleDeckCard(10) },
                    { player: mockPlayer4, card: new SimpleDeckCard(4) },
                  ],
                  mockPlayer2
                )
              );
            });
          });
          describe("if the turn ended in a draw", () => {
            const gameProvider = new GameProvider();
            const mockPlayer1 = new Player("p1");
            const mockPlayer2 = new Player("p2");
            const mockPlayer3 = new Player("p3");
            const mockPlayer4 = new Player("p5");

            const mockGame = new Game(
              [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
              new Deck([]),
              new SimpleDeckCardComparator(),
              2
            );
            let result: GameStatus;
            beforeAll(() => {
              jest
                .spyOn(gameProvider, "getGame")
                .mockImplementation((id: string) => mockGame);

              jest.spyOn(mockGame, "hasEnded");

              jest
                .spyOn(mockPlayer1, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(1));
              jest
                .spyOn(mockPlayer2, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer3, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer4, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(4));

              mockPlayer1.score = 3;
              mockPlayer2.score = 10;
              mockPlayer3.score = 11;

              mockGame.turnNumber = 1;
              result = new PlayTurn(gameProvider).run("game-id");
            });

            it("gets the game", () => {
              expect(gameProvider.getGame).toBeCalledTimes(1);
              expect(gameProvider.getGame).toBeCalledWith("game-id");
            });
            it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
              expect(mockGame.hasEnded).toBeCalledTimes(2);
            });
            it("increments the game's turn number", () => {
              expect(mockGame.turnNumber).toBe(2);
            });
            it("plays the top card of every player", () => {
              expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
            });
            it("determines the turn winner and increments their score", () => {
              expect(mockPlayer1.score).toBe(3);
              expect(mockPlayer2.score).toBe(10);
              expect(mockPlayer3.score).toBe(11);
              expect(mockPlayer4.score).toBe(0);
            });
            it("returns the expected game status", () => {
              expect(result).toEqual(
                new FinalTurnResultStatus(
                  mockPlayer3,
                  [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
                  2,
                  [
                    { player: mockPlayer1, card: new SimpleDeckCard(1) },
                    { player: mockPlayer2, card: new SimpleDeckCard(10) },
                    { player: mockPlayer3, card: new SimpleDeckCard(10) },
                    { player: mockPlayer4, card: new SimpleDeckCard(4) },
                  ],
                  null
                )
              );
            });
          });
        });
        describe("if the game is a draw", () => {
          describe("if the turn has a winner", () => {
            const gameProvider = new GameProvider();
            const mockPlayer1 = new Player("p1");
            const mockPlayer2 = new Player("p2");
            const mockPlayer3 = new Player("p3");
            const mockPlayer4 = new Player("p5");

            const mockGame = new Game(
              [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
              new Deck([]),
              new SimpleDeckCardComparator(),
              2
            );
            let result: GameStatus;
            beforeAll(() => {
              jest
                .spyOn(gameProvider, "getGame")
                .mockImplementation((id: string) => mockGame);

              jest.spyOn(mockGame, "hasEnded");

              jest
                .spyOn(mockPlayer1, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(1));
              jest
                .spyOn(mockPlayer2, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(19));
              jest
                .spyOn(mockPlayer3, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer4, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(4));

              mockPlayer1.score = 3;
              mockPlayer2.score = 10;
              mockPlayer3.score = 11;

              mockGame.turnNumber = 1;
              result = new PlayTurn(gameProvider).run("game-id");
            });

            it("gets the game", () => {
              expect(gameProvider.getGame).toBeCalledTimes(1);
              expect(gameProvider.getGame).toBeCalledWith("game-id");
            });
            it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
              expect(mockGame.hasEnded).toBeCalledTimes(2);
            });
            it("increments the game's turn number", () => {
              expect(mockGame.turnNumber).toBe(2);
            });
            it("plays the top card of every player", () => {
              expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
            });
            it("determines the turn winner and increments their score", () => {
              expect(mockPlayer1.score).toBe(3);
              expect(mockPlayer2.score).toBe(11);
              expect(mockPlayer3.score).toBe(11);
              expect(mockPlayer4.score).toBe(0);
            });
            it("returns the expected game status", () => {
              expect(result).toEqual(
                new FinalTurnResultStatus(
                  null,
                  [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
                  2,
                  [
                    { player: mockPlayer1, card: new SimpleDeckCard(1) },
                    { player: mockPlayer2, card: new SimpleDeckCard(19) },
                    { player: mockPlayer3, card: new SimpleDeckCard(10) },
                    { player: mockPlayer4, card: new SimpleDeckCard(4) },
                  ],
                  mockPlayer2
                )
              );
            });
          });
          describe("if the turn ended in a draw", () => {
            const gameProvider = new GameProvider();
            const mockPlayer1 = new Player("p1");
            const mockPlayer2 = new Player("p2");
            const mockPlayer3 = new Player("p3");
            const mockPlayer4 = new Player("p5");

            const mockGame = new Game(
              [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
              new Deck([]),
              new SimpleDeckCardComparator(),
              2
            );
            let result: GameStatus;
            beforeAll(() => {
              jest
                .spyOn(gameProvider, "getGame")
                .mockImplementation((id: string) => mockGame);

              jest.spyOn(mockGame, "hasEnded");

              jest
                .spyOn(mockPlayer1, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(1));
              jest
                .spyOn(mockPlayer2, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer3, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(10));
              jest
                .spyOn(mockPlayer4, "playTopCard")
                .mockImplementation(() => new SimpleDeckCard(4));

              mockPlayer1.score = 3;
              mockPlayer2.score = 10;
              mockPlayer3.score = 10;

              mockGame.turnNumber = 1;
              result = new PlayTurn(gameProvider).run("game-id");
            });

            it("gets the game", () => {
              expect(gameProvider.getGame).toBeCalledTimes(1);
              expect(gameProvider.getGame).toBeCalledWith("game-id");
            });
            it("checks if the game has ended twice, at the start of the turn and at the end of the turn", () => {
              expect(mockGame.hasEnded).toBeCalledTimes(2);
            });
            it("increments the game's turn number", () => {
              expect(mockGame.turnNumber).toBe(2);
            });
            it("plays the top card of every player", () => {
              expect(mockPlayer1.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer2.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer3.playTopCard).toBeCalledTimes(1);
              expect(mockPlayer4.playTopCard).toBeCalledTimes(1);
            });
            it("determines the turn winner and increments their score", () => {
              expect(mockPlayer1.score).toBe(3);
              expect(mockPlayer2.score).toBe(10);
              expect(mockPlayer3.score).toBe(10);
              expect(mockPlayer4.score).toBe(0);
            });
            it("returns the expected game status", () => {
              expect(result).toEqual(
                new FinalTurnResultStatus(
                  null,
                  [mockPlayer1, mockPlayer2, mockPlayer3, mockPlayer4],
                  2,
                  [
                    { player: mockPlayer1, card: new SimpleDeckCard(1) },
                    { player: mockPlayer2, card: new SimpleDeckCard(10) },
                    { player: mockPlayer3, card: new SimpleDeckCard(10) },
                    { player: mockPlayer4, card: new SimpleDeckCard(4) },
                  ],
                  null
                )
              );
            });
          });
        });
      });
    });
  });
});
