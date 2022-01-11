import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginDto} from '../../dtos/ auth/LoginDto';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Used to authenticate users.
 */
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to interact with the users API
   * @param {Router} router used to navigate to different pages
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  /**
   * Used to determine if a user is authenticated.
   * @return {Observable} boolean indicating if user is authenticated
   */
  public isAuthenticated(): Observable<boolean> {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    this.isLoggedIn.next(!!(userData && JSON.parse(userData)));
    return this.isLoggedIn;
  }

  /**
   * Used to set user info within local storage.
   * @param {Object} user data to be stored
   */
  public setUserInfo(user: any) {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(user));
  }

  /**
   * Used to validate user credentials and create user session.
   * @param {string} username to be authenticated
   * @param {string} password to be authenticated
   */
  public validate(username: string, password: string) {
    const body = new HttpParams()
        .set('username', username)
        .set('password', password);

    this.httpClient
        .post<LoginDto>(`${environment.FRONT_END_API_URL}/users/login`, body, {
          withCredentials: true,
        })
        .subscribe((response) => {
          if (response.login_status === 'SUCCESS') {
            this.setUserInfo({});
            this.router.navigate(['/jobs']);
          }
        });
  }

  /**
   * Used to log out and end user session.
   */
  logout() {
    this.httpClient
        .post<LoginDto>(`${environment.FRONT_END_API_URL}/users/logout`, {})
        .subscribe((_) => {
          this.router.navigate(['/login']);
        });
    this.isLoggedIn.next(false);
  }
}
