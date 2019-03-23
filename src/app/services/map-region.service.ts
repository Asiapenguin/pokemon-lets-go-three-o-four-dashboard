import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { MapRegion } from '../models/mapRegion';

@Injectable({
  providedIn: 'root'
})
export class MapRegionService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, MapRegion);
  }
}
