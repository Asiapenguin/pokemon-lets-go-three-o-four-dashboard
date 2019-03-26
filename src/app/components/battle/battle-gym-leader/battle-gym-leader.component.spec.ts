import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleGymLeaderComponent } from './battle-gym-leader.component';

describe('BattleGymLeaderComponent', () => {
  let component: BattleGymLeaderComponent;
  let fixture: ComponentFixture<BattleGymLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleGymLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleGymLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
