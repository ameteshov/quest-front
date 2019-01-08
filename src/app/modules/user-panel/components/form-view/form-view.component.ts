import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter, mergeMap } from 'rxjs/operators';
import { Questionnaire } from '../../../../models/Questionnaire';
import { UserApiService } from '../../../../services/user-api.service';
import { AuthService } from '../../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  public sendForm: FormGroup;
  public survey: IQuestionnaire;
  public disabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireApiService,
    private userService: UserApiService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.survey = new Questionnaire({});

    this.sendForm = this.fb.group({
      list: this.fb.array([
        this.fb.group(this.getListGroup())
      ])
    });
  }

  ngOnInit() {
    this.route
      .params
      .pipe(
        filter(params => params.id ),
        switchMap((params) => {
          return this.questionnaireService.read(params.id, { with: ['results'] });
        })
      )
      .subscribe((result) => { this.survey = new Questionnaire(result); });
  }

  public onAdd(): void {
    this.list.push(this.fb.group(this.getListGroup()));
  }

  public onRemove(index: number): void {
    if (index === 0) {
      return;
    }
    this.list.removeAt(index);
  }

  public onSubmit(): void {
    if (this.sendForm.valid) {
      this.disabled = true;
      this.questionnaireService
        .send(this.survey.id, this.sendForm.controls.list.value)
        .pipe(
          switchMap((response) => {
            return this.userService.read(this.authService.getUser().id);
          }),
          mergeMap((response) => {
            this.authService.setUser(response);

            return this.translateService.get('USER_SURVEY.SENT_SURVEY_FORM.SUCCESS_MESSAGE');
          })
        )
        .subscribe(
          (value) => {
            swal('', value, 'success')
              .then(() => {
                this.resetForm();
              });
          },
          (error) => {
            swal('error', 'Please check data', 'error');
          }
        );
    }
  }

  public get list(): FormArray {
    return this.sendForm.get('list') as FormArray;
  }

  protected resetForm(): void {
    for (let i = this.list.length; i > 0; i--) {
      this.list.removeAt(i);
    }

    this.sendForm.reset();
  }

  protected getListGroup(): Object {
    return {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    };
  }

}
