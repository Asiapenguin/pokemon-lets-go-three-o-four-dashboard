import { Resource } from "./resource";

export class Account extends Resource {
  static resourcePath = "/user";

  id: number;
  username: string;
  password: string;
  badges_owned: number;
  location: string;
  characterName: string;
  gender: string;
  balance: number;
  admin: boolean;
}
