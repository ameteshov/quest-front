import { Component, OnInit } from '@angular/core';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { IApiResponse } from '../../../../interfaces/IApiResponse';

@Component({
  selector: 'app-panel-navigation-component',
  templateUrl: './panel-navigation-component.component.html',
  styleUrls: ['./panel-navigation-component.component.css']
})
export class PanelNavigationComponentComponent implements OnInit {
  public list: Array<IQuestionnaire>;

  constructor(
    private questService: QuestionnaireApiService
  ) {
    this.list = [];
  }

  ngOnInit() {
    this.questService
      .search({ all: 1 })
      .subscribe((response: IApiResponse) => {
        this.list = response.data;
      });
  }

}
