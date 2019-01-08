import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { Questionnaire } from '../../../../models/Questionnaire';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public form: FormGroup;
  public survey: IQuestionnaire;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questApiService: QuestionnaireApiService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      success_score: ['', [Validators.required]],
      type: ['sum', [Validators.required]],
      questions: this.fb.array([
        this.fb.group(this.getQuestionGroup())
      ]),
      answers: this.fb.array([
        this.fb.group(this.getAnswerGroup())
      ])
    });

    this.survey = new Questionnaire({});
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
      type: this.form.controls.type.value,
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
    this.form.controls.type.patchValue(this.survey.type);
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
