import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public questionnaire: IQuestionnaire;
  public step: number;
  private hash: string;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private questionnarieService: QuestionnaireApiService,
    private router: Router,
    private translateService: TranslateService,
    private location: Location,
    public dateTimeAdapter: DateTimeAdapter<any>,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      content: this.fb.array([]),
      info: this.fb.group({
        phone: ['', [Validators.required]],
        birthday: [moment.now(), [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
      })
    });
    this.step = 1;
    this.dateTimeAdapter.setLocale('ru');
  }

  public ngOnInit(): void {
    this.activeRoute
      .paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.hash = params.get('hash');

          return this.questionnarieService.getByHash(this.hash);
        })
      )
      .subscribe((result: any) => {
        this.questionnaire = result;
        this.buildForm();
      }, (error: HttpErrorResponse) => {
        this.translateService
          .get('FORM.ERROR')
          .toPromise()
          .then((value) => {
            return swal('', value, 'error');
          })
          .then(() => { this.router.navigate(['login']); });
      });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.questionnarieService
        .submit(this.hash, this.form.value)
        .subscribe(this.onSuccess(), this.onError());
    }
    else{
      swal('', 'Нужно ответить на все вопросы', 'error');
    }
  }

  public onChangeStep(): void {
    if (this.step === 1) {
      if (this.form.controls.info.valid) {
        this.step++;
      } else {
        this.formService.markInvalid(this.form.get('info') as FormGroup);
      }
    } else {
      this.step--;
    }
  }

  public get content(): FormArray {
    return this.form.get('content') as FormArray;
  }

  public get isFormStep(): boolean {
    return this.step === 2;
  }

  public get isInfoStep(): boolean {
    return this.step === 1;
  }

  protected buildForm(): void {
    this.questionnaire
      .content
      .questions
      .forEach((elem, i) => {
        this.content.push(this.getQuestionGroup(i));
      });

    this.fillInfo();
  }

  protected fillInfo(): void {
    const infoForm = this.form.get('info') as FormGroup;

    infoForm.controls.email.patchValue(this.questionnaire.results[0].email);
    infoForm.controls.name.patchValue(this.questionnaire.results[0].recipient_name);
  }

  protected getQuestionGroup(index: number): FormGroup {
    return this.fb.group({
      index: [index],
      result: ['', [Validators.required]]
    });
  }

  protected onSuccess(): ((value: any) => void) {
    return (response) => {
      this.translateService
        .get('FORM.SUCCESS')
        .toPromise()
        .then(value => swal('', value, 'success'))
        .then(() => {
          document.location.href = '/';
        });
    };
  }

  protected onError(): ((value: any) => void) {
    
    return (error: HttpErrorResponse) => {
      
      console.log(error);
    };
  }
}
