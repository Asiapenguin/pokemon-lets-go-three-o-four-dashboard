import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/models/account';
import { ItemTypeService } from 'src/app/services/itemtype.service';
import { ItemType } from 'src/app/models/itemType';
import { ListResponse } from 'src/app/services/resource.service';
import { AccountService } from 'src/app/services/account.service';
import { ItemPurchase } from './sale-item/sale-item.component';
import { Item } from "src/app/models/item";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: 'app-pokemart',
  templateUrl: './pokemart.component.html',
  styleUrls: ['./pokemart.component.scss']
})
export class PokemartComponent implements OnInit {

  @Input() currentAccount: Account;
  @Output() newBalance = new EventEmitter<number>();
  saleItemTypes = [];

  constructor(private itemTypeService: ItemTypeService, private itemService: ItemService, private accountService: AccountService) { }

  ngOnInit() {
    this.itemTypeService.findAll().get().then((data: ListResponse<ItemType>) => {
      this.saleItemTypes = data.data;
    },
    err => {
      console.log("AccountForm GET /item error: ", err);
    });
  }

  purchase(itemPurchase: ItemPurchase) {
    const cost = itemPurchase.itemType.cost * itemPurchase.quantity;
    const newBalance = this.currentAccount.balance - cost;

    const editAccount = this.currentAccount;
    console.log("PokemartComponent editAccount: ", this.currentAccount);
    editAccount.balance = newBalance;
    this.newBalance.emit(editAccount.balance);
    // PUT: /account
    this.accountService.update(editAccount).then((data: Account) => {
      console.log(`PUT: Account ID ${editAccount.id}'s balance is now ${data.balance}`);
      this.currentAccount.balance = data.balance;
    },
    err => {
      console.log("PokemartComponent PATCH /account new balance error: ", err);
    });

    const promiseArr = [];
    for (let i = 0 ; i < itemPurchase.quantity ; i++) {
      const newItem = new Item();
      newItem.playableId = this.currentAccount.id;
      newItem.type = itemPurchase.itemType.type;
      // POST: /item
      promiseArr.push(this.itemService.create(newItem));
    }

    Promise.all(promiseArr).then(data => {
      console.log(`All items have been created for Account ID ${editAccount.id}: ${data}`);
    },
    err => {
      console.log("PokemartComponent Promise.all POST /item error: ", err);
    });

  }
}
