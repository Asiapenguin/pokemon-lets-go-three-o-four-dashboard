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
    this.mapRegionService.findAll().get().then((data: ListResponse<MapRegion>) => {
      this.mapRegions = data.data;
    },
    err => {
      console.log(err);
    });
  }

  updateSpawnNumber() {
    // PUT: /mapRegion/:name
    this.mapRegionService.updateSpawnNumber(this.mapRegionInfo.mapRegionName, this.mapRegionInfo.maxSpawnNum).then((data: MapRegion) => {
      console.log(`PUT /mapRegion/${this.mapRegionInfo.mapRegionName}: ${data}`);
    },
    err => {
      console.log(`PUT /mapRegion/${this.mapRegionInfo.mapRegionName} error: ${err}`)
    });
  }

}
