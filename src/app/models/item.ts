import { Resource } from "./resource";

export class Item extends Resource {
  static resourcePath = "/item";

  id: number;
  type: string;
  playableId: number;
  used: boolean;
}
