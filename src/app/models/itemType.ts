import { Resource } from "./resource";

export class ItemType extends Resource {
  static resourcePath = "/itemType";

  id: number;
  type: string;
  cost: number;
}
