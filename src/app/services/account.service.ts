import { Injectable, Injector } from "@angular/core";
import { Account } from "../models/account";
import { ResourceService, ListResponse } from "./resource.service";
import { UrlService } from "./url.service";
import { ItemTypeCount } from "../models/itemTypeCount";
import { Pokemon } from "../models/pokemon";

export class AllAccountPokemonCaughtCount {
  public username: string;
  public total: number;
}

@Injectable({
  providedIn: "root"
})
export class AccountService extends ResourceService {
  constructor(injector: Injector, private urlService: UrlService) {
    super(injector, Account);
  }

  getSpeciesCount(id: number) {
    return new Promise((res, rej) => {
      this.http
        .get(this.urlService.getEndpoint() + "/user/" + id + "/speciesCount")
        .subscribe(
          data => {
            res(data);
          },
          err => {
            rej(err);
          }
        );
    });
  }

  moveToRegion(account: Account, mapRegionName: string) {
    return new Promise((res, rej) => {
      account.locatedat = mapRegionName;
      this.http
        .put(
          this.urlService.getEndpoint() + "/user/" + account.id + "/move",
          account
        )
        .subscribe(
          (data: Account) => {
            res(data);
          },
          err => {
            rej(err);
          }
        );
    });
  }

  getAccountPokemon(id: number) {
    // GET: /user/:id/pokemons
    return new Promise((res, rej) => {
      this.http
        .get(this.urlService.getEndpoint() + "/user/" + id + "/pokemons")
        .subscribe(
          (data: ListResponse<Pokemon>) => {
            res(data.data);
          },
          err => {
            rej(err);
          }
        );
    });
  }

  getAccountItemTypeCounts(id: number) {
    return new Promise((res, rej) => {
      // GET /user/:id/itemCount
      this.http
        .get(this.urlService.getEndpoint() + "/user/" + id + "/itemCount")
        .subscribe(
          (data: ListResponse<ItemTypeCount>) => {
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
              Revive: reviveCount
            };

            res(counts);
          },
          err => {
            rej(err);
          }
        );
    });
  }

  getAllAccountPokemonCaughtCount() {
    return new Promise((res, rej) => {
      this.http.get(this.urlService.getEndpoint() + "/user/count").subscribe((data: ListResponse<AllAccountPokemonCaughtCount>) => {
        res(data.data);
      },
      err => {
        rej(err);
      })
    })
  }
}
