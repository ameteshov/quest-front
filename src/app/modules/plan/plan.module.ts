import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { CreateEditItemComponent } from './components/create-edit-item/create-edit-item.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListComponent, CreateEditItemComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class PlanModule { }
