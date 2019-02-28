import { Injectable, Injector } from "@angular/core";
import { User } from "../models/user";
import { ResourceService } from "./resource.service";

@Injectable({
  providedIn: "root"
})
export class UserService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, User);
  }
}
