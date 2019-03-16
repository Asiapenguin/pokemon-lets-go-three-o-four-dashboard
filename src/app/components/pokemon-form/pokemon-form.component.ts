import { Component, OnInit } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon.service";
import { Pokemon } from "src/app/models/pokemon";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";

export class PokemonInfo {
  public dexNum: number;
  public quantity: number;
  public editPokemonId: number;
  public newCharId: number;
  public deletePokemonId: number;
  public randomQuantity: number;
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
    Promise.all(promiseArr).then(
      data => {
        console.log(
          `POST - Added ${
            this.pokemonInfo.quantity
          } Pokemon with Pokedex number ${this.pokemonInfo.dexNum}: ${data}`
        );
      },
      err => {
        console.log("PokemonForm POST /pokemon error: ", err);
      }
    );
  }

  editOwner() {
    // PATCH: /owner
    this.http
      .patch(this.urlService.getEndpoint() + "/owner", {
        pokemonId: this.pokemonInfo.editPokemonId,
        newCharId: this.pokemonInfo.newCharId
      })
      .subscribe(
        data => {
          console.log(
            `PATCH - Pokemon ID ${
              this.pokemonInfo.editPokemonId
            }'s owner is changed to Owner ID ${
              this.pokemonInfo.newCharId
            }: ${data}`
          );
        },
        err => {
          console.log("PokemonForm PATCH /owner error: ", err);
        }
      );
  }

  deletePokemon() {
    const pokemonToBeDeleted = new Pokemon();
    pokemonToBeDeleted.id = this.pokemonInfo.deletePokemonId;
    // DELETE: /pokemon
    this.pokemonService.remove(pokemonToBeDeleted).then(data => {
      console.log(
        `DELETE - Pokemon ID ${
          this.pokemonInfo.deletePokemonId
        } has been deleted: ${data}`
      );
    },
    err => {
      console.log("PokemonForm DELETE /pokemon error: ", err);
    });
  }

  addRandomNumPokemon() {
    // DISCUSSION: Can make an endpoint for this
    const randomDexNums = [];
    const promiseArr = [];
    for (let i = 0 ; i < this.pokemonInfo.randomQuantity ; i++) {
      const randomDexNum = this.getRandomNonLegendaryDexNum();
      randomDexNums.push(randomDexNum);
      const newPokemon = new Pokemon();
      newPokemon.dexNum = randomDexNum;
      // POST: /pokemon
      promiseArr.push(this.pokemonService.create(newPokemon));
    }
    Promise.all(promiseArr).then((data) => {
      console.log(`POST - Added Pokemon with ID(s) ${randomDexNums}`);
    },
    err => {
      console.log("PokemonForm random POST /pokemon error: ", err);
    });
  }

  private getRandomNonLegendaryDexNum() {
    const legendaryDexNums = this.pokemonService.getLegendaryDexNums();
    let result;
    do {
      result = (Math.random() * 151) + 1;
    } while (legendaryDexNums.indexOf(result) > -1);
    return result;
  }
}
