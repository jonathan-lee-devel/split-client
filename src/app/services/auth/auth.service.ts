import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginDto } from '../../dtos/LoginDto';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public isAuthenticated(): Observable<boolean> {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    this.isLoggedIn.next(!!(userData && JSON.parse(userData)));
    return this.isLoggedIn;
  }

  public setUserInfo(user: any) {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(user));
  }

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

  logout() {
    this.httpClient
      .post<LoginDto>(`${environment.FRONT_END_API_URL}/users/logout`, {})
      .subscribe((_) => {
        this.router.navigate(['/login']);
      });
    this.isLoggedIn.next(false);
  }
}
