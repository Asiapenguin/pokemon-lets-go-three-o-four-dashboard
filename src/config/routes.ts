import { Routes } from "@angular/router";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { HomePageComponent } from "src/app/pages/home-page/home-page.component";
import { LayoutComponent } from "src/app/layout/layout.component";
import { AuthenticationGuard } from "src/app/services/authentication.guard";

export const authenticatedRoutes: Routes = [
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

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: authenticatedRoutes,
    canActivate: [AuthenticationGuard]
  },
  { path: "login", component: LoginPageComponent, data: { title: "Login" } },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];
