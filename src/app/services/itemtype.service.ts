import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { ItemType } from "../models/itemType";

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, ItemType);
  }
}
