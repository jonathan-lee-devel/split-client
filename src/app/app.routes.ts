import {Routes} from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';
// eslint-disable-next-line max-len
import {RegisterComponent} from './components/pages/registration/register.component';
// eslint-disable-next-line max-len
import {ForbiddenComponent} from './components/pages/error/forbidden/forbidden.component';
import {AuthGuard} from './guards/auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    redirectTo: 'login',
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'error/forbidden', component: ForbiddenComponent},
];
