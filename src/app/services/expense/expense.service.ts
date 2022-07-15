import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpenseDto} from '../../dtos/expenses/ExpenseDto';
import {environment} from '../../../environments/environment';
import {ExpenseFrequency} from '../../dtos/expenses/enum/ExpenseFrequency';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private httpClient: HttpClient) { }

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
      startDate: Date,
      endDate: Date,
  ) {
    const expense = {
      propertyId,
      title,
      amount: amount * 100,
      frequency,
      startDate,
      endDate,
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
      startDate: Date,
      endDate: Date) {
    const amountAsString = String(amount);
    const body: ExpenseDto = {
      'id': undefined,
      title,
      propertyId,
      'amount': amountAsString,
      frequency,
      startDate,
      endDate,
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
}
