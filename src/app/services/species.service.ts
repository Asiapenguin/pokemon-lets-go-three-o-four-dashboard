import { Injectable, Injector } from '@angular/core';
import { ResourceService, ListResponse } from "./resource.service";
import { Species } from '../models/species';
import { UrlService } from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService extends ResourceService {

  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, Species);
  }

  filterSpeciesBy(type: string) {
    return new Promise((res, rej) => {
      let result = [];
      this.http.get(this.urlService.getEndpoint() + "/species/id/search?typei=" + type).subscribe((data: ListResponse<any>) => {
        const typeIResults = data.data.map(d => d.id );
        result = result.concat(typeIResults);
        this.http.get(this.urlService.getEndpoint() + "/species/id/search?typeii=" + type).subscribe((data: ListResponse<any>) => {
          const typeIIResults = data.data.map(d => d.id);
          result = result.concat(typeIIResults);
          res(result);
        },
        err => {
          rej(err);
        });
      },
      err => {
        rej(err);
      });
    });
  }
}
