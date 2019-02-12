import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/services/header.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RouteService } from "src/app/services/route.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private routeService: RouteService
  ) {
    this.headerService.setComponent(this);
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.routeService.goToLogin();
    console.log("User logged out");
  }
}
