import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon.service";
import { MapRegion } from "src/app/models/mapRegion";
import { ListResponse } from "src/app/services/resource.service";
import { Species } from "src/app/models/species";
import { SpeciesService } from "src/app/services/species.service";
import { Account } from "src/app/models/account";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-catch-pokemon",
  templateUrl: "./catch-pokemon.component.html",
  styleUrls: ["./catch-pokemon.component.scss"]
})
export class CatchPokemonComponent implements OnInit, OnChanges {
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
  ) { }

  ngOnInit() {
    this.getCurrentSpecies().then((data: Species[]) => {
      this.species = data;
    });
    this.accountService.getAccountItemTypeCounts(this.currentAccount.id).then(data => {
      this.currentItemTypeCounts = data;
    });
  }

  ngOnChanges() {
    this.getCurrentSpecies().then((data: Species[]) => {
      this.species = data;
    });
  }

  getCurrentSpecies() {
    return new Promise((res, rej) => {
      this.speciesService
        .findWhere("foundAt", this.currentMap.name)
        .get()
        .then((data: ListResponse<Species>) => {
          console.log("CatchPokemonComponent Current MapRegion's Species: ", data);
          res(data.data);
        },
        err => {
          console.log("CatchPokemonComponent GET /species/search?foundAt= error: ", err);
          rej(err);
        });
    })
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
      const pokemon = new Pokemon();
      pokemon.ownerId = this.currentAccount.id;
      pokemon.dexNum = randomPokemonDexNum;
      // POST /pokemon
      this.pokemonService.create(pokemon).then(
        (data: Pokemon) => {
          this.result = `${data.name} has been caught!`;
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
