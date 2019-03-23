import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCenterComponent } from './pokemon-center.component';

describe('PokemonCenterComponent', () => {
  let component: PokemonCenterComponent;
  let fixture: ComponentFixture<PokemonCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
