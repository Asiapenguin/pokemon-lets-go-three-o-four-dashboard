import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { UrlService } from "./url.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = "";
  receiveEventHandler: any;
  user: User;
  expiry: Date;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  isAuthenticated() {
    // TODO: Check for username and password match
    return false;
  }

  getUser(): User {
    return this.user;
  }

  authenticate(username: string, password: string): Promise<User> {
    return new Promise((res, rej) => {
      // TODO: remove and implement fully
      const user: User = {
        id: 1,
        username: "nickkong",
        password: "1234",
        location: "Pallet Town",
        badges_owned: 0,
        characterName: "Asiapenguin",
        gender: "Male"
      };

      res(user);

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
