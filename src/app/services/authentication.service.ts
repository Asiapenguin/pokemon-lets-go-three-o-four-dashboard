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
    location: "Viridian City",
    badges_owned: 0,
    characterName: "Asiapenguin",
    gender: "Male",
    admin: false
  };
  expiry: Date;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  isUserAuthenticated() {
    // TODO: Check for username and password match
    return true;
  }

  isAdminAuthenticated() {
    // TODO: Check for username and password match, and admin privileges
    return false;
  }

  getAccount(): Account {
    return this.account;
  }

  authenticate(username: string, password: string): Promise<Account> {
    return new Promise((res, rej) => {
      // TODO: remove and implement fully
      res(this.account);

      // POST /user with username and password

      // this.http
      //   .post(this.urlService.getEndpoint() + User.resourcePath, {
      //     username: username,
      //     password: password
      //   })
      //   .subscribe(
      //     (data: User) => {
      //       const user = this.user;
      //       if (user) {
      //         res(user);
      //       } else {
      //         rej('Invalid user');
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
    });
  }

  logout() {
    // TODO: do logout
  }
}
