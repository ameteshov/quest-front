import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter, mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { Questionnaire } from '../../../../models/Questionnaire';
import { FormService } from '../../../../services/form.service';
import { QuestionnaireTypeApiService } from '../../../../services/questionnaire-type-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { IQuestionnaireType } from '../../../../interfaces/IQuestionnaireType';
import { defaultValidator } from '../../../../validators/default.validator';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public form: FormGroup;
  public survey: IQuestionnaire;
  public types: Array<IQuestionnaireType>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questApiService: QuestionnaireApiService,
    private questionnaireTypeApiService: QuestionnaireTypeApiService,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      success_score: ['', [Validators.required]],
      result_type: ['default', [Validators.required, defaultValidator()]],
      type_id: [0, [Validators.required]],
      questions: this.fb.array([
        this.fb.group(this.getQuestionGroup())
      ]),
      answers: this.fb.array([
        this.fb.group(this.getAnswerGroup())
      ])
    });

    this.survey = new Questionnaire({});
    this.types = [];
  }

  ngOnInit() {
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

    this.questionnaireTypeApiService
      .search({ all: 1 })
      .pipe(
        map((response: IApiResponse) => {
          this.types = response.data;
        })
      )
      .subscribe();
  }

  public get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  public get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  public addQuestion(): void {
    this.questions.push(this.fb.group(this.getQuestionGroup()));
  }

  public addAnswer(): void {
    this.answers.push(this.fb.group(this.getAnswerGroup()));
  }

  public onCancel(): void {
    this.router.navigate(['/questionnaires']);
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

      req.subscribe(() => {
        swal('Success', 'Questionnaire saved successfully', 'success')
          .then(() => { this.router.navigate(['questionnaires']); });
      });
    } else {
      this.formService.markInvalid(this.form);
      this.formService.markArrayInvalid(this.questions);
      this.formService.markArrayInvalid(this.answers);
    }
  }

  public onRemoveQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  public onRemoveAnswer(index: number): void {
    this.answers.removeAt(index);
  }

  protected fillForm(data: IQuestionnaire): void {
    this.survey = new Questionnaire(data);

    this.fillFormInfo();
    this.fillQuestions();
    this.fillAnswers();
  }

  protected getFormData(): IQuestionnaire {
    return {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      success_score: this.form.controls.success_score.value,
      result_type: this.form.controls.result_type.value,
      type_id: +this.form.controls.type_id.value === 0 ? null : this.form.controls.type_id.value,
      content: {
        questions: this.form.controls.questions.value,
        answers: this.form.controls.answers.value
      }
    };
  }

  protected fillFormInfo(): void {
    this.form.controls.name.patchValue(this.survey.name);
    this.form.controls.description.patchValue(this.survey.description);
    this.form.controls.success_score.patchValue(this.survey.success_score);
    this.form.controls.result_type.patchValue(this.survey.result_type);
  }

  protected fillQuestions(): void {
    if (this.questions.length === 1) {
      this.questions.removeAt(0);
    }

    this.survey.content.questions.forEach((item) => {
      this.questions.push(this.fb.group(this.getQuestionGroup(item)));
    });
  }

  protected fillAnswers(): void {
    if (this.answers.length === 1) {
      this.answers.removeAt(0);
    }

    this.survey.content.answers.forEach((item) => {
      this.answers.push(this.fb.group(this.getAnswerGroup(item)));
    });
  }

  protected getQuestionGroup(data: any = {}): Object {
    const text = data.text || '';

    return {
      text: [text, [Validators.required]]
    };
  }

  protected getAnswerGroup(data: any = {}): Object {
    const text = data.text || '';
    const points = data.points || null;

    return {
      text: [text, [Validators.required]],
      points: [points, [Validators.required, Validators.pattern('^[0-9]+$')]]
    };
  }
}
