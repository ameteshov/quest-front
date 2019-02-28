import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../../../interfaces/IPlan';
import { PlanApiService } from '../../../../services/plan-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public plans: Array<IPlan>;
  constructor(
    private planService: PlanApiService,
    private router: Router
  ) {
    this.plans = [];
  }

  public ngOnInit(): void {
    this.planService
      .search({ 'all': 1 })
      .subscribe(
        (response: IApiResponse) => {
          this.plans = response.data;
        },
        (error: HttpErrorResponse) => {
          swal('Api Request Error', 'Ooops, something went wrong', 'error');
        }
      );
  }

  public goToEdit(id: number): void {
    this.router.navigate(['plans', id]);
  }

}
