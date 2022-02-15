import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {CommonModule} from '@angular/common';
// eslint-disable-next-line max-len
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
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
import { NotFoundComponent } from './components/pages/error/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
