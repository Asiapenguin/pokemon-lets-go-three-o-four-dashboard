import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";

export class SignUpData {
  public username: string;
  public password: string;
  public characterName: string;
  public gender: string;
  public starterChoice: number;
}
@Component({
  selector: 'app-user-new-page',
  templateUrl: './user-new-page.component.html',
  styleUrls: ['./user-new-page.component.scss']
})
export class UserNewPageComponent {
  signUpData: SignUpData = new SignUpData();
  user: User = new User();
  starter: number;

  constructor(private userService: UserService) { }

  doSignUp() {
    console.log(this.user, this.starter);
  }

  setStarter(pokedexNumber: number) {
    this.starter = pokedexNumber;
  }
}
