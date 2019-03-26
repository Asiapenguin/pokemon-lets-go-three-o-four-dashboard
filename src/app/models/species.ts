import { Resource } from "./resource";

export class Species extends Resource {
  static resourcePath = "/species";

  id: number;
  name: string;
  typei: string;
  typeii: string;
  foundAt: string;
}
