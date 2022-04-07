import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManageTenantsComponent } from './property-manage-tenants.component';

describe('PropertyManageTenantsComponent', () => {
  let component: PropertyManageTenantsComponent;
  let fixture: ComponentFixture<PropertyManageTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyManageTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyManageTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
