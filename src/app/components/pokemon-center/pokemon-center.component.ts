import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Account } from "src/app/models/account";
import { PokemonService } from "src/app/services/pokemon.service";
import { ListResponse } from "src/app/services/resource.service";
import { Pokemon } from "src/app/models/pokemon";

@Component({
  selector: "app-pokemon-center",
  templateUrl: "./pokemon-center.component.html",
  styleUrls: ["./pokemon-center.component.scss"]
})
export class PokemonCenterComponent implements OnInit {
  currentAccount: Account;
  constructor(
    private authenticationService: AuthenticationService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
  }

  healAllPokemon() {
    this.getCurrentAccountPokemon().then((currentAccountPokemon: Pokemon[]) => {
      const promiseArr = [];
      const fainted = currentAccountPokemon.filter(pokemon => pokemon.status === "Fainted");
      for (let i = 0; i < fainted.length; i++) {
        const currentFainted = fainted[i];
        fainted[i].status = "Active";
        // PATCH: /pokemon ???
        promiseArr.push(this.pokemonService.patch(currentFainted));
      }

      Promise.all(promiseArr).then(data => {
        console.log("PokemonCenterComponent healAllPokemon Promise.all: ", data);
      });
    });
  }

  private getCurrentAccountPokemon() {
    // TODO: /user/:id/pokemon
    // GET: /pokemon?ownerId=
    return new Promise((res, rej) => {
      this.pokemonService
        .findWhere("ownerId", this.currentAccount.id)
        .get()
        .then(
          (data: ListResponse<Pokemon>) => {
            console.log(
              "PokemonCenterComponent Current Account Pokemon: ",
              data.data
            );
            res(data.data);
          },
          err => {
            console.log(
              "PokemonCenterComponent GET /pokemon?ownerId= error: ",
              err
            );
            rej(err);
          }
        );
    });
  }
}
