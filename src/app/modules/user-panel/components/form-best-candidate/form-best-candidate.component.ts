import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IBestCandidate } from '../../../../interfaces/IBestCandidate';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-best-candidate',
  templateUrl: './form-best-candidate.component.html',
  styleUrls: ['./form-best-candidate.component.css']
})
export class FormBestCandidateComponent implements OnInit, OnChanges {
  public results: Array<IBestCandidate>;

  constructor(
    private translateService: TranslateService,
    private questionnaireApiService: QuestionnaireApiService,
    private modalService: NgxSmartModalService
  ) {
    this.results = [];
  }

  public ngOnInit(): void {
    this.questionnaireApiService
      .getStatistic()
      .subscribe((response: Array<IBestCandidate>) => {
        this.results = response;
      });
  }

  public ngOnChanges(): void {}

  public onInfo(email: string): void {
    this.questionnaireApiService
      .getCandidate(email)
      .pipe(
        map((response) => {
          const modal = this.modalService.getModal('candidateDetails');
          modal.removeData();
          modal.setData(response);
          modal.open();
        })
      )
      .subscribe();
  }
}
