import { Routes } from "@angular/router";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { HomePageComponent } from "src/app/pages/home-page/home-page.component";
import { LayoutComponent } from "src/app/layout/layout.component";
import { UserAuthenticationGuard } from "src/app/services/user-authentication.guard";
import { UserNewPageComponent } from "src/app/pages/user-new-page/user-new-page.component";
import { AdminPageComponent } from "src/app/pages/admin-page/admin-page.component";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { AdminAuthenticationGuard } from "src/app/services/admin-authentication.guard";

export const userAuthenticatedRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomePageComponent,
    data: {
      title: "Home"
    }
  }
];

export const adminAuthenticatedRoutes: Routes = [
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminPageComponent,
    data: {
      title: "Admin"
    }
  }
];

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: userAuthenticatedRoutes,
    canActivate: [UserAuthenticationGuard]
  },
  {
    path: "",
    component: LayoutComponent,
    children: adminAuthenticatedRoutes,
    canActivate: [AdminAuthenticationGuard]
  },
  {
    path: "login",
    component: LoginPageComponent,
    data: {
      title: "Login"
    }
  },
  {
    path: "new",
    component: UserNewPageComponent,
    data: {
      title: "New User"
    }
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];
