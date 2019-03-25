import { Component, OnInit } from '@angular/core';
import { ItemTypeService } from "src/app/services/itemtype.service";
import { ItemType } from "src/app/models/itemType";
import { UrlService } from "src/app/services/url.service";
import { HttpClient } from '@angular/common/http';

export class ItemTypeInfo {
  public deleteId: number;
  public updateId: number;
  public newCost: number;
}

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  itemTypeInfo: ItemTypeInfo = new ItemTypeInfo();

  constructor(private itemTypeService: ItemTypeService, private urlService: UrlService, private http: HttpClient) { }

  ngOnInit() {
  }

  deleteItem() {
    const itemToBeDeleted = new ItemType();
    itemToBeDeleted.id = this.itemTypeInfo.deleteId;

    // DELETE: /itemType
    this.itemTypeService.remove(itemToBeDeleted).then(
      data => {
        console.log(
          `DELETE - ItemType ID ${
          this.itemTypeInfo.deleteId
          } has been deleted: ${data}`
        );
      },
      err => {
        console.log("ItemForm DELETE /itemType error: ", err);
      }
    );
  }

  updateCost() {
    // PATCH: /itemType
    const itemType = new ItemType();
    itemType.id = this.itemTypeInfo.updateId;
    itemType.cost = this.itemTypeInfo.newCost;
    this.itemTypeService.patch(itemType).then(data => {
      console.log(`PATCH - ItemType ID ${
        this.itemTypeInfo.updateId
        }'s cost is set to ${this.itemTypeInfo.newCost}: ${data}`)
    },
    err => {
      console.log("ItemForm PATCH /itemType error: ", err);
    })
  }

}
