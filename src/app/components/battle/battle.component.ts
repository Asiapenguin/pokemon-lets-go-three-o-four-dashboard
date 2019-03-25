import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MapRegion } from 'src/app/models/mapRegion';
import { Npc } from 'src/app/models/npc';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit, OnChanges {

  @Input() gym: boolean;
  @Input() currentMap: MapRegion;
  @Input() currentAccount: Account;
  @Input() currentTrainers: Npc[];
  @Input() currentGymLeaders: Npc[];
  @Output() newBalance = new EventEmitter<number>();


  constructor(private accountService: AccountService) { }

  ngOnInit() {
   
  }

  ngOnChanges(changes) {
    // TODO: DOES NOT UPDATE POKEMART'S BALANCE
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
    }
  }
}
