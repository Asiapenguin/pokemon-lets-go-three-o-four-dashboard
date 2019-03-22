import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { HttpClient } from '@angular/common/http';


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
  constructor(private urlService: UrlService, private http: HttpClient) { }

  ngOnInit() {
  }

  updateReward() {
    // PATCH: /npc
    this.http
      .patch(this.urlService.getEndpoint() + "/npc", {
        npcId: this.npcInfo.npcId,
        newReward: this.npcInfo.newReward
      })
      .subscribe(
        data => {
          console.log(
            `PATCH - NPC ID ${
            this.npcInfo.npcId
            }'s reward is set to ${this.npcInfo.newReward}: ${data}`
          );
        },
        err => {
          console.log("NpcForm PATCH /npc error: ", err);
        }
      );
  }
}
