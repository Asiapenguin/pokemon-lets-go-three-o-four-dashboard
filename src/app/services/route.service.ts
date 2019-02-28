import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RouteService {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(["/home"], { replaceUrl: true });
  }

  goToLogin() {
    this.router.navigate(["/login"], { replaceUrl: true });
  }

  goToCreateAccount() {
    this.router.navigate(["/new"], { replaceUrl: true });
  }
}
