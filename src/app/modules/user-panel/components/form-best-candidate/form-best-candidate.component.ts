import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { IBestCandidate } from '../../../../interfaces/IBestCandidate';
import { TranslateService } from '@ngx-translate/core';
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
  public vacancyListOpen: boolean;
  public vacancies: Array<string>;
  private filters: Array<string>;

  constructor(
    private translateService: TranslateService,
    private questionnaireApiService: QuestionnaireApiService,
    private modalService: NgxSmartModalService
  ) {
    this.results = [];
    this.vacancies = [];
    this.filters = [];
    this.vacancyListOpen = false;
  }

  public ngOnInit(): void {
    this.updateStatistic();
    this.updateList();
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

  public onViewDetails(event: Event, id: number): void {
    event.preventDefault();

    this.questionnaireApiService
      .getSingleResult(id)
      .subscribe((response) => {
        const modal = this.modalService.getModal('viewResult');
          modal.removeData();
          modal.setData(response);
          modal.open();
      });
  }

  public onToggleVacancyList(event: Event): void {
    if (this.vacancies.length === 0) {
      return;
    }
    this.vacancyListOpen = !this.vacancyListOpen;
  }

  public onFilterChange(event: Event): void {
    const val = (<HTMLInputElement>event.currentTarget).value;
    const index = this.filters.indexOf(val);

    index === -1 ? this.filters.push(val) : this.filters.splice(index, 1);
  }

  public isFilterActive(value: string): boolean {
    return this.filters.indexOf(value) !== -1;
  }

  public updateStatistic(): void {
    this.questionnaireApiService
      .getStatistic({vacancies: this.vacancies})
      .subscribe((response: Array<IBestCandidate>) => {
        this.results = response;
      });
  }

  public updateList(): void {
    this.questionnaireApiService
      .getVacancies()
      .subscribe((response: Array<any>) => {
        this.vacancies = response.map(item => item.vacancy);
      });
  }
}
