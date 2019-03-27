import { Component, OnInit } from '@angular/core';
import { Account } from "src/app/models/account";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  currentAccount: Account;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
    console.log("ProfilePage currentAccount: ", this.currentAccount);
  }

}
