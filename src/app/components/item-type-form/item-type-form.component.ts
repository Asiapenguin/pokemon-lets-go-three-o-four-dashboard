import { Component, OnInit } from '@angular/core';
import { ItemTypeService } from "src/app/services/itemtype.service";
import { ItemType } from "src/app/models/itemType";
import { ListResponse } from 'src/app/services/resource.service';

export class ItemTypeInfo {
  public deleteItemType: string;
  public updateItemType: string;
  public newCost: number;
}

@Component({
  selector: 'app-item-type-form',
  templateUrl: './item-type-form.component.html',
  styleUrls: ['./item-type-form.component.scss']
})
export class ItemTypeFormComponent implements OnInit {

  itemTypeInfo: ItemTypeInfo = new ItemTypeInfo();
  itemTypes = [];

  constructor(private itemTypeService: ItemTypeService) { }

  ngOnInit() {
    this.itemTypeService.findAll().get().then((data: ListResponse<ItemType>) => {
      this.itemTypes = data.data;
    },
    err => {
      console.log("ItemForm GET /itemType error: ", err);
    });
  }

  deleteItem() {
    // DELETE: /itemType/:type
    this.itemTypeService.deleteItemTypeByType(this.itemTypeInfo.deleteItemType).then(data => {

    });
  }

  updateCost() {
    // PUT: /itemType/:type
    const itemType = new ItemType();
    itemType.type = this.itemTypeInfo.updateItemType;
    itemType.cost = this.itemTypeInfo.newCost;
    this.itemTypeService.updateCostByType(itemType).then((data: ItemType) => {
      console.log(`Item of type ${itemType.type}'s cost has been updated to ${itemType.cost}`);
    },
    err => {
      console.log("ItemTypeForm /PUT /itemType/:type error: ", err);
    })
  }

}
