import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { IQuestionnaireResult } from '../../../../interfaces/IQuestionnaireResult';

@Component({
  selector: 'app-form-best-candidate',
  templateUrl: './form-best-candidate.component.html',
  styleUrls: ['./form-best-candidate.component.css']
})
export class FormBestCandidateComponent implements OnInit, OnChanges {
  @Input() survey: IQuestionnaire;
  public results: Array<IQuestionnaireResult>;

  constructor() {
    this.results = [];
  }

  public ngOnInit(): void {
    this.fillCandidates();
  }

  public ngOnChanges(): void {
    this.fillCandidates();
  }

  protected fillCandidates(): void {
    this.results = this.survey.results.filter(
      (item) => {
        return item.is_passed && item.score >= this.survey.success_score;
      });
  }

}
