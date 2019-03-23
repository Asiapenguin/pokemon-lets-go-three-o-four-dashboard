import { Resource } from "./resource";

export class MapRegion extends Resource {
  static resourcePath = "/mapRegion";

  id: number;
  name: string;
  type: string;
  maxSpawnNumber: number;
  buildings: any;
}
