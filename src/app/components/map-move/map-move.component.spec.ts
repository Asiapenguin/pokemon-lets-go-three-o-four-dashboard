import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMoveComponent } from './map-move.component';

describe('MapMoveComponent', () => {
  let component: MapMoveComponent;
  let fixture: ComponentFixture<MapMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
