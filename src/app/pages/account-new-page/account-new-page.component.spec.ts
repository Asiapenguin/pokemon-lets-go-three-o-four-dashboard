import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountNewPageComponent } from "./account-new-page.component";


describe('AccountNewPageComponent', () => {
  let component: AccountNewPageComponent;
  let fixture: ComponentFixture<AccountNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
