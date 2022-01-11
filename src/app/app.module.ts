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
import {LoginComponent} from './components/pages/login/login.component';
// eslint-disable-next-line max-len
import {RegisterComponent} from './components/pages/registration/register.component';
import {ErrorInterceptor} from './interceptors/auth/error.interceptor';
// eslint-disable-next-line max-len
import {ForbiddenComponent} from './components/pages/error/forbidden/forbidden.component';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
/**
 * Main app module class.
 */
export class AppModule {
}
