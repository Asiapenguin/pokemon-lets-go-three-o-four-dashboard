import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

export class LoginData {
  public username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {
  @Output() login = new EventEmitter<LoginData>();
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild('usernameInput') usernameInput: ElementRef;
  loginData: LoginData = new LoginData();

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  emitLoginData() {
    this.login.emit(this.sanitize(this.loginData));
  }

  // Sanitize input
  private sanitize(loginData: LoginData): LoginData {
    const username = loginData.username;
    loginData.username = username.replace(/[^0-9a-zA-Z@_]/g, '');

    return loginData;
  }
}
