import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpenseDto} from '../../dtos/expenses/ExpenseDto';
import {environment} from '../../../environments/environment';

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
}
