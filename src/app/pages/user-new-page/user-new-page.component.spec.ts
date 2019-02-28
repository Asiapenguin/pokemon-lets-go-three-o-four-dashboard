import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNewPageComponent } from "./user-new-page.component";


describe('AccountNewPageComponent', () => {
  let component: UserNewPageComponent;
  let fixture: ComponentFixture<UserNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
