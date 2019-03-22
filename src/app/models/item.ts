import { Resource } from "./resource";

export class Item extends Resource {
  static resourcePath = "/item";

  id: number;
  name: string;
  cost: number;
}
