import { Component, OnInit, Input } from '@angular/core';
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { ListResponse } from "src/app/services/resource.service";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";

@Component({
  selector: 'app-account-pokemon',
  templateUrl: './account-pokemon.component.html',
  styleUrls: ['./account-pokemon.component.scss']
})
export class AccountPokemonComponent implements OnInit {

  @Input() currentAccount: Account;
  currentAccountPokemon = [];

  constructor(private http: HttpClient, private urlService: UrlService) { }

  ngOnInit() {
    this.getCurrentAccountPokemon().then((data: Pokemon[]) => {
      this.currentAccountPokemon = data;
    });
  }

  private getCurrentAccountPokemon() {
    // GET: /user/:id/pokemons
    return new Promise((res, rej) => {
      this.http
        .get(
          this.urlService.getEndpoint() +
            "/user/" +
            this.currentAccount.id +
            "/pokemons"
        )
        .subscribe((data: ListResponse<Pokemon>) => {
          res(data.data);
        },
        err => {
          rej(err);
        });
    });
  }

  getPokemonIconSrc(name: string) {
    return `../../../assets/pokemon-sprites/${name}.gif`;
  }

  haveNickname(pokemon: Pokemon) {
    return (pokemon.nickname !== null);
  }

  getStatus(pokemon: Pokemon) {
    switch (pokemon.status) {
      case "Healthy":
        return "green";
      case "Fainted":
        return "red";
    }
  }
}
