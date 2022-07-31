import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {ModalService} from '../../../../../services/modal/modal.service';
import {PropertyDto} from '../../../../../dtos/properties/PropertyDto';
import {ExpenseDto} from '../../../../../dtos/expenses/ExpenseDto';
import {PropertyService} from '../../../../../services/property/property.service';
import {ExpenseDistributionAssignmentDto} from '../../../../../dtos/expenses/ExpenseDistributionAssignmentDto';

@Component({
  selector: 'app-expense-distribution-assignment-edit',
  templateUrl: './expense-distribution-assignment-edit.component.html',
  styleUrls: ['./expense-distribution-assignment-edit.component.css'],
})
export class ExpenseDistributionAssignmentEditComponent implements OnInit {
  expenseDistributionAssignmentId: string = '';
  expenseDistributionAssignment: ExpenseDistributionAssignmentDto = {
    expenseId: '',
    amount: '',
    tenantEmail: '',
    id: '',
  };
  propertyId: string = '';
  property: PropertyDto = {
    id: '',
    title: '',
    tenantEmails: [],
    acceptedTenantEmails: [],
  };
  expenses: ExpenseDto[] = [];
  expenseId: string = '';
  expenseTitle: string = '';
  tenantEmail: string = '';
  amount: number = 0.00;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertyService: PropertyService,
              private expenseService: ExpenseService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // eslint-disable-next-line max-len
      this.expenseDistributionAssignmentId = params['expenseDistributionAssignmentId'];
      this.propertyId = params['propertyId'];

      this.expenseService
      // eslint-disable-next-line max-len
          .getExpenseDistributionAssignment(
              this.propertyId,
              this.expenseDistributionAssignmentId)
          .subscribe(
              (expenseDistributionAssignment) => {
                this.expenseService.getExpensesForProperty(this.propertyId)
                    .subscribe((expenses) => {
                      this.expenses = expenses;
                      // eslint-disable-next-line max-len
                      this.expenseDistributionAssignment = expenseDistributionAssignment;
                      this.expenseId = this.expenseDistributionAssignment.id;
                      // eslint-disable-next-line max-len
                      const expense = this.expenses.find((expenseDto) => {
                        // eslint-disable-next-line max-len
                        return expenseDto.id === this.expenseDistributionAssignment.expenseId;
                      });
                      this.expenseTitle = (expense) ? expense.title : 'No';
                      // eslint-disable-next-line max-len
                      this.tenantEmail = this.expenseDistributionAssignment.tenantEmail;
                      // eslint-disable-next-line max-len
                      this.amount = Number(this.expenseDistributionAssignment.amount) / 100.00;
                    });
              });

      this.propertyService.getPropertyById(this.propertyId)
          .subscribe((property) => {
            this.property = property;
          });
    });
  }

  doUpdateExpenseDistributionAssignment() {
    this.expenseService.updateExpenseDistributionAssignment(
        this.expenseDistributionAssignmentId,
        this.expenseId,
        this.tenantEmail,
        this.amount,
    ).subscribe((_) => {
      this.modalService.showModal(
          'Expense Distribution Assignment Update',
          `Expense Distribution Assignment successfully updated`,
      );
      // eslint-disable-next-line max-len
      this.router.navigate([`/property/manage/${this.propertyId}/expense-distribution-assignments`]);
    });
  }
}
