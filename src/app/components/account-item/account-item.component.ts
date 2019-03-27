import { Component, OnInit, Input } from '@angular/core';
import { Account } from "src/app/models/account";
import { ItemTypeCount } from "src/app/models/itemTypeCount";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() currentAccount: Account;
  currentAccountItemTypeCounts = {};

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountItemTypeCounts(this.currentAccount.id).then(data => {
      this.currentAccountItemTypeCounts = data;
    });
  }

  getItemIconSrc(item: ItemTypeCount) {
    const nameWithHyphen = item.itemtype.replace(" ", "-");
    return `../../../assets/item-sprites/${nameWithHyphen}.png`;
  }
}
