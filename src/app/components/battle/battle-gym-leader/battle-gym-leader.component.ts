import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Npc } from "src/app/models/npc";
import { Pokemon } from "src/app/models/pokemon";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: "app-battle-gym-leader",
  templateUrl: "./battle-gym-leader.component.html",
  styleUrls: ["./battle-gym-leader.component.scss"]
})
export class BattleGymLeaderComponent implements OnInit {
  @Input() currentGymLeaders: Npc[] = [];
  @Input() currentAccount: Account;
  @Input() currentPokemon: Pokemon[];
  @Output() newBalance = new EventEmitter<number>();

  constructor(private accountService: AccountService, private pokemonService: PokemonService) {}

  ngOnInit() {}

  battleGymLeader(win: boolean, gymLeader: Npc) {
    if (win) {
      const newBalanceAccount = this.currentAccount;
      newBalanceAccount.balance += gymLeader.reward;
      newBalanceAccount.badgesowned += 1;
      this.newBalance.emit(newBalanceAccount.balance);
      // PUT /user
      this.accountService.update(newBalanceAccount).then(
        (data: Account) => {
          this.currentAccount = data;
        },
        err => {
          console.log("BattleGymLeaderComponent PUT /user error: ", err);
        }
      );
    } else {
      const willFaintPokemon = this.currentPokemon.find(
        p => p.status === "Healthy"
      );
      if (willFaintPokemon) {
        willFaintPokemon.status = "Fainted";
        // PUT /pokemon
        this.pokemonService.update(willFaintPokemon).then(
          (data: Pokemon) => {
            console.log(
              `Pokemon ID ${
                willFaintPokemon.id
              } has fainted from the battle: ${data}`
            );
          },
          err => {
            console.log("BattleGymLeaderComponent PUT /pokemon error: ", err);
          }
        );
      }
    }
  }
}
