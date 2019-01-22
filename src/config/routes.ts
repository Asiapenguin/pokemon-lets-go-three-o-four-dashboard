import { Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'home',
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
  }
];
