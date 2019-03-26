import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerItemComponent } from './trainer-item.component';

describe('TrainerItemComponent', () => {
  let component: TrainerItemComponent;
  let fixture: ComponentFixture<TrainerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
