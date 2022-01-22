import {Injectable} from '@angular/core';
// eslint-disable-next-line max-len
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth guard used to enforce login policy on the U.I.
 */
export class AuthGuard implements CanActivate {
  /**
   * Standard constructor.
   * @param {AuthService} authService used to authenticate user
   * @param {Router} router used to navigate through pages
   */
  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Primary function which enforces the login policy within the U.I.
   * @param {ActivatedRouteSnapshot} route which is being accessed
   * @param {RouterStateSnapshot} state snapshot for router state
   * @return {Observable} indicating if user should be able to access
   */
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
