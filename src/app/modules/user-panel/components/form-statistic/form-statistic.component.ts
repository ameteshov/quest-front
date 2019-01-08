import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IQuestionnaireResult } from '../../../../interfaces/IQuestionnaireResult';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-form-statistic',
  templateUrl: './form-statistic.component.html',
  styleUrls: ['./form-statistic.component.css']
})
export class FormStatisticComponent implements OnInit, OnChanges {
  @Input() results: Array<IQuestionnaireResult>;
  @Input() score: number;

  public sent: number;
  public pass: number;
  public success: number;

  protected user: IUser;

  constructor(
    private authService: AuthService
  ) {
    this.results = [];
    this.sent = null;
    this.pass = null;
    this.success = null;
    this.score = 0;
    this.user = this.authService.getUser();
  }

  public ngOnInit(): void {
    this.fillStatistic();
  }

  public ngOnChanges(): void {
    this.fillStatistic();
  }

  protected fillStatistic(): void {
    this.sent = Math.round((this.results.length / this.user.points) * 100) || 0;
    this.pass = Math.round((this.getPassedCount() / this.results.length) * 100) || 0;
    this.success = Math.round((this.getPassedSuccessCount() / this.results.length) * 100) || 0;
  }

  protected getPassedCount(): number {
    const passed = this.results.filter(item => item.is_passed);

    return passed.length;
  }

  protected getPassedSuccessCount(): number {
    const passed = this.results.filter(item => item.is_passed && item.score >= this.score);

    return passed.length;
  }
}
