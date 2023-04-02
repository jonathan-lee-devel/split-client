import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {
  DEFAULT_PROPERTY_DTO,
  PropertyDto,
} from '../../../../../dtos/properties/PropertyDto';
import {
  ExpenseDistributionAssignmentDto,
} from '../../../../../dtos/expenses/ExpenseDistributionAssignmentDto';
import {ExpenseDto} from '../../../../../dtos/expenses/ExpenseDto';

@Component({
  selector: 'app-property-manage-expense-distribution-assignments',
  templateUrl: './property-manage-expense-distribution-assignments.component.html',
  styleUrls: ['./property-manage-expense-distribution-assignments.component.css'],
})
export class PropertyManageExpenseDistributionAssignmentsComponent implements OnInit {
  property: PropertyDto = DEFAULT_PROPERTY_DTO;
  expenses: ExpenseDto[] = [];
  expenseDistributionAssignments:
    ExpenseDistributionAssignmentDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private expenseService: ExpenseService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.getPropertyById(params['id'])
          .subscribe((property) => {
            this.property = property;
          });
      this.expenseService
          .getExpensesForProperty(params['id'])
          .subscribe((expenses) => {
            this.expenses = expenses;
            this.expenseService
                .getExpenseDistributionAssignmentsForProperty(params['id'])
                .subscribe((expenseDistributionAssignments) => {
                  // eslint-disable-next-line max-len
                  this.expenseDistributionAssignments = expenseDistributionAssignments;
                });
          });
    });
  }

  removeExpenseDistributionAssignment(expenseDistributionAssignmentId: string) {
    this.expenseService
        .deleteExpenseDistributionAssignment(expenseDistributionAssignmentId)
        .subscribe((_) => {
          this.ngOnInit();
        });
  }

  expenseIdToTitle(expenseId: string) {
    const expense = this.expenses
        .find((expenseDto) => expenseDto.id === expenseId);
    return (expense) ? expense.title : '';
  }

  amountNumberToAmountString(amount: string) {
    const amountAsFloat = parseFloat(String(Number(amount) / 100)).toFixed(2);
    return `€${amountAsFloat}`;
  }
}
