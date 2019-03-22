import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Item } from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Item);
  }
}
