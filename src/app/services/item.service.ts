import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Item } from '../models/item';
import { UrlService } from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends ResourceService {
  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, Item);
  }

  setItemToUsed(accountId: number, itemType: string) {
    return new Promise((res, rej) => {
      // PUT /item
      this.http
        .put(this.urlService.getEndpoint() + "/item", {
          userId: accoun,
          itemType: itemType
        })
        .subscribe(
          data => {
            console.log("Used ball to catch pokemon: ", data);
            res(data);
          },
          err => {
            console.log("CatchPokemonComponent PUT /item error: ", err);
            rej(err);
          }
        );
    });
  }
}
