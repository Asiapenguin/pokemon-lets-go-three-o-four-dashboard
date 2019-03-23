import { Component, OnInit } from "@angular/core";
import { MapRegion } from 'src/app/models/mapRegion';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

  pokemonCenter = false;
  pokemart = false;
  battle = false; // Whether there are npc trainers in that mapRegion
  gym = false;
  catch = false;

  currentMap: MapRegion;

  constructor() {}

  ngOnInit() {}

  setCurrentRegion(mapRegion: MapRegion) {

    this.currentMap = mapRegion;

    if (mapRegion.buildings.some(building => building.type === "Pokemon Center")) {
      this.pokemonCenter = true;
    } else {
      this.pokemonCenter = false;
    }
    if (mapRegion.buildings.some(building => building.type === "Pokemart")) {
      this.pokemart = true;
    } else {
      this.pokemart = false;
    }
    if (mapRegion.buildings.some(building => building.type === "Gym")) {
      this.gym = true;
      this.battle = true;
    } else {
      this.gym = false;
      this.battle = false;
    }
    if (mapRegion.type === "Forest" || mapRegion.type === "Path") {
      this.catch = true;
    } else {
      this.catch = false;
    }

    // TODO: Check if there are npc in currentMap and set battle to true
  }
}
