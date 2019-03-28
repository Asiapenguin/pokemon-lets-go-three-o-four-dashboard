import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Npc } from '../models/npc';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class NpcService extends ResourceService {
  
  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, Npc);
  }

  updateReward(id: number, reward: number) {
    return new Promise((res, rej) => {
      this.http
      .put(this.urlService.getEndpoint() + "/npc/" + id, {
        id: id,
        reward: reward
      })
      .subscribe(
        (data: Npc) => {
          res(data);
        },
        err => {
          rej(err);
        }
      );
  
    })
  }
}
