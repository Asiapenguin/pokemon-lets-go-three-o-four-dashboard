import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Account } from "src/app/models/account";
import { PokemonService } from "src/app/services/pokemon.service";
import { ListResponse } from "src/app/services/resource.service";
import { Pokemon } from "src/app/models/pokemon";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: "app-pokemon-center",
  templateUrl: "./pokemon-center.component.html",
  styleUrls: ["./pokemon-center.component.scss"]
})
export class PokemonCenterComponent implements OnInit {
  currentAccount: Account;

  constructor(
    private authenticationService: AuthenticationService,
    private pokemonService: PokemonService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
  }

  healAllPokemon() {
    this.accountService.getAccountPokemon(this.currentAccount.id).then((currentAccountPokemon: Pokemon[]) => {
      const promiseArr = [];
      const fainted = currentAccountPokemon.filter(
        pokemon => pokemon.status === "Fainted"
      );
      for (let i = 0; i < fainted.length; i++) {
        const currentFainted = fainted[i];
        fainted[i].status = "Healthy";
        // PATCH: /pokemon ???
        promiseArr.push(this.pokemonService.update(currentFainted));
      }

      Promise.all(promiseArr).then(data => {
        console.log(
          "PokemonCenterComponent healAllPokemon Promise.all: ",
          data
        );
      });
    });
  }
}
