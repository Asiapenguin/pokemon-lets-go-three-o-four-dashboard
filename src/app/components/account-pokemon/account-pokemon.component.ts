import { Component, OnInit, Input } from '@angular/core';
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: 'app-account-pokemon',
  templateUrl: './account-pokemon.component.html',
  styleUrls: ['./account-pokemon.component.scss']
})
export class AccountPokemonComponent implements OnInit {

  @Input() currentAccount: Account;
  currentAccountPokemon = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountPokemon(this.currentAccount.id).then((data: Pokemon[]) => {
      this.currentAccountPokemon = data;
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
