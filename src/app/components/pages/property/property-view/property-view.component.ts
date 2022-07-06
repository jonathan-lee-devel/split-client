import {Component, OnInit} from '@angular/core';
import {PropertyDto} from '../../../../dtos/properties/PropertyDto';
import {PropertyService} from '../../../../services/property/property.service';
import {ActivatedRoute} from '@angular/router';
import {ExpenseDto} from '../../../../dtos/expenses/ExpenseDto';
import {ExpenseService} from '../../../../services/expense/expense.service';
import {
  ExpenseFrequency,
} from '../../../../dtos/expenses/enum/ExpenseFrequency';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css'],
})
/**
 * Property view component.
 */
export class PropertyViewComponent implements OnInit {
  property: PropertyDto = {
    id: '',
    title: '',
    tenantEmails: [],
  };
  expenses: ExpenseDto[] = [];
  isPropertyAdmin: boolean = false;

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

  formatDate(date: Date): string {
    const dateStringList = String(date).split('-');
    // eslint-disable-next-line max-len
    return `${dateStringList[0]}-${dateStringList[1]}-${dateStringList[2].split('T')[0]}`;
  }
}
