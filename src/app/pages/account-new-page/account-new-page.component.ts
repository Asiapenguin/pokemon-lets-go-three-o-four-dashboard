import { Component } from "@angular/core";
import { RouteService } from "src/app/services/route.service";
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";
import { ItemService } from "src/app/services/item.service";
import { Item } from "src/app/models/item";

export class SignUpData {
  public username: string;
  public password: string;
  public name: string;
  public gender: string;
  public starterChoice: number;
}

@Component({
  selector: "app-account-new-page",
  templateUrl: "./account-new-page.component.html",
  styleUrls: ["./account-new-page.component.scss"]
})
export class AccountNewPageComponent {
  signUpData: SignUpData = new SignUpData();
  account: Account = new Account();
  pokemon: Pokemon = new Pokemon();

  constructor(
    private accountService: AccountService,
    private pokemonService: PokemonService,
    private routeService: RouteService,
    private itemService: ItemService
  ) {}

  doSignUp() {
    // POST /account
    console.log("ACCOUNT NEW PAGE ACCOUNT:", this.account);
    this.accountService.create(this.account).then(
      (data: Account) => {
        this.account = data;
        console.log("After create user: ", this.account);
        this.pokemon.ownerId = this.account.id;
        // POST /pokemon
        this.pokemonService.create(this.pokemon).then(
          (newPokemon: Pokemon) => {
            this.pokemon = newPokemon;
            console.log("After create pokemon: ", this.pokemon);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  goBack() {
    this.routeService.goToLogin();
  }
}
