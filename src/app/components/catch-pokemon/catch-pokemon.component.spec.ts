import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchPokemonComponent } from './catch-pokemon.component';

describe('CatchPokemonComponent', () => {
  let component: CatchPokemonComponent;
  let fixture: ComponentFixture<CatchPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
