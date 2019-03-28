import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { BattleLog } from "../models/battleLog";

@Injectable({
  providedIn: 'root'
})
export class BattleLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, BattleLog);
  }
}
