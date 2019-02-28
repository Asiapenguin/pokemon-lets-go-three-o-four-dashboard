import { Injectable, Injector } from "@angular/core";
import { Pokemon } from "../models/pokemon";
import { ResourceService } from "./resource.service";

@Injectable({
  providedIn: "root"
})
export class PokemonService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Pokemon);
  }
}
