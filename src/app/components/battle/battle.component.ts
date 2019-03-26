import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from "@angular/core";
import { MapRegion } from "src/app/models/mapRegion";
import { Npc } from "src/app/models/npc";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/account";
import { PokemonService } from "src/app/services/pokemon.service";
import { HttpClient } from "@angular/common/http";
import { UrlService } from "src/app/services/url.service";
import { Pokemon } from "src/app/models/pokemon";
import { ListResponse } from "src/app/services/resource.service";

@Component({
  selector: "app-battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.scss"]
})
export class BattleComponent implements OnInit, OnChanges {
  @Input() gym: boolean;
  @Input() currentMap: MapRegion;
  @Input() currentAccount: Account;
  // @Input() currentTrainers: Npc[];
  // @Input() currentGymLeaders: Npc[];
  @Input() currentNpcs: Npc[];
  @Output() newBalance = new EventEmitter<number>();
  currentPokemon = [];
  currentTrainers = [];
  currentGymLeaders = [];

  constructor(
    private accountService: AccountService,
    private pokemonService: PokemonService,
    private http: HttpClient,
    private urlService: UrlService
  ) {}

  ngOnInit() {
    // GET /user/:id/pokemons
    this.http
      .get(
        this.urlService.getEndpoint() +
          "/user/" +
          this.currentAccount.id +
          "/pokemons"
      )
      .subscribe(
        (data: ListResponse<Pokemon>) => {
          this.currentPokemon = data.data;
        },
        err => {
          console.log("BattleComponent GET /user/:id/pokemons error: ", err);
        }
      );
  }

  ngOnChanges(changes) {
    this.processNpcs(this.currentNpcs);
  }

  processNpcs(data: Npc[]) {
    this.currentTrainers = [];
    this.currentGymLeaders = [];
    for (let i = 0 ; i < data.length ; i++) {
      if (data[i].role === "Trainer") {
        this.currentTrainers.push(data[i]);
      }  else {
        this.currentGymLeaders.push(data[i]);
      }
    }
  }

  setBalance(balance: number) {
    this.newBalance.emit(balance);
  }
}
