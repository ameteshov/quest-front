import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../../../interfaces/IPlan';
import { PlanApiService } from '../../../../services/plan-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PaymentMethods } from '../../../../enums/payment-methods.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public agreementLink: string;
  public plans: Array<IPlan>;
  public paymentMethods: any;
  public agreement: FormGroup;
  private step: number;
  private planId: number;
  private method: string;

  constructor(
    private planService: PlanApiService,
    private translationService: TranslateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.step = 1;
    this.planId = null;
    this.paymentMethods = PaymentMethods;
    this.method = '';
    this.agreementLink = environment.agreementLink;
    this.agreement = this.fb.group({
      checked: [false]
    });
  }

  public ngOnInit(): void {
    this.planService
      .search({'all': 1})
      .subscribe(
        (response: IApiResponse) => {
          this.plans = response.data;
        },
        (error: HttpErrorResponse) => {
          swal('Api Request Error', 'Oops, something went wrong', 'error')
            .then(() => {
              this.router.navigate(['forms']);
            });
        }
      );
  }

  public onNextStep(id: number): void {
    this.planId = id;
    this.step++;
  }

  public onSelectMethod(method: any): void {
    this.method = method;
  }

  public onPay(): void {
    if (this.planId !== null && this.method !== '') {
      this.planService
        .pay(this.planId, this.method)
        .subscribe(
          (response: any) => {
            window.location.href = response.url;
          },
          (error: HttpErrorResponse) => {
            this.translationService
              .get(['ERRORS.HEADER', 'ERRORS.PAYMENT_UNAVAILABLE'])
              .toPromise()
              .then((value) => {
                swal(value['ERRORS.HEADER'], value['ERRORS.PAYMENT_UNAVAILABLE'], 'error');
              });
          }
        );
    }
  }

  public get isSelectStep(): boolean {
    return this.step === 1;
  }

  public get isPayStep(): boolean {
    return this.step === 2;
  }

  public get canPay(): boolean {
    return !this.agreement.get('checked').value;
  }
}
