import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Questionnaire } from '../../../../models/Questionnaire';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  public sendForm: FormGroup;
  public survey: IQuestionnaire;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireApiService
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
      this.questionnaireService
      .send(this.survey.id, this.sendForm.controls.list.value)
      .subscribe((response: IApiResponse) => {
        swal('success', 'Form was sent successfully', 'success')
        .then(() => {
          this.sendForm.reset();
        });
      }, (error) => {
        swal('error', 'Please check data', 'error');
      });
    }
  }

  public get list(): FormArray {
    return this.sendForm.get('list') as FormArray;
  }

  protected getListGroup(): Object {
    return {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    };
  }

}
