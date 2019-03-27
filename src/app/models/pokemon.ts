import { Resource } from "./resource";

export class Pokemon extends Resource {
  static resourcePath = "/pokemon";

  id: number;
  name: string;
  typeOne: string;
  typeTwo: string;
  foundAt: string;
  nickname: string;
  dexNum: number;
  status: string;
  battlesDone: number;
  ownerId: number;
}
