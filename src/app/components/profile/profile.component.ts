import { Component, OnInit, Input } from '@angular/core';
import { Account } from "src/app/models/account";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() currentAccount: Account;

  constructor() { }

  ngOnInit() {
  }

}
