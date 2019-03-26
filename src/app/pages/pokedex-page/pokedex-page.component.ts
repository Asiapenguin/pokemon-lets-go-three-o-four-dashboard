import { Component, OnInit } from "@angular/core";
import { SpeciesService } from "src/app/services/species.service";
import { ListResponse } from "src/app/services/resource.service";
import { Species } from "src/app/models/species";
import { TypeColors } from "src/app/models/typeColors";

@Component({
  selector: "app-pokedex-page",
  templateUrl: "./pokedex-page.component.html",
  styleUrls: ["./pokedex-page.component.scss"]
})
export class PokedexPageComponent implements OnInit {
  allSpecies = [];
  totalNumSpecies: number;
  speciesCaught: number;

  constructor(private speciesService: SpeciesService) {}

  ngOnInit() {
    this.speciesService
      .findAll()
      .get()
      .then((data: ListResponse<Species>) => {
        this.allSpecies = data.data;
        this.totalNumSpecies = this.allSpecies.length;
        console.log("PokedexComponent allSpecies: ", this.allSpecies);
      },
      err => {
        console.log("PokedexComponent GET /species error: ", err);
      });
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
