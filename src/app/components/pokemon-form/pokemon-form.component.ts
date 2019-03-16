import { Component, OnInit } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";

export class PokemonInfo {
  public dexNum: number;
  public quantity: number;
  public pokemonId: number;
  public newCharId: number;
}

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.scss"]
})
export class PokemonFormComponent implements OnInit {
  pokemonInfo: PokemonInfo = new PokemonInfo();
  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient,
    private urlService: UrlService
  ) {}

  ngOnInit() {}

  addPokemon() {
    const newPokemon = new Pokemon();
    newPokemon.dexNum = this.pokemonInfo.dexNum;
    // DISCUSSION: Can make an endpoint for this
    const promiseArr = [];
    for (let i = 0; i < this.pokemonInfo.quantity; i++) {
      // POST: /pokemon
      promiseArr.push(this.pokemonService.create(newPokemon));
    }
    Promise.all(promiseArr).then(data => {
      console.log(
        `Added ${this.pokemonInfo.quantity} Pokemon with Pokedex number ${
          this.pokemonInfo.dexNum
        }: ${data}`
      );
    },
    err => {
      console.log("PokemonForm POST /pokemon error: ", err);
    });
  }

  editOwner() {
    // PATCH: /owner
    this.http
      .patch(this.urlService.getEndpoint() + "/owner", {
        pokemonId: this.pokemonInfo.pokemonId,
        newCharId: this.pokemonInfo.newCharId
      })
      .subscribe(data => {
        console.log(
          `Patch - Pokemon ID ${
            this.pokemonInfo.pokemonId
          }'s owner is changed to Owner ID ${this.pokemonInfo.newCharId}: ${data}`
        );
      },
      err => {
        console.log("PokemonForm PATCH /owner error: ", err);
      });
  }

  deletePokemon() {}

  addRandomNumPokemon() {}
}
