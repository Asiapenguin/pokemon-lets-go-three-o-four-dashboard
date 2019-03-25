import { Resource } from "./resource";

export class Species extends Resource {
  static resourcePath = "/species";

  id: number;
  name: string;
  typeI: string;
  typeII: string;
  foundAt: string;
}
