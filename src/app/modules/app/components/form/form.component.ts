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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public qustionnaire: IQuestionnaire;
  private hash: string;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private questionnarieService: QuestionnaireApiService,
    private router: Router,
    private translateService: TranslateService,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      content: this.fb.array([]),
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.activeRoute
      .paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.hash = params.get('hash');

          return this.questionnarieService.getByHash(this.hash);
        })
      )
      .subscribe((result: any) => {
        this.qustionnaire = result;
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
        .submit(this.hash, {
          content: this.form.controls.content.value,
          phone: this.form.controls.phone.value
        })
        .subscribe(this.onSuccess(), this.onError());
    }
  }

  public get content(): FormArray {
    return this.form.get('content') as FormArray;
  }

  protected buildForm(): void {
    this.qustionnaire
      .content
      .questions
      .forEach((elem, i) => {
        this.content.push(this.getQuestionGroup(i));
      });
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
        .then(() => this.router.navigate(['login']));
    };
  }

  protected onError(): ((value: any) => void) {
    return (error: HttpErrorResponse) => {
      console.log(error);
    };
  }
}
