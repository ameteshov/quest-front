import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IBestCandidate } from '../../../../interfaces/IBestCandidate';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';

@Component({
  selector: 'app-form-best-candidate',
  templateUrl: './form-best-candidate.component.html',
  styleUrls: ['./form-best-candidate.component.css']
})
export class FormBestCandidateComponent implements OnInit, OnChanges {
  public results: Array<IBestCandidate>

  constructor(
    private translateService: TranslateService,
    private questionnaireApiService: QuestionnaireApiService
  ) {
    this.results = [];
  }

  public ngOnInit(): void {
    this.questionnaireApiService
      .getStatistic()
      .subscribe((response: Array<IBestCandidate>) => {
        this.results = response;
      })
  }

  public ngOnChanges(): void {}

  public onInfo(index: number): void {}
}
