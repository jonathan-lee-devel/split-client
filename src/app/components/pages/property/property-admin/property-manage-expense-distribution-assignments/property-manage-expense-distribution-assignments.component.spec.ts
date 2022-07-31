import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManageExpenseDistributionAssignmentsComponent } from './property-manage-expense-distribution-assignments.component';

describe('PropertyManageExpenseDistributionAssignmentsComponent', () => {
  let component: PropertyManageExpenseDistributionAssignmentsComponent;
  let fixture: ComponentFixture<PropertyManageExpenseDistributionAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyManageExpenseDistributionAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyManageExpenseDistributionAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
