import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Npc } from "src/app/models/npc";

@Component({
  selector: 'app-gym-leader-item, [app-gym-leader-item]',
  templateUrl: './gym-leader-item.component.html',
  styleUrls: ['./gym-leader-item.component.scss']
})
export class GymLeaderItemComponent implements OnInit {

  @Input() gymLeader: Npc;
  @Output() win = new EventEmitter<boolean>();
  result = "";

  constructor() { }

  ngOnInit() {
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
