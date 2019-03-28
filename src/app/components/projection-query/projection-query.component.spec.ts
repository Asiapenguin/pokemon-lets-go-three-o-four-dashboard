import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionQueryComponent } from './projection-query.component';

describe('ProjectionQueryComponent', () => {
  let component: ProjectionQueryComponent;
  let fixture: ComponentFixture<ProjectionQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
