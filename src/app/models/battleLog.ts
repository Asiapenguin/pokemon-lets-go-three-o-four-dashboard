import { Resource } from "./resource";

export class BattleLog extends Resource {
  static resourcePath = "/battle";

  id: number;
  playableid: number;
  nonplayableid: number;
  happenedat: Date;
}
