import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Account } from "src/app/models/account";
import { AuthenticationService } from "src/app/services/authentication.service";
import { MapRegionService } from "src/app/services/map-region.service";
import { MapRegion } from "src/app/models/mapRegion";
import { ListResponse } from "src/app/services/resource.service";
import { AccountService } from "src/app/services/account.service";

export class MapRegionInfo {
  public newRegion: MapRegion;
}

@Component({
  selector: "app-map-move",
  templateUrl: "./map-move.component.html",
  styleUrls: ["./map-move.component.scss"]
})
export class MapMoveComponent implements OnInit {
  @Output() newRegion = new EventEmitter<MapRegion>();

  currentMap: MapRegion;
  currentMapSrc: string;
  mapRegionInfo: MapRegionInfo = new MapRegionInfo();
  mapRegions = [];
  currentAccount: Account;

  constructor(
    private authenticationService: AuthenticationService,
    private mapRegionService: MapRegionService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // Get location of user
    this.currentAccount = this.authenticationService.getAccount();
    const currentMapName = this.currentAccount.location;
    this.currentMapSrc = this.getMapSrc(currentMapName);
    // GET: /mapRegion/:name
    this.mapRegionService.get(currentMapName).then(
      (data: MapRegion) => {
        this.currentMap = data;
        this.newRegion.emit(data);
      },
      err => {
        console.log("MapMoveComponent GET /mapRegion/:name error", err);
      }
    );

    this.mapRegionService
      .findAll()
      .get()
      .then(
        (data: ListResponse<MapRegion>) => {
          this.mapRegions = data.data;
        },
        err => {
          console.log(err);
        }
      );
  }

  private getMapSrc(name: string) {
    return `../../../assets/map-images/${name.replace(" ", "-")}.png`;
  }

  moveRegion() {
    if (this.currentMap !== this.mapRegionInfo.newRegion && this.mapRegionInfo.newRegion) {
      // GET: /mapRegion/:name
      this.mapRegionService.get(this.mapRegionInfo.newRegion.name).then(
        (mapRegion: MapRegion) => {
          this.currentAccount.location = this.mapRegionInfo.newRegion.name;
          // PATCH: /account
          console.log(this.currentAccount)
          this.accountService.patch(this.currentAccount).then(updatedAccount => {
            // console.log("moveRegion", mapRegion);
            this.currentMap = this.mapRegionInfo.newRegion;
            this.currentMapSrc = this.getMapSrc(this.currentMap.name);
            this.newRegion.emit(mapRegion);
          },
          err => {
            console.log("MapMoveComponent PATCH /account error: ", err);
          });
        },
        err => {
          console.log("MapMoveComponent GET /mapRegion/:name error: ", err);
        }
      );
    }
  }
}
