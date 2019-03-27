import { Component } from '@angular/core';
import { RouteService } from "src/app/services/route.service";
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';

export class SignUpData {
  public username: string;
  public password: string;
  public characterName: string;
  public gender: string;
  public starterChoice: number;
}

@Component({
  selector: 'app-account-new-page',
  templateUrl: './account-new-page.component.html',
  styleUrls: ['./account-new-page.component.scss']
})
export class AccountNewPageComponent {
  signUpData: SignUpData = new SignUpData();
  account: Account = new Account();
  pokemon: Pokemon = new Pokemon();

  constructor(private accountService: AccountService, private pokemonService: PokemonService, private routeService: RouteService, private itemService: ItemService) { }

  doSignUp() {
    // POST /account
    console.log("ACCOUNT NEW PAGE ACCOUNT:", this.account)
    this.accountService.create(this.account).then((data: Account) => {
      this.account = data;
      console.log("After create user: ", this.account);
      this.pokemon.ownerID = this.account.id;
      // POST /pokemon
      this.pokemonService.create(this.pokemon).then((data: Pokemon) => {
        this.pokemon = data;
        console.log("After create pokemon: ", this.pokemon);
      },
      err => {
        console.log(err);
      });
      
      const promiseArr = [];
      for (let i = 0 ; i < 20 ; i++) {
        const item = new Item();
        item.playableId = this.account.id;
        item.type = "Poke Ball";
        promiseArr.push(this.itemService.create(item));
      }

      Promise.all(promiseArr).then(data => {
        console.log("AccountNewPage Promise.all create 20 Poke Balls: ", data);
      },
      err => {
        console.log("AccountNewPage Promise.all error: ", err);
      })
    },
    err => {
      console.log(err);
    });
  }

  goBack() {
    this.routeService.goToLogin();
  }
}
