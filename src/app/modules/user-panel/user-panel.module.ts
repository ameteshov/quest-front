import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormViewComponent } from './components/form-view/form-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormStatisticComponent } from './components/form-statistic/form-statistic.component';
import { FormBestCandidateComponent } from './components/form-best-candidate/form-best-candidate.component';
import { PayComponent } from './components/pay/pay.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

@NgModule({
  declarations: [FormViewComponent, FormStatisticComponent, FormBestCandidateComponent, PayComponent, PaymentSuccessComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UserPanelRoutingModule,
    TranslateModule.forChild()
  ]
})
export class UserPanelModule { }
