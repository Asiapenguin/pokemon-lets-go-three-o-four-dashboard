import { Resource } from "./resource";

export class Npc extends Resource {
  static resourcePath = "/npc";

  id: number;
  locatedAt: string;
  name: string;
  role: string;
  reward: number;
}
