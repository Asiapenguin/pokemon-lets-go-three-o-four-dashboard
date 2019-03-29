import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Npc } from "src/app/models/npc";
import { Pokemon } from "src/app/models/pokemon";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { PokemonService } from "src/app/services/pokemon.service";
import { BattleLog } from "src/app/models/battleLog";
import { BattleLogService } from "src/app/services/battle-log.service";

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

  constructor(
    private accountService: AccountService,
    private pokemonService: PokemonService,
    private battleLogService: BattleLogService
  ) {}

  ngOnInit() {}

  battleGymLeader(win: boolean, gymLeader: Npc) {
    if (win) {
      const newBalanceAccount = this.currentAccount;
      newBalanceAccount.balance += gymLeader.reward;
      if (this.currentAccount.badgesowned <= 7) {
        newBalanceAccount.badgesowned += 1;
      }
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
      if (typeof willFaintPokemon !== "undefined") {
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

    this.createBattleLog(this.currentAccount.id, gymLeader.id);
  }

  createBattleLog(playableId: number, nonPlayableId: number) {
    const newBattleLog = new BattleLog();
    newBattleLog.playableid = playableId;
    newBattleLog.nonplayableid = nonPlayableId;
    this.battleLogService.create(newBattleLog).then(
      (data: BattleLog) => {
        console.log(
          `Battle log created for Account with ID ${
            data.playableid
          } battling NPC with ID ${data.nonplayableid}`
        );
      },
      err => {
        console.log("BattleTrainerComponent POST /battle failed: ", err);
      }
    );
  }
}
