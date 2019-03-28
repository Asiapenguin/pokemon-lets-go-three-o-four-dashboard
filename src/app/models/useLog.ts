import { Resource } from "./resource";

export class UseLog extends Resource {
  static resourcePath = "/use";

  id: number;
  playableid: number;
  pokemonid: number;
  itemid: number;
  happenedat: Date;
}
