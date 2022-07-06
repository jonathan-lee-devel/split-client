import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../../dtos/properties/PropertyDto';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {ExpenseDto} from '../../../../../dtos/expenses/ExpenseDto';
import {
  ExpenseFrequency,
} from '../../../../../dtos/expenses/enum/ExpenseFrequency';

@Component({
  selector: 'app-property-manage-expenses',
  templateUrl: './property-manage-expenses.component.html',
  styleUrls: ['./property-manage-expenses.component.css'],
})
export class PropertyManageExpensesComponent implements OnInit {
  property: PropertyDto = {
    id: '',
    title: '',
    tenantEmails: [],
  };
  expenses: ExpenseDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private expenseService: ExpenseService,
  ) { }

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
    });
  }

  removeExpense(expenseId: string) {
    this.expenseService.deleteExpense(expenseId)
        .subscribe((_) => {
          this.ngOnInit();
        });
  }
}
