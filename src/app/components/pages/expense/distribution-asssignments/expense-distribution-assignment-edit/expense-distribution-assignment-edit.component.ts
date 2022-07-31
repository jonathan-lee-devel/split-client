import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../../../../../services/expense/expense.service';
import {ModalService} from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-expense-distribution-assignment-edit',
  templateUrl: './expense-distribution-assignment-edit.component.html',
  styleUrls: ['./expense-distribution-assignment-edit.component.css'],
})
export class ExpenseDistributionAssignmentEditComponent implements OnInit {
  expenseId: string = '';
  amount: number = 0.0;
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

  doUpdateExpenseDistributionAssignment() {

  }
}
