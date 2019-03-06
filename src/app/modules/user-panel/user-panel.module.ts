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
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { FormCreateEditComponent } from './components/form-create-edit/form-create-edit.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PricePipe } from '../../pipes/price.pipe';

const config = {
  radius: 82,
  space: -13,
  unitsFontSize: '32',
  outerStrokeGradient: false,
  outerStrokeWidth: 13,
  outerStrokeLinecap: 'butt',
  outerStrokeGradientStopColor: '#52C036',
  backgroundGradient: false,
  innerStrokeColor: '#e7e8ea',
  innerStrokeWidth: 12,
  title: 'UI',
  titleFontSize: '21',
  subtitleFontSize: '32',
  animationDuration: 500,
  showTitle: false,
  showUnits: false,
  showBackground: false,
  clockwise: false,
  startFromZero: false
};

@NgModule({
  declarations: [
    FormViewComponent, FormStatisticComponent, FormBestCandidateComponent, PayComponent,
    PaymentSuccessComponent, FormCreateEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UserPanelRoutingModule,
    QuestionnaireModule,
    MatExpansionModule,
    NgCircleProgressModule.forRoot(config),
    TranslateModule.forChild(),
    NgxSmartModalModule.forChild()
  ]
})
export class UserPanelModule { }
