import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { HttpClient } from '@angular/common/http';
import { NpcService } from 'src/app/services/npc.service';
import { Npc } from 'src/app/models/npc';


export class NpcInfo {
  public npcId: number;
  public newReward: number;
}

@Component({
  selector: 'app-npc-form',
  templateUrl: './npc-form.component.html',
  styleUrls: ['./npc-form.component.scss']
})
export class NpcFormComponent implements OnInit {

  npcInfo: NpcInfo = new NpcInfo();
  constructor(private npcService: NpcService) { }

  ngOnInit() {
  }

  updateReward() {
    // PUT: /npc/:id
    this.npcService.updateReward(this.npcInfo.npcId, this.npcInfo.newReward).then((data: Npc) => {
      console.log(`PUT /npc/${this.npcInfo.npcId}: ${data}`);
    },
    err => {
      console.log(`PUT /npc/${this.npcInfo.npcId} error: ${err}`);
    })
  }
}
