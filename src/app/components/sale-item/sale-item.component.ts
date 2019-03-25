import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemType } from 'src/app/models/itemType';

export class ItemPurchase {
  public itemType: ItemType;
  public quantity: number;
}

@Component({
  selector: '[app-sale-item]',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent implements OnInit {

  @Input() saleItemType: ItemType;
  @Input() balance: number;
  @Output() purchase = new EventEmitter<ItemPurchase>();

  currentQuantity: number;
  haveEnoughBalance = true;
  saleItemSrc = "";

  constructor() { }

  ngOnInit() {
    this.currentQuantity = 0;
    this.setSaleItemSrc(this.saleItemType.name);
  }

  private setSaleItemSrc(name: string) {
    this.saleItemSrc = `../../../assets/item-sprites/${name.replace(" ", "-")}.png`;
  }

  decrementQuantity() {
    if (this.currentQuantity > 0) {
      this.currentQuantity -= 1;
      this.checkBalance();
    } 
  }

  incrementQuantity() {
    this.currentQuantity += 1;
    this.checkBalance();
  }

  private checkBalance() {
    this.haveEnoughBalance = this.balance >= this.currentQuantity * this.saleItemType.cost;
  }

  makePurchase() {
    const itemPurchase = new ItemPurchase();
    itemPurchase.itemType = this.saleItemType;
    itemPurchase.quantity = this.currentQuantity;
    if (itemPurchase.quantity > 0) {
      this.purchase.emit(itemPurchase);
    }
  }
}
