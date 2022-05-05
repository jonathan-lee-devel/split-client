import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthGoogleFailureComponent } from './login-auth-google-failure.component';

describe('LoginAuthGoogleFailureComponent', () => {
  let component: LoginAuthGoogleFailureComponent;
  let fixture: ComponentFixture<LoginAuthGoogleFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAuthGoogleFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthGoogleFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
