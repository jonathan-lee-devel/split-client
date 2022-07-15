import {Component, OnInit} from '@angular/core';
import {
  ExpenseFrequency,
} from '../../../../dtos/expenses/enum/ExpenseFrequency';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpenseService} from '../../../../services/expense/expense.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {ExpenseSelection} from '../expense-create/expense-create.component';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css'],
})
export class ExpenseEditComponent implements OnInit {
  expenseId: string = '';
  title: string = '';
  amount: number = 0;
  frequency: ExpenseFrequency = ExpenseFrequency.ONCE;
  expenseSelections: ExpenseSelection[] = [
    {value: 0, viewValue: ExpenseFrequency[ExpenseFrequency.ONCE]},
    {value: 1, viewValue: ExpenseFrequency[ExpenseFrequency.DAILY]},
    {value: 2, viewValue: ExpenseFrequency[ExpenseFrequency.WEEKLY]},
    {value: 3, viewValue: ExpenseFrequency[ExpenseFrequency.BIWEEKLY]},
    {value: 4, viewValue: ExpenseFrequency[ExpenseFrequency.MONTHLY]},
    {value: 5, viewValue: ExpenseFrequency[ExpenseFrequency.YEARLY]},
  ];
  propertyId: string = '';
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private modalService: ModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.expenseId = params['expenseId'];
      this.expenseService.getExpense(this.expenseId).subscribe((expense) => {
        this.title = expense.title;
        this.amount = Number(
            expense.amount
                .slice(1, expense.amount.length)
                .replace(',', ''),
        );
        this.frequency = expense.frequency;
        const startDate = new Date(expense.startDate);
        startDate.setDate(startDate.getDate() - 1);// Account for bug
        const endDate = new Date(expense.endDate);
        endDate.setDate(endDate.getDate() - 1);// Account for bug
        this.range.setValue({
          'start': startDate, 'end': endDate,
        });
        this.propertyId = expense.propertyId;
      });
    });
  }

  doUpdateExpense() {
    const startDate = new Date(this.range.get('start')?.value.toISOString());
    startDate.setDate(startDate.getDate() + 1);// Account for bug
    const endDate = new Date(this.range.get('end')?.value.toISOString());
    endDate.setDate(endDate.getDate() + 1);// Account for bug
    this.expenseService.updateExpense(
        this.expenseId,
        this.propertyId,
        this.title,
        this.amount,
        this.frequency,
        startDate,
        endDate,
    ).subscribe((_) => {
      this.modalService.showModal(
          'Expense Creation',
          `Expense \'${this.title}\' successfully updated`,
      );
      this.router.navigate([`/property/manage/${this.propertyId}/expenses`]);
    });
  }
}
