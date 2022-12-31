import { Card, Deck, Game, Player } from "src/entities";
import { SimpleDeckCard } from "../entities/card";
import {
  CardComparator,
  SimpleDeckCardComparator,
} from "../entities/card-comparator";
import { SimpleDeckFactory } from "../entities/deck-factory";
import { GameProvider, PlayerProvider } from "../entityProviders";
import { GameStartedStatus, StartGame } from "./start-game";

describe("StartGame", () => {
  describe("run", () => {
    describe("if the number of cards is divisible by the number of players", () => {
      const playerProvider = new PlayerProvider();
      const gameProvider = new GameProvider();
      const deckFactory = new SimpleDeckFactory();
      const mockDeck = new Deck([
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
      ]);
      const cardComparator = new SimpleDeckCardComparator();
      const mockPlayers = [
        new Player("p1"),
        new Player("p2"),
        new Player("p3"),
        new Player("p5"),
      ];
      const mockGame = new Game(
        [],
        mockDeck,
        new SimpleDeckCardComparator(),
        1
      );
      let result: GameStartedStatus;
      beforeAll(() => {
        jest
          .spyOn(playerProvider, "createPlayers")
          .mockImplementation((names: string[]) => mockPlayers);

        jest
          .spyOn(gameProvider, "createGame")
          .mockImplementation(
            (
              players: Player<Card>[],
              deck: Deck<Card>,
              cardComparator: CardComparator<Card>,
              totalNumberOfTurns: number
            ) => mockGame
          );

        jest
          .spyOn(deckFactory, "createDeck")
          .mockImplementation(() => mockDeck);

        jest.spyOn(mockDeck, "shuffle");
        jest.spyOn(mockGame, "dealRound");

        result = new StartGame(
          playerProvider,
          gameProvider,
          deckFactory,
          cardComparator
        ).run(["p1", "p2", "p3", "p4"]);
      });

      it("creates players", () => {
        expect(playerProvider.createPlayers).toBeCalledTimes(1);
        expect(playerProvider.createPlayers).toBeCalledWith([
          "p1",
          "p2",
          "p3",
          "p4",
        ]);
      });

      it("creates a deck", () => {
        expect(deckFactory.createDeck).toBeCalledTimes(1);
      });

      it("creates a game with the expected arguments", () => {
        expect(gameProvider.createGame).toBeCalledTimes(1);
        expect(gameProvider.createGame).toBeCalledWith(
          mockPlayers,
          mockDeck,
          cardComparator,
          3
        );
      });

      it("shuffles the deck", () => {
        expect(mockDeck.shuffle).toBeCalledTimes(1);
      });

      it("deals the same number of cards to everyone as many rounds the game will have", () => {
        expect(mockGame.dealRound).toBeCalledTimes(3);
      });

      it("returns the game status", () => {
        expect(result).toEqual(new GameStartedStatus(mockGame));
      });
    });
    describe("if the number of cards is not divisible by the number of players", () => {
      const playerProvider = new PlayerProvider();
      const gameProvider = new GameProvider();
      const deckFactory = new SimpleDeckFactory();
      const mockDeck = new Deck([
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
      ]);
      const cardComparator = new SimpleDeckCardComparator();
      const mockPlayers = [
        new Player("p1"),
        new Player("p2"),
        new Player("p3"),
      ];
      const mockGame = new Game(
        [],
        mockDeck,
        new SimpleDeckCardComparator(),
        1
      );
      let result: GameStartedStatus;
      beforeAll(() => {
        jest
          .spyOn(playerProvider, "createPlayers")
          .mockImplementation((names: string[]) => mockPlayers);

        jest
          .spyOn(gameProvider, "createGame")
          .mockImplementation(
            (
              players: Player<Card>[],
              deck: Deck<Card>,
              cardComparator: CardComparator<Card>,
              totalNumberOfTurns: number
            ) => mockGame
          );

        jest
          .spyOn(deckFactory, "createDeck")
          .mockImplementation(() => mockDeck);

        jest.spyOn(mockDeck, "shuffle");
        jest.spyOn(mockGame, "dealRound");

        result = new StartGame(
          playerProvider,
          gameProvider,
          deckFactory,
          cardComparator
        ).run(["p1", "p2", "p3", "p4"]);
      });

      it("creates players", () => {
        expect(playerProvider.createPlayers).toBeCalledTimes(1);
        expect(playerProvider.createPlayers).toBeCalledWith([
          "p1",
          "p2",
          "p3",
          "p4",
        ]);
      });

      it("creates a deck", () => {
        expect(deckFactory.createDeck).toBeCalledTimes(1);
      });

      it("creates a game with the expected arguments", () => {
        expect(gameProvider.createGame).toBeCalledTimes(1);
        expect(gameProvider.createGame).toBeCalledWith(
          mockPlayers,
          mockDeck,
          cardComparator,
          4
        );
      });

      it("shuffles the deck", () => {
        expect(mockDeck.shuffle).toBeCalledTimes(1);
      });

      it("deals the same number of cards to everyone as many rounds the game will have", () => {
        expect(mockGame.dealRound).toBeCalledTimes(4);
      });

      it("returns the game status", () => {
        expect(result).toEqual(new GameStartedStatus(mockGame));
      });
    });
  });
});
