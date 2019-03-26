import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Npc } from "src/app/models/npc";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { Pokemon } from "src/app/models/pokemon";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: 'app-battle-trainer',
  templateUrl: './battle-trainer.component.html',
  styleUrls: ['./battle-trainer.component.scss']
})
export class BattleTrainerComponent implements OnInit {

  @Input() currentTrainers: Npc[] = [];
  @Input() currentAccount: Account;
  @Input() currentPokemon: Pokemon[];
  @Output() newBalance = new EventEmitter<number>();

  constructor(private accountService: AccountService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  battleTrainer(win: boolean, trainer: Npc) {
    if (win) {
      const newBalanceAccount = this.currentAccount;
      newBalanceAccount.balance += trainer.reward;
      this.newBalance.emit(newBalanceAccount.balance);
      // PUT /user
      this.accountService.update(newBalanceAccount).then(
        (data: Account) => {
          this.currentAccount = data;
        },
        err => {
          console.log("BattleTrainerComponent PUT /account error: ", err);
        }
      );
    } else {
      const faintedPokemon = this.currentPokemon.find(
        p => p.status === "Healthy"
      );
      faintedPokemon.status = "Fainted";
      // PUT /pokemon
      this.pokemonService.update(faintedPokemon).then((data: Pokemon) => {
        console.log(
          `Pokemon ID ${faintedPokemon.id} has fainted from the battle: ${data}`
        );
      },
      err => {
        console.log("BattleTrainerComponent PUT /pokemon error: ", err);
      });
    }
  }
}
