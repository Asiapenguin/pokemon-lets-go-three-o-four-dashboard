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
  // account: Account = {
  //   id: 1,
  //   username: "nickkong",
  //   password: "1234",
  //   locatedat: "Viridian City",
  //   badges_owned: 0,
  //   characterName: "Asiapenguin",
  //   gender: "Male",
  //   balance: 2000,
  //   admin: false
  // };
  account: Account;
  expiry: Date;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  isUserAuthenticated() {
    // TODO: Check for username and password match
    this.account = this.getAccount();
    if (this.account) {
      return true;
    } else {
      return false;
    }

  }

  isAdminAuthenticated() {
    // TODO: Check for username and password match, and admin privileges
    this.account = this.getAccount();
    if (this.account) {
      if (this.account.admin) {
        return true;
      }
    } else {
      return false;
    }
  }

  getAccount(): Account {
    return this.account;
  }

  authenticate(username: string, password: string): Promise<Account> {
    return new Promise((res, rej) => {
      // TODO: remove and implement fully
      this.http
        .post(this.urlService.getEndpoint() + "/authenticate", {
          username: username,
          password: password
        })
        .subscribe(
          (data: Account) => {
            this.account = data;
            if (this.account) {
              res(this.account);
            } else {
              rej('Invalid account');
            }
          },
          err => {
            console.log("AuthenticationService error: ", err);
            rej(err);
          }
        );
      // res(this.account);
    });
  }

  logout() {
    // TODO: do logout
  }
}
