import { Component, OnInit, Input } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon.service";
import { MapRegion } from "src/app/models/mapRegion";
import { ListResponse } from "src/app/services/resource.service";
import { Species } from "src/app/models/species";
import { SpeciesService } from "src/app/services/species.service";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Account } from "src/app/models/account";
import { ItemType } from "src/app/models/itemType";
import { Pokemon } from "src/app/models/pokemon";

export class ItemTypeCount {
  public itemtype: string;
  public quantity: number;
}

@Component({
  selector: "app-catch-pokemon",
  templateUrl: "./catch-pokemon.component.html",
  styleUrls: ["./catch-pokemon.component.scss"]
})
export class CatchPokemonComponent implements OnInit {
  @Input() currentMap: MapRegion;
  currentAccount: Account;
  species = [];
  currentItemTypeCounts = {};
  ballToUse = "";

  constructor(
    private speciesService: SpeciesService,
    private http: HttpClient,
    private urlService: UrlService,
    private authenticationService: AuthenticationService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
    this.speciesService
      .findWhere("foundAt", this.currentMap.name)
      .get()
      .then((data: ListResponse<Species>) => {
        console.log("CatchPokemonComponent: ", data);
        this.species = data.data;
      });

    this.getItemTypeCounts().then(data => {
      this.currentItemTypeCounts = data;
    });
  }

  getSpeciesIconSrc(name: string) {
    return `../../../assets/pokemon-sprites/${name}.gif`;
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

          let counts = {
            "Poke Ball": pokeBallCount,
            "Great Ball": greatBallCount,
            "Ultra Ball": ultraBallCount,
            "Master Ball": masterBallCount
          };
          console.log("CatchPokemon itemTypeCounts: ", counts);

          res(counts);
        });
    });
  }

  setBall(name: string) {
    this.ballToUse = name;
  }

  catchRandom() {
    const rand = Math.floor(Math.random() * this.species.length);
    const randomPokemonDexNum = this.species[rand].id;

    this.setBallToUsed().then(data => {
      this.currentItemTypeCounts[this.ballToUse] -= 1;
    });

    if (Math.random() > 0.5) {
      const pokemon = new Pokemon();
      pokemon.ownerId = this.currentAccount.id;
      pokemon.dexNum = randomPokemonDexNum;
      // POST /pokemon
      this.pokemonService.create(pokemon).then(
        data => {
          console.log("Pokemon caught: ", data);
        },
        err => {
          console.log("CatchPokemonComponent ");
        }
      );
    }
  }

  setBallToUsed() {
    return new Promise((res, rej) => {
      // PUT /item
      this.http
        .put(this.urlService.getEndpoint() + "/item", {
          userId: this.currentAccount.id,
          itemType: this.ballToUse
        })
        .subscribe(
          data => {
            console.log("Used ball to catch pokemon: ", data);
            res(data);
          },
          err => {
            console.log("CatchPokemonComponent PUT /item error: ", err);
          }
        );
    });
  }
}
