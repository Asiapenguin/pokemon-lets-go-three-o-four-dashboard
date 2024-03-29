import { Resource } from "./resource";
import { Building } from "./building";

export class MapRegion extends Resource {
  static resourcePath = "/mapRegion";

  id: number;
  name: string;
  type: string;
  maxspawnnumber: number;
  buildings: Building[];
}
