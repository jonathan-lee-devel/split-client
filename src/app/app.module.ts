import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
// eslint-disable-next-line max-len
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {appRoutes} from './app.routes';
import {LoginComponent} from './components/pages/user/login/login.component';
// eslint-disable-next-line max-len
import {RegisterComponent} from './components/pages/user/registration/register.component';
import {ErrorInterceptor} from './interceptors/error/error.interceptor';
// eslint-disable-next-line max-len
import {ForbiddenComponent} from './components/pages/error/forbidden/forbidden.component';
import {ModalComponent} from './components/modal/modal.component';
import {HomeComponent} from './components/pages/home/home.component';
// eslint-disable-next-line max-len
import {
  PasswordResetRequestComponent,
} from './components/pages/user/password-reset-request/password-reset-request.component';
import {
  PasswordResetConfirmComponent,
} from './components/pages/user/password-reset-confirm/password-reset-confirm.component';
// eslint-disable-next-line max-len
import {ProfileComponent} from './components/pages/user/profile/profile.component';
// eslint-disable-next-line max-len
import {PropertyCreateComponent} from './components/pages/property/property-create/property-create.component';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PropertyViewComponent} from './components/pages/property/property-view/property-view.component';
import {NotFoundComponent} from './components/pages/error/not-found/not-found.component';
import {EmailRegistrationVerificationComponent} from './components/pages/user/token/email-registration-verification/email-registration-verification.component';
import {PropertyManageTenantsComponent} from './components/pages/property/property-admin/property-manage-tenants/property-manage-tenants.component';
import {PropertyManageExpensesComponent} from './components/pages/property/property-admin/property-manage-expenses/property-manage-expenses.component';
import {MyPropertiesViewComponent} from './components/pages/property/my-properties-view/my-properties-view.component';
import {MyTenanciesViewComponent} from './components/pages/property/my-tenancies-view/my-tenancies-view.component';
import {PropertyInvitationVerificationComponent} from './components/pages/property/token/property-invitation-verification/property-invitation-verification.component';
import {ExpenseCreateComponent} from './components/pages/expense/expense-create/expense-create.component';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {PropertyManageTenantsInviteComponent} from
  // eslint-disable-next-line max-len
  './components/pages/property/property-admin/property-manage-tenants/invite/property-manage-tenants-invite/property-manage-tenants-invite.component';
import {ExpenseEditComponent} from './components/pages/expense/expense-edit/expense-edit.component';
import { PropertyExpenseReportViewComponent } from './components/pages/property/property-expense-report-view/property-expense-report-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ForbiddenComponent,
    ModalComponent,
    PasswordResetRequestComponent,
    PasswordResetConfirmComponent,
    ProfileComponent,
    PropertyCreateComponent,
    PropertyViewComponent,
    NotFoundComponent,
    EmailRegistrationVerificationComponent,
    PropertyManageTenantsComponent,
    PropertyManageExpensesComponent,
    MyPropertiesViewComponent,
    MyTenanciesViewComponent,
    PropertyInvitationVerificationComponent,
    ExpenseCreateComponent,
    PropertyManageTenantsInviteComponent,
    ExpenseEditComponent,
    PropertyExpenseReportViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    MatChipsModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatIconModule,
    NoopAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA],
      },
    },
  ],
  bootstrap: [AppComponent],
})
/**
 * Main app module class.
 */
export class AppModule {
}
