import { Component, OnInit } from "@angular/core";
import { MapRegion } from 'src/app/models/mapRegion';
import { MapRegionService } from 'src/app/services/map-region.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/models/account';
import { ListResponse } from "src/app/services/resource.service";

export class MapRegionInfo {
  public newRegion: string;
}

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

  currentMapName: string;
  currentMapSrc: string;
  currentAccount: Account;
  mapRegions = [];
  mapRegionInfo: MapRegionInfo = new MapRegionInfo();
  buildings = [];

  constructor(private authenticationService: AuthenticationService, private mapRegionService: MapRegionService) {}

  ngOnInit() {
    // Get location of user
    this.currentAccount = this.authenticationService.getAccount();
    this.currentMapName = this.currentAccount.location;
    this.currentMapSrc = this.getMapSrc(this.currentMapName);
    this.mapRegionService.get(this.currentMapName).then((data: MapRegion) => {
      this.buildings = data.buildings;
    },
    err => {
      console.log("error", err);
    });

    this.mapRegionService.findAll().get().then((data: ListResponse<MapRegion>) => {
      this.mapRegions = data.data;
    },
    err => {
      console.log(err);
    });
  }

  private getMapSrc(name: string) {
    return `../../../assets/map-images/${name.replace(" ", "-")}.png`;
  }

  moveRegion() {

  }
}
