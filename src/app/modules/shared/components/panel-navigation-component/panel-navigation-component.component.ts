import { Component, OnInit } from '@angular/core';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { QuestionnaireEventsService } from '../../../../services/questionnaire-events.service';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-panel-navigation-component',
  templateUrl: './panel-navigation-component.component.html',
  styleUrls: ['./panel-navigation-component.component.css']
})
export class PanelNavigationComponentComponent implements OnInit {
  isOpenAcc = true;
  isOpenStockTests = false;
  isOpenCustomTests = false;
  isOpenSupport = false;

  openSupport(){
    this.isOpenStockTests = false;
    this.isOpenCustomTests = false;
    this.isOpenSupport = !this.isOpenSupport;
  }
  openCustoms(){
    this.isOpenSupport = false;
    this.isOpenStockTests = false;
    this.isOpenCustomTests = !this.isOpenCustomTests;
  }
  openStock(){
    this.isOpenSupport = false;
    this.isOpenCustomTests = false;
    this.isOpenStockTests = !this.isOpenStockTests;
  }
  openAcc() {
    this.isOpenAcc = !this.isOpenAcc;
  }

  public ownList: Array<IQuestionnaire>;
  public generalList: Array<IQuestionnaire>;
  private user: IUser;

  constructor(
    private questService: QuestionnaireApiService,
    private questEventsService: QuestionnaireEventsService,
    private authService: AuthService
  ) {
    this.generalList = [];
    this.ownList = [];
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.getList();

    this.questEventsService
      .emitter
      .subscribe((event) => {
        this.getList();
      });
  }

  protected getList(): void {
    this.questService
      .search({ all: 1 })
      .subscribe((response: IApiResponse) => {
        this.ownList = <Array<any>>response.data.filter(item => item.user_id === this.user.id);
        this.generalList = <Array<any>>response.data.filter(item => item.user_id !== this.user.id);
      });
  }

}
