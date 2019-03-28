import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { ItemTypeService } from "src/app/services/itemtype.service";
import { ListResponse } from "src/app/services/resource.service";
import { ItemType } from "src/app/models/itemType";
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';

export class AccountInfo {
  public deleteAccId: number;
  public balanceAccId: number;
  public balance: number;
  public itemType: string;
  public addItemAccId: number;
  public itemQuantity: number;
}
@Component({
  selector: "app-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.scss"]
})
export class AccountFormComponent implements OnInit {
  accountInfo: AccountInfo = new AccountInfo();
  itemTypes = [];

  constructor(
    private accountService: AccountService,
    private itemTypeService: ItemTypeService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.itemTypeService.findAll().get().then((data: ListResponse<ItemType>) => {
      this.itemTypes = data.data;
    },
    err => {
      console.log("AccountForm GET /itemType error: ", err);
    });
  }

  deleteAccount() {
    const accountToBeDeleted = new Account();
    accountToBeDeleted.id = this.accountInfo.deleteAccId;
    // DELETE: /account
    this.accountService.remove(accountToBeDeleted).then(
      data => {

      },
      err => {

      }
    );
  }

  // setBalance() {
  //   // PATCH: /account
  //   this.http
  //     .put(this.urlService.getEndpoint() + "/user/" + this.accountInfo.balanceAccId, {
  //       balanceAccId: this.accountInfo.balanceAccId,
  //       balance: this.accountInfo.balance
  //     })
  //     .subscribe(
  //       data => {
  //         console.log(
  //           `PATCH - Account ID ${
  //             this.accountInfo.balanceAccId
  //           }'s balance is set to ${this.accountInfo.balance}: ${data}`
  //         );
  //       },
  //       err => {
  //         console.log("PokemonForm PATCH /owner error: ", err);
  //       }
  //     );
  // }

  addItem() {
    const promiseArr = [];

    for (let i = 0; i < this.accountInfo.itemQuantity; i++) {
      const newItem = new Item();
      newItem.playableId = this.accountInfo.addItemAccId;
      newItem.type = this.accountInfo.itemType;
      // POST /item
      promiseArr.push(this.itemService.create(newItem));
    }

    Promise.all(promiseArr).then(data => {
      console.log(`${this.accountInfo.itemQuantity} item(s) of type ${this.accountInfo.itemType} have been added to account ID ${this.accountInfo.addItemAccId}`)
    },
      err => {
        console.log("AccountFormComponent Promise.all POST /item error: ", err);
      });
  }
}
