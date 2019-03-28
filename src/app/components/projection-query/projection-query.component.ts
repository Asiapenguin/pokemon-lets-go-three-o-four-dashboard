import { Component, OnInit } from "@angular/core";
import { UrlService } from "src/app/services/url.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-projection-query",
  templateUrl: "./projection-query.component.html",
  styleUrls: ["./projection-query.component.scss"]
})
export class ProjectionQueryComponent implements OnInit {
  projectionType: string;
  conditionType: string;
  conditionValue: string;

  result: string;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  ngOnInit() {}

  filterSpeciesBy(
    projectionType: string,
    conditionType: string,
    conditionValue: string
  ) {
    this.http
      .get(
        `${this.urlService.getEndpoint()}/species/${projectionType}/search?${conditionType}=${conditionValue}`
      )
      .subscribe((data: any[]) => {
        this.result = JSON.stringify(data);
      });
  }
}
