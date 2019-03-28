import { Component, OnInit, OnChanges } from "@angular/core";
import { SpeciesService } from "src/app/services/species.service";
import { ListResponse } from "src/app/services/resource.service";
import { Species } from "src/app/models/species";
import { TypeColors, types } from "src/app/models/typeColors";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/account";
import { AuthenticationService } from "src/app/services/authentication.service";

export class SpeciesCaughtInfo {
  public speciescaught: number;
}

@Component({
  selector: "app-pokedex-page",
  templateUrl: "./pokedex-page.component.html",
  styleUrls: ["./pokedex-page.component.scss"]
})
export class PokedexPageComponent implements OnInit, OnChanges {
  currentSpecies = [];
  allSpecies = [];
  totalNumSpecies: number;
  speciesCaught: number;
  types = types;
  filterType: string;

  currentAccount: Account;

  constructor(
    private authenticationService: AuthenticationService,
    private speciesService: SpeciesService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
    this.speciesService
      .findAll()
      .get()
      .then(
        (data: ListResponse<Species>) => {
          this.currentSpecies = data.data;
          this.allSpecies = data.data;
          this.totalNumSpecies = this.currentSpecies.length;
          console.log("PokedexComponent allSpecies: ", this.currentSpecies);
        },
        err => {
          console.log("PokedexComponent GET /species error: ", err);
        }
      );

    this.accountService.getSpeciesCount(this.currentAccount.id).then((data: SpeciesCaughtInfo) => {
      this.speciesCaught = data.speciescaught;
    });
  }

  ngOnChanges() {
    console.log(this.filterType);
  }

  filterSpeciesBy(type: string) {
    if (type !== "All") {
      this.speciesService.filterSpeciesBy(type).then((data: any[]) => {
        this.currentSpecies = this.allSpecies.filter(s => data.indexOf(s.id) > -1);
        console.log("After filter", this.currentSpecies);
      });
    } else {
      this.currentSpecies = this.allSpecies;
    }
  }

  getSpeciesIconSrc(name: string) {
    return `../../../assets/pokemon-sprites/${name}.gif`;
  }

  getColor(type: string) {
    switch (type) {
      case "Normal":
        return TypeColors.Normal;
      case "Fighting":
        return TypeColors.Fighting;
      case "Flying":
        return TypeColors.Flying;
      case "Poison":
        return TypeColors.Poison;
      case "Ground":
        return TypeColors.Ground;
      case "Rock":
        return TypeColors.Rock;
      case "Bug":
        return TypeColors.Bug;
      case "Ghost":
        return TypeColors.Ghost;
      case "Steel":
        return TypeColors.Steel;
      case "Fire":
        return TypeColors.Fire;
      case "Water":
        return TypeColors.Water;
      case "Grass":
        return TypeColors.Grass;
      case "Electric":
        return TypeColors.Electric;
      case "Psychic":
        return TypeColors.Psychic;
      case "Ice":
        return TypeColors.Ice;
      case "Dragon":
        return TypeColors.Dragon;
      case "Dark":
        return TypeColors.Dark;
      case "Fairy":
        return TypeColors.Fairy;
    }
  }
}
