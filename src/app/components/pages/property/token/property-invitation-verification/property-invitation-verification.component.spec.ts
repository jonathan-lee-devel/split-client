import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInvitationVerificationComponent } from './property-invitation-verification.component';

describe('PropertyInvitationVerificationComponent', () => {
  let component: PropertyInvitationVerificationComponent;
  let fixture: ComponentFixture<PropertyInvitationVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyInvitationVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyInvitationVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
