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
    const newNpc = new Npc();
    newNpc.id = this.npcInfo.npcId;
    newNpc.reward = this.npcInfo.newReward;
    // PUT: /npc/:id
    this.npcService.update(newNpc).then((data: Npc) => {
      console.log(`Updated reward of NPC with ID ${data.id} to ${data.reward}`);
    },
    err => {
      console.log(`NpcFormComponent PUT /npc/:id failed: ${err}`);
    });
  }
}
