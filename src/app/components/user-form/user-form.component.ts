import { Component, OnInit, Input } from '@angular/core';
import { User } from "src/app/models/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  passwordConfirm = '';

  constructor() { }

  ngOnInit() {
  }

  setGender(gender: string) {
    this.user.gender = gender;
  }
}
