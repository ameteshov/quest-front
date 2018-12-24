import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { StatisticComponent } from './components/statistic/statistic.component';
import { AdminStatisticComponent } from './components/admin-statistic/admin-statistic.component';
import { UserStatisticComponent } from './components/user-statistic/user-statistic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatisticComponent, AdminStatisticComponent, UserStatisticComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
