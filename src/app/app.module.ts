import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/registration/register.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { ForbiddenComponent } from './components/pages/error/forbidden/forbidden.component';
import { JobComponent } from './components/pages/job/job.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { MetricsComponent } from './components/pages/metrics/metrics.component';
import { ModalComponent } from './components/modal/modal.component';
import { BuildComponent } from './components/pages/build/build.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    JobComponent,
    JobsComponent,
    BuildComponent,
    MetricsComponent,
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
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
