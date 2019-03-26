import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymLeaderItemComponent } from './gym-leader-item.component';

describe('GymLeaderItemComponent', () => {
  let component: GymLeaderItemComponent;
  let fixture: ComponentFixture<GymLeaderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymLeaderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymLeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
