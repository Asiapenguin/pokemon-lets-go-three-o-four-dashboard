import { Component, OnInit } from "@angular/core";
import { MapRegion } from 'src/app/models/mapRegion';
import { Account } from 'src/app/models/account';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NpcService } from 'src/app/services/npc.service';
import { Npc } from 'src/app/models/npc';
import { ListResponse } from 'src/app/services/resource.service';

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
  currentAccount: Account;
  currentNpcs = [];
  // currentTrainers = [];
  // currentGymLeaders = [];

  constructor(private authenticationService: AuthenticationService, private npcService: NpcService) {}

  ngOnInit() {
    this.currentAccount = this.authenticationService.getAccount();
  }

  setBalance(balance: number) {
    this.currentAccount.balance = balance;
    console.log("Set balance to: ", balance);
  }

  setCurrentRegion(mapRegion: MapRegion) {

    this.currentMap = mapRegion;

    if (mapRegion.buildings.some(building => building.type === "Pokemon Center")) {
      this.pokemonCenter = true;
    } else {
      this.pokemonCenter = false;
    }
    if (mapRegion.buildings.some(building => building.type === "PokeMart")) {
      this.pokemart = true;
    } else {
      this.pokemart = false;
    }
    if (mapRegion.buildings.some(building => building.type === "Gym")) {
      this.gym = true;
    } else {
      this.gym = false;
    }
    if (mapRegion.maxspawnnumber > 0) {
      console.log("HomePage has Catch")
      this.catch = true;
    } else {
      console.log("HomePage does not have Catch")
      this.catch = false;
    }

    this.getNpcs().then((data: Npc[]) => {
      if (data.length > 0) {
        this.battle = true;
        this.currentNpcs = data;
        // this.processNpcs(data);
      } else {
        this.battle = false;
        this.currentNpcs = [];
        // this.currentGymLeaders = [];
        // this.currentTrainers = [];
      }
    });
  }

  getNpcs() {
    return new Promise((res, rej) => {
      // GET /npc?locatedAt=
      this.npcService.findWhere("locatedAt", this.currentMap.name).get().then((data: ListResponse<Npc>) => {
        res(data.data);
      },
      err => {
        console.log("HomePageComponent GET /npc?locatedAt= error: ", err);
      });
    });
  }
}
