import {Component, OnInit} from '@angular/core';
import {
  DEFAULT_PROPERTY_DTO,
  PropertyDto,
} from '../../../../dtos/properties/PropertyDto';
import {PropertyService} from '../../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';
import {ExpenseDto} from '../../../../dtos/expenses/ExpenseDto';
import {ExpenseService} from '../../../../services/expense/expense.service';
import {
  ExpenseFrequency,
} from '../../../../dtos/expenses/enum/ExpenseFrequency';
import {
  ExpenseDistributionAssignmentDto,
} from '../../../../dtos/expenses/ExpenseDistributionAssignmentDto';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css'],
})
/**
 * Property view component.
 */
export class PropertyViewComponent implements OnInit {
  property: PropertyDto = DEFAULT_PROPERTY_DTO;
  expenses: ExpenseDto[] = [];
  isPropertyAdmin: boolean = false;
  expenseDistributionAssignments: ExpenseDistributionAssignmentDto[] = [];

  /**
   * Basic constructor.
   */
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private expenseService: ExpenseService) {
  }

  /**
   * Basic init method.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.getPropertyById(params['id'])
          .subscribe((property) => {
            this.property = property;
          });
      this.propertyService.getIsPropertyAdmin(params['id'])
          .subscribe((isAdmin) => {
            this.isPropertyAdmin = isAdmin;
            if (this.isPropertyAdmin) {
              this.expenseService
                  .getExpenseDistributionAssignmentsForProperty(
                      params['id'],
                  )
                  .subscribe((expenseDistributionAssignmentDtos) => {
                    this
                        .expenseDistributionAssignments =
                  expenseDistributionAssignmentDtos;
                  });
            }
          });
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      this.expenseService.getExpensesForPropertyForMonth(
          params['id'],
          currentDate.getMonth(),
          currentDate.getFullYear()).subscribe((expenses) => {
        this.expenses = expenses;
        for (const expense of this.expenses) {
          // @ts-ignore
          expense.frequency = ExpenseFrequency[expense.frequency];
        }
      });
    });
  }

  formatDate(date: Date): string {
    const wrappedDate = new Date(date);
    return wrappedDate.toLocaleDateString();
  }

  toIsAcceptedCharacter(tenantEmail: string) {
    return (this.property.acceptedTenantEmails.includes(tenantEmail)) ? '✓' : 'X';
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

  toIsAdministratorCharacter(tenantEmail: string) {
    return (this.property.administratorEmails
        .includes(tenantEmail)) ? '✓' : 'X';
  }
}
