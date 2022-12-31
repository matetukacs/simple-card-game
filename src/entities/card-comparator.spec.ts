import {
  SimpleDeckCard,
  StandardDeckCard,
  StandardDeckRank,
  StandardDeckSuit,
} from "./card";
import {
  AceValueConfig,
  SimpleDeckCardComparator,
  StandardDeckCardComparator,
} from "./card-comparator";

describe("SimpleDeckCardComparator", () => {
  describe("compare", () => {
    const comparator = new SimpleDeckCardComparator();
    it("ranks cards as expected", () => {
      for (let i = 2; i <= 52; i++) {
        expect(
          comparator.compare(new SimpleDeckCard(i - 1), new SimpleDeckCard(i))
        ).toBeLessThan(0);
      }

      expect(
        comparator.compare(new SimpleDeckCard(10), new SimpleDeckCard(4))
      ).toBeGreaterThan(0);
    });
  });
});
describe("StandardDeckCardComparator", () => {
  describe("compare", () => {
    describe("if configured to treat ace as the highest card", () => {
      const comparator = new StandardDeckCardComparator(
        AceValueConfig.AceIsHighestCard
      );
      it("ranks cards as expected", () => {
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Two, StandardDeckSuit.Hearts),
            new StandardDeckCard(
              StandardDeckRank.Three,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Three,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Four, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Four,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Five, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Five,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Six, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Six, StandardDeckSuit.Hearts),
            new StandardDeckCard(
              StandardDeckRank.Seven,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Seven,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(
              StandardDeckRank.Eight,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Eight,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Nine, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Nine,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Ten, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Ten, StandardDeckSuit.Hearts),
            new StandardDeckCard(StandardDeckRank.Jack, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Jack,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(
              StandardDeckRank.Queen,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Queen,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.King, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.King,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Ace, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Ace, StandardDeckSuit.Hearts),
            new StandardDeckCard(StandardDeckRank.Two, StandardDeckSuit.Hearts)
          )
        ).toBeGreaterThan(0);
      });
    });

    describe("if configured to treat ace as the lowest card", () => {
      const comparator = new StandardDeckCardComparator(
        AceValueConfig.AceIsLowestCard
      );
      it('ranks cards as expected"', () => {
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Two, StandardDeckSuit.Hearts),
            new StandardDeckCard(
              StandardDeckRank.Three,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Three,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Four, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Four,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Five, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Five,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Six, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Six, StandardDeckSuit.Hearts),
            new StandardDeckCard(
              StandardDeckRank.Seven,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Seven,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(
              StandardDeckRank.Eight,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Eight,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Nine, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Nine,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Ten, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Ten, StandardDeckSuit.Hearts),
            new StandardDeckCard(StandardDeckRank.Jack, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Jack,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(
              StandardDeckRank.Queen,
              StandardDeckSuit.Hearts
            )
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.Queen,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.King, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(
              StandardDeckRank.King,
              StandardDeckSuit.Hearts
            ),
            new StandardDeckCard(StandardDeckRank.Ace, StandardDeckSuit.Hearts)
          )
        ).toBeGreaterThan(0);
        expect(
          comparator.compare(
            new StandardDeckCard(StandardDeckRank.Ace, StandardDeckSuit.Hearts),
            new StandardDeckCard(StandardDeckRank.Two, StandardDeckSuit.Hearts)
          )
        ).toBeLessThan(0);
      });
    });
  });
});
