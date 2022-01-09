import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/registration/register.component';
import { ForbiddenComponent } from './components/pages/error/forbidden/forbidden.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { JobComponent } from './components/pages/job/job.component';
import { MetricsComponent } from './components/pages/metrics/metrics.component';
import { BuildComponent } from './components/pages/build/build.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    redirectTo: 'login',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error/forbidden', component: ForbiddenComponent },
  { path: 'jobs', canActivate: [AuthGuard], component: JobsComponent },
  { path: 'jobs/:jobName', canActivate: [AuthGuard], component: JobComponent },
  {
    path: 'jobs/:jobName/metrics',
    canActivate: [AuthGuard],
    component: MetricsComponent,
  },
  {
    path: 'jobs/:jobName/build/:buildNumber',
    canActivate: [AuthGuard],
    component: BuildComponent,
  },
];
