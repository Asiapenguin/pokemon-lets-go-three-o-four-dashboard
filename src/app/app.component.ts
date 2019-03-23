import { Component } from "@angular/core";
import { UrlService } from "./services/url.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  endpoint = "http://localhost:3000";

  constructor(private urlService: UrlService) {
    this.urlService.setEndpoint(this.endpoint);
  }
}
