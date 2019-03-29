import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemType } from 'src/app/models/itemType';


@Component({
  selector: 'app-sale-item, [app-sale-item]',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent implements OnInit {

  @Input() saleItemType: ItemType;
  @Input() balance: number;
  @Output() purchase = new EventEmitter<ItemType>();

  // currentQuantity: number;
  haveEnoughBalance = true;
  saleItemSrc = "";

  constructor() { }

  ngOnInit() {
    // this.currentQuantity = 0;
    this.setSaleItemSrc(this.saleItemType.type);
  }

  private setSaleItemSrc(name: string) {
    this.saleItemSrc = `../../../assets/item-sprites/${name.replace(" ", "-")}.png`;
  }

  // decrementQuantity() {
  //   if (this.currentQuantity > 0) {
  //     this.currentQuantity -= 1;
  //     this.checkBalance();
  //   }
  // }

  // incrementQuantity() {
  //   this.currentQuantity += 1;
  //   this.checkBalance();
  // }

  private checkBalance() {
    // this.haveEnoughBalance = this.balance >= this.currentQuantity * this.saleItemType.cost;
    this.haveEnoughBalance = this.balance >= this.saleItemType.cost;
  }

  makePurchase() {
    this.purchase.emit(this.saleItemType);
  }
}
