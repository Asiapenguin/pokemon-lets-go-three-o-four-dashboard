import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPokemonComponent } from './account-pokemon.component';

describe('AccountPokemonComponent', () => {
  let component: AccountPokemonComponent;
  let fixture: ComponentFixture<AccountPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
