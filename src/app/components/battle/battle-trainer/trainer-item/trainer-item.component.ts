import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Npc } from "src/app/models/npc";
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-trainer-item, [app-trainer-item]',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.scss']
})
export class TrainerItemComponent implements OnInit, OnChanges {

  @Input() trainer: Npc;
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
