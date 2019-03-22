import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItems() {
    return [
      {
        id: 1,
        name: "Poke Ball"
      },
      {
        id: 2,
        name: "Great Ball"
      },
      {
        id: 3,
        name: "Ultra Ball"
      },
      {
        id: 4,
        name: "Max Revive"
      }
    ];
  }
}
