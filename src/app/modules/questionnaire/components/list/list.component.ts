import { Component, OnInit } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { IUser } from '../../../../interfaces/IUser';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public list: Array<IQuestionnaire>;
  public user: IUser;

  constructor(
    private authService: AuthService
  ) {
    this.list = [];
    this.user = this.authService.getUser();
  }

  ngOnInit() {}

}
