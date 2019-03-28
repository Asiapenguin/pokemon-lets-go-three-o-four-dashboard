import { Resource } from "./resource";

export class MoveAcrossLog extends Resource {
  static resourcePath = "/moveAcross";

  id: number;
  playableid: number;
  mapname: string;
  happenedat: Date;
}
