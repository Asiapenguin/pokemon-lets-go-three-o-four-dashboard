import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { MapRegionService } from 'src/app/services/map-region.service';
import { ListResponse } from 'src/app/services/resource.service';
import { MapRegion } from 'src/app/models/mapRegion';

export class MapRegionInfo {
  public mapRegionName: string;
  public maxSpawnNum: number;
}

@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.scss']
})
export class MapFormComponent implements OnInit {

  mapRegionInfo: MapRegionInfo = new MapRegionInfo();
  mapRegions = [];

  constructor(private mapRegionService: MapRegionService, private urlService: UrlService, private http: HttpClient) { }

  ngOnInit() {
    this.mapRegionService.list().then((data: ListResponse<MapRegion>) => {
      this.mapRegions = data.data;
    },
    err => {
      console.log(err);
    });
  }

  updateSpawnNumber() {
    // PATCH: /mapRegion
    this.http
      .patch(this.urlService.getEndpoint() + "/mapRegion", {
        mapRegionName: this.mapRegionInfo.mapRegionName,
        maxSpawnNum: this.mapRegionInfo.maxSpawnNum
      })
      .subscribe(
        data => {
          console.log(
            `PATCH - Map ID ${
            this.mapRegionInfo.mapRegionName
            }'s max spawn number is set to ${this.mapRegionInfo.maxSpawnNum}: ${data}`
          );
        },
        err => {
          console.log("MapForm PATCH /mapRegion error: ", err);
        }
      );
  }

}
