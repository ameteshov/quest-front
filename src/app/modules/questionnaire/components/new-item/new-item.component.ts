import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private questApiService: QuestionnaireApiService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      questions: this.fb.array([
        this.fb.group(this.getQuestionGroup())
      ]),
      answers: this.fb.array([
        this.fb.group(this.getAnswerGroup())
      ])
    });
  }

  ngOnInit() {}

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
      this.questApiService
        .create({
          name: this.form.controls.name.value,
          content: {
            questions: this.form.controls.questions.value,
            answers: this.form.controls.answers.value
          }
        })
        .subscribe((response) => {
          swal('Success', 'Questionnaire saved successfully', 'success');

          this.router.navigate(['questionnaires']);
        });
    }
  }

  public onRemoveQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  public onRemoveAnswer(index: number): void {
    this.answers.removeAt(index);
  }

  protected getQuestionGroup(): Object {
    return {
      text: ['', [Validators.required]]
    };
  }

  protected getAnswerGroup(): Object {
    return {
      text: ['', [Validators.required]],
      points: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    };
  }
}
