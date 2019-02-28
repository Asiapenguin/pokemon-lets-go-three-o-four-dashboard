import { Resource } from "./resource";

export class User extends Resource {
  static resourcePath = "/user";

  id: number;
  username: string;
  password: string;
  badges_owned: number;
  location: string;
  characterName: string;
  gender: string;
  // starterChoice: number;
}
