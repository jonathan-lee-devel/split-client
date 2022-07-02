import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManageTenantsInviteComponent } from './property-manage-tenants-invite.component';

describe('PropertyManageTenantsInviteComponent', () => {
  let component: PropertyManageTenantsInviteComponent;
  let fixture: ComponentFixture<PropertyManageTenantsInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyManageTenantsInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyManageTenantsInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
