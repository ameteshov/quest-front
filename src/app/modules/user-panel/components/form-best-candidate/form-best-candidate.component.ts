import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { IQuestionnaireResult } from '../../../../interfaces/IQuestionnaireResult';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-best-candidate',
  templateUrl: './form-best-candidate.component.html',
  styleUrls: ['./form-best-candidate.component.css']
})
export class FormBestCandidateComponent implements OnInit, OnChanges {
  @Input() survey: IQuestionnaire;
  public results: Array<IQuestionnaireResult>;

  constructor(
    private translateService: TranslateService
  ) {
    this.results = [];
  }

  public ngOnInit(): void {
    this.fillCandidates();
  }

  public ngOnChanges(): void {
    this.fillCandidates();
  }

  public onInfo(index: number): void {
    const recipient = this.results[index];
    this.translateService
      .get(['USER_SURVEY.RECIPIENT_INFO.PHONE', 'USER_SURVEY.RECIPIENT_INFO.NAME', 'USER_SURVEY.RECIPIENT_INFO.EMAIL'])
      .toPromise()
      .then((values) => {
        const text = [
          `${values['USER_SURVEY.RECIPIENT_INFO.NAME']}: ${recipient.recipient_name}`,
          `${values['USER_SURVEY.RECIPIENT_INFO.EMAIL']}: ${recipient.email}`,
        ];

        if ('undefined' !== typeof recipient.recipient_phone) {
          text.push(`${values['USER_SURVEY.RECIPIENT_INFO.PHONE']}: ${recipient.recipient_phone}`);
        }

        return swal('', text.join('<br>'), 'info');
      });
  }

  protected fillCandidates(): void {
    this.results = this.survey.results.filter(
      (item) => {
        return item.is_passed && item.score >= this.survey.success_score;
      });
  }

}
