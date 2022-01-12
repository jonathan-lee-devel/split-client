import {Routes} from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';
// eslint-disable-next-line max-len
import {RegisterComponent} from './components/pages/registration/register.component';
// eslint-disable-next-line max-len
import {ForbiddenComponent} from './components/pages/error/forbidden/forbidden.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {HomeComponent} from './components/pages/home/home.component';
import {
  PasswordResetRequestComponent,
} from './components/pages/password-reset-request/password-reset-request.component';
import {
  PasswordResetConfirmComponent,
} from './components/pages/password-reset-confirm/password-reset-confirm.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password/reset', component: PasswordResetRequestComponent},
  {path: 'password/reset/confirm', component: PasswordResetConfirmComponent},
  {path: 'error/forbidden', component: ForbiddenComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
];
