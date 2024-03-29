import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RouteService } from "src/app/services/route.service";

export class LoginData {
  public username: string;
  public password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements AfterViewInit {
  @Input() autofocus = true; // should autofocus username field (default true)

  @ViewChild("usernameInput") usernameInput: ElementRef;
  loginData: LoginData = new LoginData();

  constructor(
    private routeService: RouteService,
    private authenticationService: AuthenticationService
  ) {}

  ngAfterViewInit() {
    if (this.autofocus) {
      this.usernameInput.nativeElement.focus();
    }
  }

  // Emit event to login output
  doLogin() {
    const sanitizedLoginData = this.sanitize(this.loginData);
    console.log("Login Data: ", sanitizedLoginData);
    this.authenticationService
      .authenticate(sanitizedLoginData.username, sanitizedLoginData.password)
      .then(
        user => {
          if (user) {
            console.log("User Data: ", user);
            if (user.admin) {
              this.routeService.goToAdmin();
            } else {
              this.routeService.goToHome();
            }
          }
        },
        err => {
          console.log("login-page error: ", err);
        }
      );
  }

  // Sanitize input
  private sanitize(loginData: LoginData): LoginData {
    const username = loginData.username;
    loginData.username = username.replace(/[^0-9a-zA-Z@_]/g, "");

    return loginData;
  }

  createNewAccount() {
    this.routeService.goToCreateAccount();
  }
}
