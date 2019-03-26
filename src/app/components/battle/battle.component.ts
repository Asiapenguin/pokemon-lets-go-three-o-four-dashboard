import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapRegion } from 'src/app/models/mapRegion';
import { Npc } from 'src/app/models/npc';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Pokemon } from 'src/app/models/pokemon';
import { ListResponse } from 'src/app/services/resource.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  @Input() gym: boolean;
  @Input() currentMap: MapRegion;
  @Input() currentAccount: Account;
  @Input() currentTrainers: Npc[];
  @Input() currentGymLeaders: Npc[];
  @Output() newBalance = new EventEmitter<number>();
  currentAccountPokemon = [];

  constructor(private accountService: AccountService, private pokemonService: PokemonService, private http: HttpClient, private urlService: UrlService) { }

  ngOnInit() {
    // GET /user/:id/pokemons
    this.http.get(this.urlService.getEndpoint() + "/user/" + this.currentAccount.id + "/pokemons").subscribe((data: ListResponse<Pokemon>) => {
      this.currentAccountPokemon = data.data;
    },
      err => {
        console.log("BattleComponent GET /user/:id/pokemons error: ", err);
      });
  }

  battleTrainer(trainer: Npc) {
    if (Math.random() > 0.5) {
      const newBalanceAccount = this.currentAccount;
      newBalanceAccount.balance += trainer.reward;
      this.newBalance.emit(newBalanceAccount.balance);
      // PUT /user
      this.accountService.update(newBalanceAccount).then((data: Account) => {
        this.currentAccount = data;
      },
        err => {
          console.log("BattleComponent PUT /account error: ", err);
        });
    } else {
      const faintedPokemon = this.currentAccountPokemon.find(p => p.status === "Healthy");
      faintedPokemon.status = "Fainted";
      this.pokemonService.update(faintedPokemon).then((data: Pokemon) => {
        console.log(`Pokemon ID ${faintedPokemon.id} has fainted from the battle: ${data}`);
      })
    }
  }

  battleGymLeader(gymLeader: Npc) {
    if (Math.random() > 0.5) {
      const newBalanceAccount = this.currentAccount;
      newBalanceAccount.balance += gymLeader.reward;
      newBalanceAccount.badges_owned += 1;
      this.newBalance.emit(newBalanceAccount.balance);
      // PUT /user
      this.accountService.update(newBalanceAccount).then((data: Account) => {
        this.currentAccount = data;
      },
        err => {
          console.log("BattleComponent PUT /account error: ", err);
        });

    }
  }
}
