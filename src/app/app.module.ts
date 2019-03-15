import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { MainComponent } from "./layout/main/main.component";
import { UserNewPageComponent } from "./pages/user-new-page/user-new-page.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    UserNewPageComponent,
    UserFormComponent,
    AdminPageComponent
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
