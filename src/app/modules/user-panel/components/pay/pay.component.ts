import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../../../interfaces/IPlan';
import { PlanApiService } from '../../../../services/plan-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public plans: Array<IPlan>;

  constructor(
    private planService: PlanApiService,
    private router: Router
  ) { }

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

}
