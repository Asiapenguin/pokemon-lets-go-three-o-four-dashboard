import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models/account";
import { PokemonService } from "src/app/services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon";
import { AccountService } from "src/app/services/account.service";
import { MapRegion } from "src/app/models/mapRegion";
import { HealLogService } from "src/app/services/heal-log.service";
import { HealLog } from "src/app/models/healLog";

@Component({
  selector: "app-pokemon-center",
  templateUrl: "./pokemon-center.component.html",
  styleUrls: ["./pokemon-center.component.scss"]
})
export class PokemonCenterComponent implements OnInit {
  @Input() currentAccount: Account;
  @Input() currentMap: MapRegion;

  constructor(
    private pokemonService: PokemonService,
    private accountService: AccountService,
    private healLogService: HealLogService
  ) {}

  ngOnInit() {}

  healAllPokemon() {
    this.accountService
      .getAccountPokemon(this.currentAccount.id)
      .then((currentAccountPokemon: Pokemon[]) => {
        const promiseArr = [];
        const fainted = currentAccountPokemon.filter(
          pokemon => pokemon.status === "Fainted"
        );
        for (let i = 0; i < fainted.length; i++) {
          this.createHealLog(fainted[i].id, this.currentAccount.id);
          const currentFainted = fainted[i];
          fainted[i].status = "Healthy";
          // PUT /pokemon/:id
          promiseArr.push(this.pokemonService.update(currentFainted));
        }

        Promise.all(promiseArr).then(data => {
          console.log(
            "PokemonCenterComponent healAllPokemon Promise.all: ",
            data
          );
        });
      });
  }

  createHealLog(pokemonId: number, playableId: number) {
    const pokemonCenterBuildingId = this.currentMap.buildings
      .filter(b => b.type === "Pokemon Center")
      .map(b => b.id);
    const newHealLog = new HealLog();
    newHealLog.buildingid = pokemonCenterBuildingId[0];
    newHealLog.playableid = playableId;
    newHealLog.pokemonid = pokemonId;
    this.healLogService.create(newHealLog).then((data: HealLog) => {
      console.log(
        `Heal log created for Account with ID ${
          data.playableid
        } healing Pokemon with ID ${data.pokemonid} at Building with ID ${
          data.buildingid
        }`
      );
    },
    err => {
      console.log("PokemonCenterComponent POST /heal failed: ", err);
    });
  }
}
