import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { MapRegion } from "src/app/models/mapRegion";
import { Npc } from "src/app/models/npc";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";

@Component({
  selector: "app-battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.scss"]
})
export class BattleComponent implements OnInit, OnChanges {
  @Input() gym: boolean;
  @Input() currentMap: MapRegion;
  @Input() currentAccount: Account;
  @Input() currentNpcs: Npc[];
  @Output() newBalance = new EventEmitter<number>();
  currentPokemon = [];
  currentTrainers = [];
  currentGymLeaders = [];

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getAccountPokemon(this.currentAccount.id)
      .then((data: Pokemon[]) => {
        this.currentPokemon = data;
      });
  }

  ngOnChanges(changes) {
    this.processNpcs(this.currentNpcs);
  }

  processNpcs(data: Npc[]) {
    this.currentTrainers = [];
    this.currentGymLeaders = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].role === "Trainer") {
        this.currentTrainers.push(data[i]);
      } else {
        this.currentGymLeaders.push(data[i]);
      }
    }
  }

  setBalance(balance: number) {
    this.newBalance.emit(balance);
  }
}
