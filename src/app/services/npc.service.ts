import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Npc } from '../models/npc';

@Injectable({
  providedIn: 'root'
})
export class NpcService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Npc);
  }
}
