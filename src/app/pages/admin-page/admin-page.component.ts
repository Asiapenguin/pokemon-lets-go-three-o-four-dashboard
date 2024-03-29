import { Component, OnInit } from '@angular/core';
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  newAccount: Account = new Account();
  editAccount: Account = new Account();
  pokemon: Pokemon = new Pokemon();

  constructor(private accountService: AccountService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }
  
  createAccount() {
    // POST /account
    this.accountService.create(this.newAccount).then((data: Account) => {
      this.newAccount = data;
      console.log("After create account: ", this.newAccount);
      this.pokemon.ownerId = this.newAccount.id;
      // POST /pokemon
      this.pokemonService.create(this.pokemon).then((data: Pokemon) => {
        this.pokemon = data;
        console.log("After create pokemon: ", this.pokemon);
      },
      err => {
        console.log(err);
      });
    },
    err => {
      console.log(err);
    });
  }

  updateAccount() {
    // PUT: /account
    this.accountService.update(this.editAccount).then((data: Account) => {
      this.editAccount = data;
      console.log("After update account: ", this.editAccount);
    },
    err => {
      console.log(err);
    });
  }
}
