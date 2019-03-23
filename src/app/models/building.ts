import { Resource } from "./resource";

export class Building extends Resource {
  static resourcePath = "/building";

  id: number;
  region: string;
  type: string;
}
