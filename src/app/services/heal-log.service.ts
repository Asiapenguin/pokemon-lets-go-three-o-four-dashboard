import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { HealLog } from '../models/healLog';

@Injectable({
  providedIn: 'root'
})
export class HealLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, HealLog);
  }
}
