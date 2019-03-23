import { Routes } from "@angular/router";
import { LoginPageComponent } from "src/app/pages/login-page/login-page.component";
import { HomePageComponent } from "src/app/pages/home-page/home-page.component";
import { LayoutComponent } from "src/app/layout/layout.component";
import { UserAuthenticationGuard } from "src/app/services/user-authentication.guard";
import { AdminPageComponent } from "src/app/pages/admin-page/admin-page.component";
import { AdminAuthenticationGuard } from "src/app/services/admin-authentication.guard";
import { AccountNewPageComponent } from "src/app/pages/account-new-page/account-new-page.component";
import { Role } from "src/app/models/role";

export const userAuthenticatedRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminPageComponent,
    canActivate: [UserAuthenticationGuard],
    data: {
      title: "Admin",
      role: [Role.Admin]
    }
  },
  {
    path: "home",
    component: HomePageComponent,
    data: {
      title: "Home"
    }
  }
];

// export const adminAuthenticatedRoutes: Routes = [
//   {
//     path: "",
//     redirectTo: "admin",
//     pathMatch: "full"
//   },
//   {
//     path: "admin",
//     component: AdminPageComponent,
//     data: {
//       title: "Admin"
//     }
//   }
// ];

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: userAuthenticatedRoutes,
    canActivate: [UserAuthenticationGuard]
  },
  // {
  //   path: "",
  //   component: LayoutComponent,
  //   children: adminAuthenticatedRoutes,
  //   canActivate: [AdminAuthenticationGuard]
  // },
  {
    path: "login",
    component: LoginPageComponent,
    data: {
      title: "Login"
    }
  },
  {
    path: "new",
    component: AccountNewPageComponent,
    data: {
      title: "New Account"
    }
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];
