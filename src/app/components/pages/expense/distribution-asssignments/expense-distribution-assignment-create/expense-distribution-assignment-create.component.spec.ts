import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDistributionAssignmentCreateComponent } from './expense-distribution-assignment-create.component';

describe('ExpenseDistributionAssignmentCreateComponent', () => {
  let component: ExpenseDistributionAssignmentCreateComponent;
  let fixture: ComponentFixture<ExpenseDistributionAssignmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseDistributionAssignmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDistributionAssignmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
