import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { MoveAcrossLog } from '../models/moveAcrossLog';

@Injectable({
  providedIn: 'root'
})
export class MoveAcrossLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, MoveAcrossLog);
  }
}
