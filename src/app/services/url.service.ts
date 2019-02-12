import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  url = "";
  constructor() {}

  setEndpoint(url: string) {
    this.url = url;
  }

  getEndpoint() {
    return this.url;
  }
}
