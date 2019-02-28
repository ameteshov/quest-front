import { Component, OnInit } from '@angular/core';
import { IPayment } from '../../../../interfaces/IPayment';
import { PaymentApiService } from '../../../../services/payment-api.service';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../../../../interfaces/IApiResponse';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public payments: Array<IPayment>;
  constructor(
    private paymentService: PaymentApiService
  ) {
    this.payments = [];
  }

  ngOnInit() {
    this.paymentService
      .search({ all : 1 })
      .subscribe((response: IApiResponse) => {
        this.payments = response.data;
      });
  }

}
