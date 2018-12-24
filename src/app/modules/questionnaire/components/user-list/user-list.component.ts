import { Component, OnInit, Input } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
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

}
