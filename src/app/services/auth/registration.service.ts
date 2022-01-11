import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterDto} from '../../dtos/ auth/RegisterDto';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Used to register users.
 */
export class RegistrationService {
  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to interact with the users API
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Used to register user.
   * @param {string} email to be used for registration
   * @param {string} password to be used for registration
   * @param {string} confirmPassword to be used for registration
   * @return {Observable} for the registration request to API
   */
  public register(email: string, password: string, confirmPassword: string)
    : Observable<RegisterDto> {
    const body = {
      email,
      password,
      confirm_password: confirmPassword,
    };

    return this.httpClient.post<RegisterDto>(
        `${environment.FRONT_END_API_URL}/users/register`,
        body,
    );
  }
}
