import { Injectable } from "@nestjs/common";
import { Card, Game, Player } from "src/entities";

@Injectable()
export class PlayerProvider {
  private games = new Map<string, Game<Card>>();

  public createPlayers<T extends Card>(names: string[]): Player<T>[] {
    return names.map((name) => new Player<T>(name));
  }
}
