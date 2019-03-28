import { Resource } from "./resource";

export class SellLog extends Resource {
  static resourcePath = "/sell";

  id: number;
  itemid: number;
  buildingid: number;
  playableid: number;
  happenedat: Date;
}
