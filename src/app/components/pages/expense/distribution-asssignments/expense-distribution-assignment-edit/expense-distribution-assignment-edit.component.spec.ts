import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDistributionAssignmentEditComponent } from './expense-distribution-assignment-edit.component';

describe('ExpenseDistributionAssignmentEditComponent', () => {
  let component: ExpenseDistributionAssignmentEditComponent;
  let fixture: ComponentFixture<ExpenseDistributionAssignmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseDistributionAssignmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDistributionAssignmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
