import {Routes} from '@angular/router';
import {LoginComponent} from './components/pages/user/login/login.component';
// eslint-disable-next-line max-len
import {RegisterComponent} from './components/pages/user/registration/register.component';
// eslint-disable-next-line max-len
import {ForbiddenComponent} from './components/pages/error/forbidden/forbidden.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {HomeComponent} from './components/pages/home/home.component';
import {
  PasswordResetRequestComponent,
} from './components/pages/user/password-reset-request/password-reset-request.component';
import {
  PasswordResetConfirmComponent,
} from './components/pages/user/password-reset-confirm/password-reset-confirm.component';
import {ProfileComponent} from './components/pages/user/profile/profile.component';
import {PropertyCreateComponent} from './components/pages/property/property-create/property-create.component';
import {PropertyViewComponent} from './components/pages/property/property-view/property-view.component';
import {NotFoundComponent} from "./components/pages/error/not-found/not-found.component";

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
  {path: 'error/not-found', component: NotFoundComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  {
    path: 'property/create',
    canActivate: [AuthGuard],
    component: PropertyCreateComponent,
  },
  {
    path: 'property/view/:id',
    canActivate: [AuthGuard],
    component: PropertyViewComponent,
  },
];
