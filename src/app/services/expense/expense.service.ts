import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpenseDto} from '../../dtos/expenses/ExpenseDto';
import {environment} from '../../../environments/environment';
import {ExpenseFrequency} from '../../dtos/expenses/enum/ExpenseFrequency';
import {ExpenseDistributionAssignmentDto} from '../../dtos/expenses/ExpenseDistributionAssignmentDto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private httpClient: HttpClient) {
  }

  getExpensesForProperty(propertyId: string) {
    return this.httpClient.get<ExpenseDto[]>(
        `${environment.FRONT_END_API_URL}/expenses/for/property/${propertyId}`,
    );
  }

  createExpense(
      propertyId: string,
      title: string,
      amount: number,
      frequency: ExpenseFrequency,
      date: Date,
  ) {
    const expense = {
      propertyId,
      title,
      amount: amount * 100,
      frequency,
      date,
    };

    return this.httpClient.post<ExpenseDto>(
        `${environment.FRONT_END_API_URL}/expenses/create`, expense,
    );
  }

  deleteExpense(expenseId: string | null | undefined) {
    return this.httpClient.delete<void>(
        `${environment.FRONT_END_API_URL}/expenses/delete/${expenseId}`,
    );
  }

  updateExpense(
      expenseId: string,
      propertyId: string,
      title: string,
      amount: number,
      frequency: ExpenseFrequency,
      date: Date) {
    const amountAsString = String(amount);
    const body: ExpenseDto = {
      'id': undefined,
      title,
      propertyId,
      'amount': amountAsString,
      frequency,
      date,
      'createdBy': undefined,
    };
    return this.httpClient.patch<void>(
        `${environment.FRONT_END_API_URL}/expenses/update/${expenseId}`, body,
    );
  }

  getExpense(expenseId: string) {
    return this.httpClient.get<ExpenseDto>(
        `${environment.FRONT_END_API_URL}/expenses/${expenseId}`,
    );
  }

  getExpenseDistributionAssignmentsForProperty(propertyId: string) {
    return this.httpClient.get<ExpenseDistributionAssignmentDto[]>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/expenses/distribution-assignments/for/property/${propertyId}`,
    );
  }

  deleteExpenseDistributionAssignment(expenseDistributionAssignmentId: string) {
    return this.httpClient.delete<void>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/expenses/distribution-assignments/delete/${expenseDistributionAssignmentId}`,
    );
  }

  createExpenseDistributionAssignment(
      expenseId: string,
      tenantEmail: string,
      amount: number,
  ) {
    const body = {
      expenseId,
      tenantEmail,
      amount,
    };
    return this.httpClient.post<ExpenseDistributionAssignmentDto>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/expenses/distribution-assignments/create`, body,
    );
  }

  getExpenseDistributionAssignment(
      propertyId: string,
      expenseDistributionAssignmentId: string,
  ) {
    return this.httpClient.get<ExpenseDistributionAssignmentDto>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/expenses/distribution-assignments/${propertyId}/${expenseDistributionAssignmentId}`,
    );
  }

  updateExpenseDistributionAssignment(
      expenseDistributionAssignmentId: string,
      expenseId: string,
      tenantEmail: string,
      amount: number,
  ) {
    const body = {
      expenseId,
      tenantEmail,
      amount: amount * 100.00,
    };
    return this.httpClient.patch<void>(
        // eslint-disable-next-line max-len
        `${environment.FRONT_END_API_URL}/expenses/distribution-assignments/update/${expenseDistributionAssignmentId}`, body,
    );
  }
}
