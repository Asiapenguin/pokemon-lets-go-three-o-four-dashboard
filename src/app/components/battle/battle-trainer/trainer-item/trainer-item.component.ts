import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Npc } from "src/app/models/npc";

@Component({
  selector: 'app-trainer-item, [app-trainer-item]',
  templateUrl: './trainer-item.component.html',
  styleUrls: ['./trainer-item.component.scss']
})
export class TrainerItemComponent implements OnInit {

  @Input() trainer: Npc;
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
