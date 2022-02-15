import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../services/auth/auth.service';
import {ModalService} from '../../services/modal/modal.service';

@Injectable()
/**
 * HTTP interceptor used to handle error HTTP responses and provide CSRF tokens.
 */
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Standard constructor.
   * @param {Router} router used to navigate to different routes
   * @param {CookieService} cookieService used with CSRF tokens
   * @param {HttpXsrfTokenExtractor} tokenExtractor used to extract CSRF tokens
   * @param {AuthService} authService used to authenticate user
   * @param {ModalService} modalService used to create modals for errors
   */
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private authService: AuthService,
    private modalService: ModalService,
  ) {
  }

  /**
   * Main intercept function.
   * @param {HttpRequest} request to be intercepted
   * @param {HttpHandler} next to be handled
   * @return {Observable} interception
   */
  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.cookieService.set(
        'X-XSRF-TOKEN',
      <string> this.tokenExtractor.getToken(),
    );
    request = request.clone({
      withCredentials: true,
    });

    const cookieHeaderName = 'X-XSRF-TOKEN';
    const csrfToken = this.tokenExtractor.getToken() as string;
    if (csrfToken !== null && !request.headers.has(cookieHeaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieHeaderName, csrfToken),
      });
    }

    return next
        .handle(request)
        .pipe(catchError((err) => this.handleAuthError(err)));
  }

  /**
   * Helper function used to handle HTTP error responses.
   * @param {HttpErrorResponse} error which is to be handled
   * @private only used within the error interceptor class
   * @return {Observable} unused return value
   */
  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400) {
      this.modalService.showModal(
          'Registration Error',
          error.error.errors[0].msg,
      );
    }

    if (error.status === 401) {
      this.modalService.showModal(
          'Authentication Error',
          'Invalid username or password',
      );
      this.authService.logout();
      return of(error.message);
    }

    if (error.status === 403) {
      this.router.navigate(['/error/forbidden']);
    }

    if (error.status === 404) {
      this.router.navigate(['/error/not-found']);
    }

    if (error.status === 409) {
      this.modalService.showModal('Registration Error', 'User already exists');
    }
    throw error;
  }
}
