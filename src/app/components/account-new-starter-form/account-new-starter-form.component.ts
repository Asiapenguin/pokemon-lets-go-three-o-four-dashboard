import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Account } from 'src/app/models/account';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-account-new-starter-form',
  templateUrl: './account-new-starter-form.component.html',
  styleUrls: ['./account-new-starter-form.component.scss']
})
export class AccountNewStarterFormComponent implements OnInit {

  @Input() account: Account;
  @Input() pokemon: Pokemon;

  constructor(private accountService: AccountService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  setStarter(pokedexNumber: number) {
    this.pokemon.dexNum = pokedexNumber;
  }

}
