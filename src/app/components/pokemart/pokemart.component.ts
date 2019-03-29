import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Account } from "src/app/models/account";
import { ItemTypeService } from "src/app/services/itemtype.service";
import { ItemType } from "src/app/models/itemType";
import { ListResponse } from "src/app/services/resource.service";
import { AccountService } from "src/app/services/account.service";
import { Item } from "src/app/models/item";
import { ItemService } from "src/app/services/item.service";
import { SellLogService } from "src/app/services/sell-log.service";
import { MapRegion } from 'src/app/models/mapRegion';
import { SellLog } from 'src/app/models/sellLog';

@Component({
  selector: "app-pokemart",
  templateUrl: "./pokemart.component.html",
  styleUrls: ["./pokemart.component.scss"]
})
export class PokemartComponent implements OnInit {
  @Input() currentAccount: Account;
  @Input() currentMap: MapRegion;
  @Output() newBalance = new EventEmitter<number>();
  saleItemTypes = [];

  constructor(
    private itemTypeService: ItemTypeService,
    private itemService: ItemService,
    private accountService: AccountService,
    private sellLogService: SellLogService
  ) {}

  ngOnInit() {
    this.itemTypeService
      .findAll()
      .get()
      .then(
        (data: ListResponse<ItemType>) => {
          this.saleItemTypes = data.data;
        },
        err => {
          console.log("AccountForm GET /item error: ", err);
        }
      );
  }

  purchase(itemType: ItemType) {
    const newBalance = this.currentAccount.balance - itemType.cost;

    const editAccount = this.currentAccount;
    editAccount.balance = newBalance;
    this.newBalance.emit(editAccount.balance);
    // PUT: /account
    this.accountService.update(editAccount).then(
      (data: Account) => {
        console.log(
          `PUT: Account ID ${editAccount.id}'s balance is now ${data.balance}`
        );
        this.currentAccount.balance = data.balance;
      },
      err => {
        console.log(
          "PokemartComponent PATCH /account new balance error: ",
          err
        );
      }
    );

      const newItem = new Item();
      newItem.playableId = this.currentAccount.id;
      newItem.type = itemType.type;
      
      // POST: /item
      this.itemService.create(newItem).then(
      (data: Item) => {
        this.createSellLog(this.currentAccount.id, data.id);
        console.log(
          `Item of type ${data.type} have been created for Account ID ${
            editAccount.id
          }: ${data}`
        );
      },
      err => {
        console.log("PokemartComponent Promise.all POST /item error: ", err);
      }
    );
  }

  createSellLog(playableId: number, itemId: number) {
    const pokemartBuildingId = this.currentMap.buildings
      .filter(b => b.type === "PokeMart")
      .map(b => b.id);
    const newSellLog = new SellLog();
    newSellLog.buildingid = pokemartBuildingId[0];
    newSellLog.playableid = playableId;
    newSellLog.itemid = itemId;
    this.sellLogService.create(newSellLog).then((data: SellLog) => {
      console.log(
        `Sell log created for Account with ID ${
          data.playableid
        } at Building with ID ${
          data.buildingid
        }`
      );
    },
    err => {
      console.log("PokemartComponent POST /sell failed: ", err);
    });
  }
}
