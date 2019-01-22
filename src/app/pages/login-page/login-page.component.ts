import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

/**
 * LoginData Class
 * Passed in as the first parameter when LoginComponent emits loginAction output
 */
export class LoginData {
  public username: string;
  public password: string;
}

/**
 * LoginComponent Class
 */
@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {
  @Output() login = new EventEmitter<LoginData>();
  @Input() autofocus = true; // should autofocus username field (default true)
  @Input() error: string; // error msg display

  @ViewChild('errorDisplay') errorDisplay: ElementRef;
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

    let password = loginData.password;
    password = password.trim();
    loginData.password = password;
    return loginData;
  }
}
