import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from "src/app/models/user";
import { EventEmitter } from 'events';

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
