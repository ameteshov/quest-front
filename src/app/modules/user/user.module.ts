import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/components/shared.module';
import { RouterModule } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, NewUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
