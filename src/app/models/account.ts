import { Resource } from "./resource";

export class Account extends Resource {
  static resourcePath = "/user";

  id: number;
  username: string;
  password: string;
  badgesowned: number;
  locatedat: string;
  name: string;
  gender: string;
  balance: number;
  admin: boolean;
}
