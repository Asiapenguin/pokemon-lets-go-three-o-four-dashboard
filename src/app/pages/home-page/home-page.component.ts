import { Component, OnInit } from "@angular/core";
import { MapRegion } from 'src/app/models/mapRegion';
import { MapRegionService } from 'src/app/services/map-region.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/models/account';
import { ListResponse } from "src/app/services/resource.service";



@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService, private mapRegionService: MapRegionService) {}

  ngOnInit() {}

  setCurrentRegion(event) {
    console.log("setCurrentRegion", event);
  }
}
