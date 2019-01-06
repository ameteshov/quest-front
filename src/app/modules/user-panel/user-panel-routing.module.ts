import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormViewComponent } from './components/form-view/form-view.component';
import { RedirectLastSurvey } from '../../guards/redirect-last-survey.guard';
import { PayComponent } from './components/pay/pay.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'forms'
  },
  {
    path: 'forms/:id',
    component: FormViewComponent
  },
  {
    path: 'forms',
    component: FormViewComponent,
    canActivate: [RedirectLastSurvey]
  },
  {
    path: 'pay',
    component: PayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
