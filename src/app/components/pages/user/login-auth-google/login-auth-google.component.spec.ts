import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthGoogleComponent } from './login-auth-google.component';

describe('LoginAuthGoogleComponent', () => {
  let component: LoginAuthGoogleComponent;
  let fixture: ComponentFixture<LoginAuthGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAuthGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
