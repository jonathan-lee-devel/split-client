import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmailRegistrationVerificationComponent} from './email-registration-verification.component';

describe('EmailRegistrationVerificationComponent', () => {
  let component: EmailRegistrationVerificationComponent;
  let fixture: ComponentFixture<EmailRegistrationVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailRegistrationVerificationComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegistrationVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
