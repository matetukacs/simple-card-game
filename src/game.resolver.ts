import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GameService } from "./game.service";

@Resolver()
export class GameResolver {
  constructor(private readonly gameService: GameService) {}
  @Query(() => String)
  scoreStatus(
    @Args({ name: "gameId", type: () => String }) gameId: string
  ): string {
    return this.gameService.getScoreStatus(gameId).toString();
  }

  @Mutation(() => String)
  startGame(
    @Args({ name: "player1Name", type: () => String }) player1Name: string,
    @Args({ name: "player2Name", type: () => String }) player2Name: string
  ) {
    return this.gameService.startGame(player1Name, player2Name).toString();
  }

  @Mutation(() => String)
  playTurn(@Args({ name: "gameId", type: () => String }) gameId: string) {
    return this.gameService.playTurn(gameId).toString();
  }
}
