import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { MainComponent } from "./layout/main/main.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { PokemonFormComponent } from "./components/pokemon-form/pokemon-form.component";
import { AccountNewFormComponent } from "./components/account-new-form/account-new-form.component";
import { AccountNewPageComponent } from "./pages/account-new-page/account-new-page.component";
import { AccountFormComponent } from "./components/account-form/account-form.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    AccountNewPageComponent,
    AdminPageComponent,
    PokemonFormComponent,
    AccountNewFormComponent,
    AccountFormComponent
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
