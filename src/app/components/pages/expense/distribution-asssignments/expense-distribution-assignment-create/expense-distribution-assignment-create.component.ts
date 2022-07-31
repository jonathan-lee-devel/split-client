import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-expense-distribution-assignment-create',
  templateUrl: './expense-distribution-assignment-create.component.html',
  styleUrls: ['./expense-distribution-assignment-create.component.css'],
})
export class ExpenseDistributionAssignmentCreateComponent implements OnInit {
  expenseId: string = '';
  amount: number = 0.00;
  propertyId: string = '';

  constructor(private route: ActivatedRoute,
              private expenseService: ExpenseService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propertyId = params['propertyId'];
    });
  }

  doCreateExpenseDistributionAssignment() {

  }
}
