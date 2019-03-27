import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";
import { ItemTypeService } from "src/app/services/itemtype.service";
import { ListResponse } from "src/app/services/resource.service";
import { ItemType } from "src/app/models/itemType";

export class AccountInfo {
  public deleteAccId: number;
  public balanceAccId: number;
  public balance: number;
  public itemTypeId: number;
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
    private urlService: UrlService,
    private http: HttpClient
  ) {}

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
        console.log(
          `DELETE - Account ID ${
            this.accountInfo.deleteAccId
          } has been deleted: ${data}`
        );
      },
      err => {
        console.log("AccountForm DELETE /account error: ", err);
      }
    );
  }

  setBalance() {
    // PATCH: /account
    this.http
      .patch(this.urlService.getEndpoint() + "/account/balance", {
        balanceAccId: this.accountInfo.balanceAccId,
        balance: this.accountInfo.balance
      })
      .subscribe(
        data => {
          console.log(
            `PATCH - Account ID ${
              this.accountInfo.balanceAccId
            }'s balance is set to ${this.accountInfo.balance}: ${data}`
          );
        },
        err => {
          console.log("PokemonForm PATCH /owner error: ", err);
        }
      );
  }

  addItem() {
    // TODO
    console.log(
      this.accountInfo.itemTypeId,
      this.accountInfo.addItemAccId,
      this.accountInfo.itemQuantity
    );
    // /item
    // { playableId, itemType: string, quantity: number }
  }
}
