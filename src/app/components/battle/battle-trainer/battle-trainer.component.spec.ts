import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleTrainerComponent } from './battle-trainer.component';

describe('BattleTrainerComponent', () => {
  let component: BattleTrainerComponent;
  let fixture: ComponentFixture<BattleTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
