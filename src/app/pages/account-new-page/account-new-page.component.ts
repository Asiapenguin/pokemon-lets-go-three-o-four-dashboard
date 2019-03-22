import { Component } from '@angular/core';
import { RouteService } from "src/app/services/route.service";



@Component({
  selector: 'app-account-new-page',
  templateUrl: './account-new-page.component.html',
  styleUrls: ['./account-new-page.component.scss']
})
export class AccountNewPageComponent {

  constructor(private routeService: RouteService) { }

  goBack() {
    this.routeService.goToLogin();
  }
}
