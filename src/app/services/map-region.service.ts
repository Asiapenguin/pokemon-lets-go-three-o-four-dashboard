import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { MapRegion } from '../models/mapRegion';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class MapRegionService extends ResourceService {
  
  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, MapRegion);
  }

  updateSpawnNumber(mapRegionName: string, spawnNum: number) {
    return new Promise((res, rej) => {
      this.http
      .put(this.urlService.getEndpoint() + "/mapRegion/" + mapRegionName, {
        name: mapRegionName,
        maxSpawnNumber: spawnNum
      })
      .subscribe(
        (data: MapRegion) => {
          res(data);
        },
        err => {
          rej(err);
        }
      );
    })
  }
}
