import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AuthGuard } from './../../guards/auth.guard';
import { RedirectAuthorized } from './../../guards/redirect-authorized.guard';
import { BodyComponent } from '../shared/components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormComponent } from './components/form/form.component';
import { PanelBodyComponent } from '../shared/components/panel-body/panel-body.component';

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
    component: FormComponent
  },
  {
    path: 'panel',
    loadChildren: '../user-panel/user-panel.module#UserPanelModule',
    component: PanelBodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: '../user/user.module#UserModule',
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'questionnaires',
    loadChildren: '../questionnaire/questionnaire.module#QuestionnaireModule',
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: '../payment/payment.module#PaymentModule',
    component: BodyComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: '../plan/plan.module#PlanModule',
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
