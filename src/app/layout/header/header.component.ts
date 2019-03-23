import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/services/header.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RouteService } from "src/app/services/route.service";
import { Role } from "src/app/models/role";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  admin = false;

  constructor(
    private headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private routeService: RouteService
  ) {
    this.headerService.setComponent(this);
  }

  ngOnInit() {
    this.admin = this.checkAdminPrivileges();
  }

  checkAdminPrivileges() {
    const account = this.authenticationService.getAccount();

    return account && account.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.routeService.goToLogin();
    console.log("User logged out");
  }
}
