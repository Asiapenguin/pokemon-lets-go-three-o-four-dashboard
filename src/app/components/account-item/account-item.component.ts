import { Component, OnInit, Input } from '@angular/core';
import { Account } from "src/app/models/account";
import { ItemTypeCount } from "src/app/models/itemTypeCount";
import { ListResponse } from "src/app/services/resource.service";
import { UrlService } from "src/app/services/url.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {

  @Input() currentAccount: Account;
  currentAccountItemTypeCounts = {};

  constructor(private http: HttpClient, private urlService: UrlService) { }

  ngOnInit() {
    this.getItemTypeCounts().then(data => {
      this.currentAccountItemTypeCounts = data;
    });
  }

  getItemIconSrc(item: ItemTypeCount) {
    const nameWithHyphen = item.itemtype.replace(" ", "-");
    return `../../../assets/item-sprites/${nameWithHyphen}.png`;
  }

  getItemTypeCounts() {
    return new Promise((res, rej) => {
      // GET /user/:id/itemCount
      this.http
        .get(
          this.urlService.getEndpoint() +
            "/user/" +
            this.currentAccount.id +
            "/itemCount"
        )
        .subscribe((data: ListResponse<ItemTypeCount>) => {
          let pokeBallCount;
          let greatBallCount;
          let ultraBallCount;
          let masterBallCount;
          let reviveCount;

          const pokeBall: ItemTypeCount = data.data.find(
            it => it.itemtype === "Poke Ball"
          );
          if (pokeBall) {
            pokeBallCount = pokeBall.quantity;
          } else {
            pokeBallCount = 0;
          }

          const greatBall: ItemTypeCount = data.data.find(
            it => it.itemtype === "Great Ball"
          );
          if (greatBall) {
            greatBallCount = greatBall.quantity;
          } else {
            greatBallCount = 0;
          }

          const ultraBall: ItemTypeCount = data.data.find(
            it => it.itemtype === "Ultra Ball"
          );
          if (ultraBall) {
            ultraBallCount = ultraBall.quantity;
          } else {
            ultraBallCount = 0;
          }

          const masterBall: ItemTypeCount = data.data.find(
            it => it.itemtype === "Master Ball"
          );
          if (masterBall) {
            masterBallCount = masterBall.quantity;
          } else {
            masterBallCount = 0;
          }

          const revive: ItemTypeCount = data.data.find(
            it => it.itemtype === "Revive"
          );
          if (revive) {
            reviveCount = revive.quantity;
          } else {
            reviveCount = 0;
          }

          const counts = {
            "Poke Ball": pokeBallCount,
            "Great Ball": greatBallCount,
            "Ultra Ball": ultraBallCount,
            "Master Ball": masterBallCount,
            "Revive": reviveCount
          };

          res(counts);
        });
    });
  }

}
