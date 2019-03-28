import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Npc } from "src/app/models/npc";
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-gym-leader-item, [app-gym-leader-item]',
  templateUrl: './gym-leader-item.component.html',
  styleUrls: ['./gym-leader-item.component.scss']
})
export class GymLeaderItemComponent implements OnInit, OnChanges {

  @Input() gymLeader: Npc;
  @Input() currentPokemon: Pokemon[];
  @Output() win = new EventEmitter<boolean>();
  result = "";
  allFainted;
  constructor() { }

  ngOnInit() {
    this.setAllFainted();
  }

  ngOnChanges() {
    this.setAllFainted();
  }

  setAllFainted() {
    const p = this.currentPokemon.find(p => p.status === "Healthy");
    this.allFainted = typeof p === "undefined" ? true : false;
  }

  getResult() {
    if (Math.random() > 0.5) {
      this.result = "WIN";
      this.win.emit(true);
    } else {
      this.result = "LOSE";
      this.win.emit(false);
    }
  }

}
