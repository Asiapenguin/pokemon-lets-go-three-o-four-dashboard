import { Resource } from "./resource";

export class HealLog extends Resource {
  static resourcePath = "/heal";

  id: number;
  pokemonid: number;
  buildingid: number;
  playableid: number;
  happenedat: Date;
}
