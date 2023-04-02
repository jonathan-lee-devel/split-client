import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {ExpenseDto} from '../../../../../dtos/expenses/ExpenseDto';
import {
  PropertyService,
} from '../../../../../services/property/property.service';
import {
  DEFAULT_PROPERTY_DTO,
  PropertyDto,
} from '../../../../../dtos/properties/PropertyDto';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-expense-distribution-assignment-create',
  templateUrl: './expense-distribution-assignment-create.component.html',
  styleUrls: ['./expense-distribution-assignment-create.component.css'],
})
export class ExpenseDistributionAssignmentCreateComponent implements OnInit {
  amount: number = 0.00;
  propertyId: string = '';
  property: PropertyDto = DEFAULT_PROPERTY_DTO;
  expenses: ExpenseDto[] = [];
  expenseId: string = '';
  tenantEmail: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private expenseService: ExpenseService,
    private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params['propertyId'];

      this.propertyService.getPropertyById(this.propertyId)
          .subscribe((property) => {
            this.property = property;
          });

      this.expenseService.getExpensesForProperty(this.propertyId)
          .subscribe((expenses) => {
            this.expenses = expenses;
          });
    });
  }

  doCreateExpenseDistributionAssignment() {
    this.expenseService.createExpenseDistributionAssignment(
        this.expenseId,
        this.tenantEmail,
        this.amount,
    ).subscribe((_) => {
      this.modalService.showModal(
          'Expense Distribution Assignment Creation',
          `Expense Distribution Assignment successfully created`,
      );
      // eslint-disable-next-line max-len
      this.router.navigate([`/property/manage/${this.propertyId}/expense-distribution-assignments`]);
    });
  }
}
