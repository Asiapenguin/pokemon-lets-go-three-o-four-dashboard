import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";

@Component({
  selector: "app-account-new-form",
  templateUrl: "./account-new-form.component.html",
  styleUrls: ["./account-new-form.component.scss"]
})
export class AccountNewFormComponent implements OnInit {

  @Input() account: Account;
  @Input() pokemon: Pokemon;
  passwordConfirm = "";

  constructor() {}

  ngOnInit() {}

  setGender(gender: string) {
    this.account.gender = gender;
  }
}
