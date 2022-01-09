import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from '../../services/modal/modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.cookieService.set(
      'X-XSRF-TOKEN',
      <string>this.tokenExtractor.getToken()
    );
    request = request.clone({
      withCredentials: true,
    });

    const cookieHeaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    if (csrfToken !== null && !request.headers.has(cookieHeaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieHeaderName, csrfToken),
      });
    }

    return next
      .handle(request)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400) {
      this.modalService.showModal(
        'Registration Error',
        error.error.errors[0].msg
      );
    }

    if (error.status === 401) {
      this.modalService.showModal(
        'Authentication Error',
        'Invalid username or password'
      );
      this.authService.logout();
      return of(error.message);
    }

    if (error.status === 403) {
      this.router.navigate(['/error/forbidden']);
    }

    if (error.status === 409) {
      this.modalService.showModal('Registration Error', 'User already exists');
    }
    throw error;
  }
}
