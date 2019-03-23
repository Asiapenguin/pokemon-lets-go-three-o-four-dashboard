import { Component, OnInit } from "@angular/core";
import { MapRegion } from 'src/app/models/mapRegion';
import { MapRegionService } from 'src/app/services/map-region.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

  currentMapName: string;
  currentMapSrc: string;
  currentAccount: Account;
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
    })
  }

  private getMapSrc(name: string) {
    return `../../../assets/map-images/${name.replace(" ", "-")}.png`;
  }
}
