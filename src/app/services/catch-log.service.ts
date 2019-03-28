import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { CatchLog } from '../models/catchLog';

@Injectable({
  providedIn: 'root'
})
export class CatchLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, CatchLog);
  }
}
