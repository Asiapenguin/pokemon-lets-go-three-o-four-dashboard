import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';

export class ItemPurchase {
  public item: Item;
  public quantity: number;
}

@Component({
  selector: '[app-sale-item]',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent implements OnInit {

  @Input() saleItem: Item;
  @Input() balance: number;
  @Output() purchase = new EventEmitter<ItemPurchase>();

  currentQuantity: number;
  haveEnoughBalance = true;
  saleItemSrc = "";

  constructor() { }

  ngOnInit() {
    this.currentQuantity = 0;
    this.setSaleItemSrc(this.saleItem.name);
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
    this.haveEnoughBalance = this.balance >= this.currentQuantity * this.saleItem.cost;
  }

  makePurchase() {
    const itemPurchase = new ItemPurchase();
    itemPurchase.item = this.saleItem;
    itemPurchase.quantity = this.currentQuantity;
    if (itemPurchase.quantity > 0) {
      this.purchase.emit(itemPurchase);
    }
  }
}
