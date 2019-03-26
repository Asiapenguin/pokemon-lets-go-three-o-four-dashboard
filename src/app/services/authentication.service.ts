import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../models/account";
import { UrlService } from "./url.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = "";
  receiveEventHandler: any;
  account: Account = {
    id: 1,
    username: "nickkong",
    password: "1234",
    locatedat: "Viridian City",
    badges_owned: 0,
    characterName: "Asiapenguin",
    gender: "Male",
    balance: 2000,
    admin: false
  };
  // account: Account;
  expiry: Date;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  isUserAuthenticated() {
    // TODO: Check for username and password match
    return true;
  }

  isAdminAuthenticated() {
    // TODO: Check for username and password match, and admin privileges
    if (this.account.admin) {
      return true;
    }
    return false;
  }

  getAccount(): Account {
    return this.account;
  }

  authenticate(username: string, password: string): Promise<Account> {
    return new Promise((res, rej) => {
      // TODO: remove and implement fully
      // this.http
      //   .post(this.urlService.getEndpoint() + "/authenticate", {
      //     username: username,
      //     password: password
      //   })
      //   .subscribe(
      //     (data: Account) => {
      //       this.account = data;
      //       if (this.account) {
      //         res(this.account);
      //       } else {
      //         rej('Invalid account');
      //       }
      //     },
      //     err => {
      //       this.logout();
      //       if (err.status === 401 || err.status === 403) {
      //         rej(err.statusText);
      //       } else if (err.error) {
      //         rej(err.error);
      //       } else {
      //         rej();
      //       }
      //     }
      //   );
      res(this.account);
    });
  }

  logout() {
    // TODO: do logout
  }
}
