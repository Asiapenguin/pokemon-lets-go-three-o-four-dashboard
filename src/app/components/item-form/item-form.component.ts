import { Component, OnInit } from '@angular/core';
import { ItemService } from "src/app/services/item.service";
import { Item } from "src/app/models/item";
import { UrlService } from "src/app/services/url.service";

export class ItemInfo {
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

  itemInfo: ItemInfo = new ItemInfo();

  constructor(private itemService: ItemService, private urlService: UrlService) { }

  ngOnInit() {
  }

  deleteItem() {
    const itemToBeDeleted = new Item();
    itemToBeDeleted.id = this.itemInfo.deleteId;

    // DELETE: /item
    this.itemService.remove(itemToBeDeleted).then(
      data => {
        console.log(
          `DELETE - Item ID ${
            this.itemInfo.deleteId
          } has been deleted: ${data}`
        );
      },
      err => {
        console.log("ItemForm DELETE /item error: ", err);
      }
    );
  }

  updateCost() {
    // PATCH: /item
    this.http
      .patch(this.urlService.getEndpoint() + "/item/cost", {
        updateId: this.itemInfo.updateId,
        newCost: this.itemInfo.newCost
      })
      .subscribe(
        data => {
          console.log(
            `PATCH - Item ID ${
              this.itemInfo.updateId
            }'s cost is set to ${this.itemInfo.newCost}: ${data}`
          );
        },
        err => {
          console.log("ItemForm PATCH /item error: ", err);
        }
      );
  }

}
