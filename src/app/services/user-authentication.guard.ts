import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class UserAuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isUserAuthenticated()) {
      const currentAccount = this.authenticationService.getAccount();
      if (route.data.roles && route.data.roles.indexOf(currentAccount.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/login'], { replaceUrl: true });
        return false;
    }
      return true;
    }
    this.router.navigate(["/login"], { replaceUrl: true });
    return false;
  }
}
