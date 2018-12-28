import { Component, OnInit, Input } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  public list: Array<IQuestionnaire>;
  constructor(
    private questApiService: QuestionnaireApiService,
  ) {
    this.list = [];
  }

  ngOnInit() {
    this.questApiService
      .search({'all': true})
      .subscribe((response: IApiResponse) => {
        this.list = response.data;
      });
  }

  public onToggle(id: number): void {
    const index = this.list.findIndex(item => item.id === id);
    const isActive = !this.list[index].is_active;

    this.questApiService
      .update(id, { is_active: isActive })
      .subscribe();
  }

}
