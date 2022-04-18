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
      startDate: string,
      endDate: string,
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
}
