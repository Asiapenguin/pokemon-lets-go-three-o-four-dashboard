import { Component, OnInit } from '@angular/core';
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";

export class SignUpData {
  public username: string;
  public password: string;
  public characterName: string;
  public gender: string;
  public starterChoice: number;
}

@Component({
  selector: 'app-account-new-form',
  templateUrl: './account-new-form.component.html',
  styleUrls: ['./account-new-form.component.scss']
})
export class AccountNewFormComponent implements OnInit {
  signUpData: SignUpData = new SignUpData();
  account: Account = new Account();
  pokemon: Pokemon = new Pokemon();
  passwordConfirm = '';

  constructor(private accountService: AccountService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  doSignUp() {
    // POST /user
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
    },
    err => {
      console.log(err);
    });
  }

  setGender(gender: string) {
    this.account.gender = gender;
  }

  setStarter(pokedexNumber: number) {
    this.pokemon.dexNum = pokedexNumber;
  }

}
