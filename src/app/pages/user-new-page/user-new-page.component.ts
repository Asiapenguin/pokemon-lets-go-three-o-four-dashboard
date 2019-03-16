import { Component } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouteService } from "src/app/services/route.service";

export class SignUpData {
  public username: string;
  public password: string;
  public characterName: string;
  public gender: string;
  public starterChoice: number;
}
@Component({
  selector: 'app-user-new-page',
  templateUrl: './user-new-page.component.html',
  styleUrls: ['./user-new-page.component.scss']
})
export class UserNewPageComponent {
  signUpData: SignUpData = new SignUpData();
  user: User = new User();
  pokemon: Pokemon = new Pokemon();

  constructor(private userService: UserService, private pokemonService: PokemonService, private routeService: RouteService) { }

  doSignUp() {
    // POST /user
    this.userService.create(this.user).then((data: User) => {
      this.user = data;
      console.log("After create user: ", this.user);
      this.pokemon.ownerID = this.user.id;
      // POST /pokemon
      this.pokemonService.create(this.pokemon).then((data: Pokemon) => {
        this.pokemon = data;
        console.log("After create pokemon: ", this.pokemon);
      });
    },
    err => {
      console.log(err);
    });
  }

  setStarter(pokedexNumber: number) {
    this.pokemon.dexNum = pokedexNumber;
  }

  goBack() {
    this.routeService.goToLogin();
  }
}
