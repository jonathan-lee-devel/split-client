import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../dtos/properties/PropertyDto';
import {ExpenseDto} from '../../../../dtos/expenses/ExpenseDto';
import {ActivatedRoute} from '@angular/router';
import {PropertyService} from '../../../../services/property/property.service';
import {ExpenseService} from '../../../../services/expense/expense.service';
import {
  ExpenseFrequency,
} from '../../../../dtos/expenses/enum/ExpenseFrequency';
import {ExpenseBreakdownDto} from '../../../../dtos/expenses/ExpenseBreakdownDto';

@Component({
  selector: 'app-property-expense-report-view',
  templateUrl: './property-expense-report-view.component.html',
  styleUrls: ['./property-expense-report-view.component.css'],
})
export class PropertyExpenseReportViewComponent implements OnInit {
  property: PropertyDto = {
    acceptedTenantEmails: [],
    id: '',
    tenantEmails: [],
    title: '',
  };
  expenses: ExpenseDto[] = [];
  totalExpenses: string = '$100.00';
  tenantExpenseBreakdown: ExpenseBreakdownDto = {
    total: '- €1.00',
    expenses: [],
  };

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyService.getPropertyById(params['id'])
          .subscribe((property) => {
            this.property = property;
          });
      this.expenseService.getExpensesForProperty(params['id'])
          .subscribe((expenses) => {
            this.expenses = expenses;
            for (const expense of this.expenses) {
            // @ts-ignore
              expense.frequency = ExpenseFrequency[expense.frequency];
            }
          });
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      this.propertyService
          .getTotalExpensesPerMonthForProperty(
              params['id'],
              currentDate.getMonth(),
              currentDate.getFullYear(),
          )
          .subscribe((total) => {
            this.totalExpenses = total;
          });
      this.propertyService
          .getTotalExpensesPerTenantPerMonthForProperty(
              params['id'],
              currentDate.getMonth(),
              currentDate.getFullYear(),
          )
          .subscribe((tenantExpenseBreakdown) => {
            this.tenantExpenseBreakdown = tenantExpenseBreakdown;
          });
    });
  }

  formatDate(date: Date): string {
    const dateStringList = String(date).split('-');
    // eslint-disable-next-line max-len
    return `${dateStringList[0]}-${dateStringList[1]}-${dateStringList[2].split('T')[0]}`;
  }
}
