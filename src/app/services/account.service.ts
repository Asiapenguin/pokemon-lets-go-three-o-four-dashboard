import { Injectable, Injector } from "@angular/core";
import { Account } from "../models/account";
import { ResourceService } from "./resource.service";

@Injectable({
  providedIn: "root"
})
export class AccountService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Account);
  }
}
