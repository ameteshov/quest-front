import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { FormService } from '../../../../services/form.service';
import { filter, switchMap, mergeMap, map } from 'rxjs/operators';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { Questionnaire } from '../../../../models/Questionnaire';
import { Observable, from } from 'rxjs';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-create-edit',
  templateUrl: './form-create-edit.component.html',
  styleUrls: ['./form-create-edit.component.css']
})
export class FormCreateEditComponent implements OnInit {
  public form: FormGroup;
  public survey: IQuestionnaire;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questApiService: QuestionnaireApiService,
    private translateService: TranslateService,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      questions: this.fb.array([
        this.fb.group(this.getQuestionGroup())
      ])
    });

    this.survey = new Questionnaire({});
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(
        filter((params) => {
          return params.id;
        }),
        switchMap((params) => {
          return this.questApiService.read(params.id);
        })
      )
      .subscribe((response) => this.fillForm(response));
  }

  public get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      let req = new Observable<null>();

      if (this.survey.id) {
        req = this.questApiService
          .update(this.survey.id, this.getFormData());
      } else {
        req = this.questApiService
          .create(this.getFormData());
      }

      req.pipe(
        map(() => {}),
        mergeMap(() => {
          return this.translateService.get('USER_SURVEY.NEW.SUCCESS');
        }),
        mergeMap((value: string) => {
          return from(swal('', value, 'success'));
        })
      )
      .subscribe(() => {
        this.router.navigate(['panel/forms']);
      });
    } else {
      this.formService.markInvalid(this.form);
      this.formService.markArrayInvalid(this.questions);
    }
  }

  public onCancel(): void {
    this.router.navigate(['/questionnaires']);
  }

  public onRemoveQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  public onAddQuestion(): void {
    this.questions.push(this.fb.group(this.getQuestionGroup()));
  }

  protected getQuestionGroup(data: any = {}): Object {
    const text = data.text || '';

    return {
      text: [text, [Validators.required]]
    };
  }

  protected getFormData(): IQuestionnaire {
    return {
      name: this.form.controls.name.value,
      content: {
        questions: this.form.controls.questions.value,
      }
    };
  }

  protected fillForm(data: IQuestionnaire): void {
    this.survey = new Questionnaire(data);

    this.fillFormInfo();
    this.fillQuestions();
  }

  protected fillFormInfo(): void {
    this.form.controls.name.patchValue(this.survey.name);
  }

  protected fillQuestions(): void {
    if (this.questions.length === 1) {
      this.questions.removeAt(0);
    }

    this.survey.content.questions.forEach((item) => {
      this.questions.push(this.fb.group(this.getQuestionGroup(item)));
    });
  }
}
