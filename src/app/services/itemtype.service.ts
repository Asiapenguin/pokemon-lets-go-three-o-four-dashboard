import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { ItemType } from "../models/itemType";
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService extends ResourceService {
  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, ItemType);
  }

  deleteItemTypeByType(type: string) {
    return new Promise((res, rej) => {
      this.http.delete(this.urlService.getEndpoint() + "/itemType/" + type).subscribe(data => {
        res(data);
      },
      err => {
        rej(err);
      });
    });
  }

  updateCostByType(itemType: ItemType) {
    return new Promise((res, rej) => {
      this.http.put(this.urlService.getEndpoint() + "/itemType/" + itemType.type, itemType).subscribe((data: ItemType) => {
        res(data);
      },
      err => {
        rej(err);
      })
    })
  }
}
