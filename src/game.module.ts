import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { SimpleDeckFactory } from "./entities/deck-factory";
import { GameProvider, PlayerProvider } from "./entityProviders";
import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  providers: [
    GameResolver,
    GameService,
    GameProvider,
    PlayerProvider,
    SimpleDeckFactory,
  ],
})
export class GameModule {}
