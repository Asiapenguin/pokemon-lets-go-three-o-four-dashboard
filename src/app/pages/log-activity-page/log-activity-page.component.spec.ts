import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActivityPageComponent } from './log-activity-page.component';

describe('LogActivityPageComponent', () => {
  let component: LogActivityPageComponent;
  let fixture: ComponentFixture<LogActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
