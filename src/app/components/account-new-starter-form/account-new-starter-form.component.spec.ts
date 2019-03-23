import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewStarterFormComponent } from './account-new-starter-form.component';

describe('AccountNewStarterFormComponent', () => {
  let component: AccountNewStarterFormComponent;
  let fixture: ComponentFixture<AccountNewStarterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNewStarterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewStarterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
