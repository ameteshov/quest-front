import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../../../interfaces/IPlan';
import { PlanApiService } from '../../../../services/plan-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PaymentMethods } from '../../../../enums/payment-methods.enum';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public plans: Array<IPlan>;
  public paymentMethods: any;
  private step: number;
  private planId: number;
  private method: string;

  constructor(
    private planService: PlanApiService,
    private translationService: TranslateService,
    private router: Router
  ) {
    this.step = 1;
    this.planId = null;
    this.paymentMethods = PaymentMethods;
    this.method = '';
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
  public fixedSum(sum){
    sum = parseFloat(sum).toFixed(0);
    var newsum = new Intl.NumberFormat('ru-RU', { style: 'decimal'}).format(sum);
    return newsum;
  }
}
