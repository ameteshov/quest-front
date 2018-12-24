import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AuthGuard } from './../../guards/auth.guard';
import { RedirectAuthorized } from './../../guards/redirect-authorized.guard';
import { UserModule } from '../user/user.module';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { BodyComponent } from '../shared/components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PaymentModule } from '../payment/payment.module';
import { PlanModule } from '../plan/plan.module';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectAuthorized]
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [RedirectAuthorized]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [RedirectAuthorized]
  },
  {
    path: 'forms/:hash',
    component: FormComponent,
    canActivate: [RedirectAuthorized]
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => UserModule,
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'questionnaires',
    loadChildren: () => QuestionnaireModule,
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () => PaymentModule,
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: () => PlanModule,
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
