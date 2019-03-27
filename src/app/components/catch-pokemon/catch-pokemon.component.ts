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
import { ItemTypeCount } from "src/app/models/itemTypeCount";
import { AccountService } from "src/app/services/account.service";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-catch-pokemon",
  templateUrl: "./catch-pokemon.component.html",
  styleUrls: ["./catch-pokemon.component.scss"]
})
export class CatchPokemonComponent implements OnInit {
  @Input() currentMap: MapRegion;
  @Input() currentAccount: Account;
  species = [];
  currentItemTypeCounts = {};
  ballToUse = "";
  result = "";

  constructor(
    private speciesService: SpeciesService,
    private accountService: AccountService,
    private pokemonService: PokemonService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.speciesService
      .findWhere("foundAt", this.currentMap.name)
      .get()
      .then((data: ListResponse<Species>) => {
        console.log("CatchPokemonComponent: ", data);
        this.species = data.data;
      });

    this.accountService.getAccountItemTypeCounts(this.currentAccount.id).then(data => {
      this.currentItemTypeCounts = data;
    });
  }

  getSpeciesIconSrc(name: string) {
    return `../../../assets/pokemon-sprites/${name}.gif`;
  }

  setBall(name: string) {
    this.ballToUse = name;
  }

  catchRandom() {
    const rand = Math.floor(Math.random() * this.species.length);
    const randomPokemonDexNum = this.species[rand].id;

    this.itemService.setItemToUsed(this.currentAccount.id, this.ballToUse).then(data => {
      this.currentItemTypeCounts[this.ballToUse] -= 1;
    });

    if (Math.random() > 0.5) {
      this.result = `Pokemon with Pokedex number ${randomPokemonDexNum} has been caught!`;
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
    } else {
      this.result = "Pokemon escaped!";
    }
  }
}
