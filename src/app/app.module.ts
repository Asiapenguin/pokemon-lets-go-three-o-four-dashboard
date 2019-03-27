import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AccountFormComponent } from "./components/account-form/account-form.component";
import { AccountNewFormComponent } from "./components/account-new-form/account-new-form.component";
import { AccountNewPageComponent } from "./pages/account-new-page/account-new-page.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { HeaderComponent } from "./layout/header/header.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ItemFormComponent } from "./components/item-form/item-form.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainComponent } from "./layout/main/main.component";
import { PokemonFormComponent } from "./components/pokemon-form/pokemon-form.component";
import { NpcFormComponent } from './components/npc-form/npc-form.component';
import { MapFormComponent } from './components/map-form/map-form.component';
import { AccountNewStarterFormComponent } from './components/account-new-starter-form/account-new-starter-form.component';
import { MapMoveComponent } from "./components/map-move/map-move.component";
import { PokemonCenterComponent } from "./components/pokemon-center/pokemon-center.component";
import { PokemartComponent } from "./components/pokemart/pokemart.component";
import { CatchPokemonComponent } from "./components/catch-pokemon/catch-pokemon.component";
import { PokedexPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { BattleComponent } from './components/battle/battle.component';
import { BattleTrainerComponent } from "./components/battle/battle-trainer/battle-trainer.component";
import { TrainerItemComponent } from "./components/battle/battle-trainer/trainer-item/trainer-item.component";
import { BattleGymLeaderComponent } from "./components/battle/battle-gym-leader/battle-gym-leader.component";
import { GymLeaderItemComponent } from "./components/battle/battle-gym-leader/gym-leader-item/gym-leader-item.component";
import { SaleItemComponent } from './components/pokemart/sale-item/sale-item.component';
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AccountPokemonComponent } from "./components/account-pokemon/account-pokemon.component";
import { AccountItemComponent } from "./components/account-item/account-item.component";

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    AccountNewFormComponent,
    AccountNewPageComponent,
    AdminPageComponent,
    HeaderComponent,
    HomePageComponent,
    ItemFormComponent,
    LayoutComponent,
    LoginPageComponent,
    MainComponent,
    PokemonFormComponent,
    NpcFormComponent,
    MapFormComponent,
    AccountNewStarterFormComponent,
    MapMoveComponent,
    PokemonCenterComponent,
    PokemartComponent,
    CatchPokemonComponent,
    SaleItemComponent,
    PokedexPageComponent,
    BattleComponent,
    BattleTrainerComponent,
    TrainerItemComponent,
    BattleGymLeaderComponent,
    GymLeaderItemComponent,
    ProfilePageComponent,
    ProfileComponent,
    AccountPokemonComponent,
    AccountItemComponent
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
