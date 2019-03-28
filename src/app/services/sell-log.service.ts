import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { SellLog } from '../models/sellLog';

@Injectable({
  providedIn: 'root'
})
export class SellLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, SellLog);
  }
}
