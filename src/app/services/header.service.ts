import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { HeaderComponent } from "../layout/header/header.component";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  private headerComponent: HeaderComponent;

  constructor(private router: Router) {}

  setComponent(headerComponent: HeaderComponent) {
    this.headerComponent = headerComponent;
  }
}
