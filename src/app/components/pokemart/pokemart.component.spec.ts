import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemartComponent } from './pokemart.component';

describe('PokemartComponent', () => {
  let component: PokemartComponent;
  let fixture: ComponentFixture<PokemartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
