import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [ListComponent, NewItemComponent, AdminListComponent, UserListComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    TranslateModule.forChild(),
    NgxSmartModalModule.forChild()
  ]
})
export class QuestionnaireModule { }
