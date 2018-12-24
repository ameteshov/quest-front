import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questApiService: QuestionnaireApiService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      content: this.fb.array([
        this.fb.group(this.getQuestionGroup())
      ])
    });
  }

  ngOnInit() {}

  public get content(): FormArray {
    return this.form.get('content') as FormArray;
  }

  public addQuestion(): void {
    this.content.push(this.fb.group(this.getQuestionGroup()));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.questApiService
        .create(this.form.value)
        .subscribe((response) => { console.log(response); });
    } else {
      console.log(this.form);
    }
  }

  public onRemoveQuestion(index: number): void {
    this.content.removeAt(index);
  }

  protected getQuestionGroup(): Object {
    return {
      text: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      tip: ['']
    };
  }
}
