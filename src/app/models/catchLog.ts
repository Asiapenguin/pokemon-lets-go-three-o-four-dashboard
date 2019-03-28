import { Resource } from "./resource";

export class CatchLog extends Resource {
  static resourcePath = "/catch";

  id: number;
  playableid: number;
  pokemonid: number;
  itemid: number;
  happenedat: Date;
}
