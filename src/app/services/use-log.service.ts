import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { UseLog } from '../models/useLog';

@Injectable({
  providedIn: 'root'
})
export class UseLogService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, UseLog);
  }
}
