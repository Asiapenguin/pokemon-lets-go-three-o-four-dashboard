import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNewFormComponent } from './account-new-form.component';

describe('AccountNewFormComponent', () => {
  let component: AccountNewFormComponent;
  let fixture: ComponentFixture<AccountNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
