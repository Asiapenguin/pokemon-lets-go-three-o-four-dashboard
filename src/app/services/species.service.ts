import { Injectable, Injector } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Species } from '../models/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService extends ResourceService {
  
  constructor(injector: Injector) {
    super(injector, Species);
  }
}
