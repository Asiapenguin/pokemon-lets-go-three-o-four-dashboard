import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFormComponent } from './map-form.component';

describe('MapFormComponent', () => {
  let component: MapFormComponent;
  let fixture: ComponentFixture<MapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
