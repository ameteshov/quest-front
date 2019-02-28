import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent implements OnInit {
  public sendForm: FormGroup;
  public formsList: Array<IQuestionnaire>;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireApiService
  ) {
    this.formsList = [];

    this.sendForm = this.fb.group({
      questionnaire_id: ['', [Validators.required]],
      list: this.fb.array([
        this.fb.group(this.getListGroup())
      ])
    });
  }

  ngOnInit() {
    this.questionnaireService
      .search({'all': true})
      .subscribe((response: IApiResponse) => {
        this.formsList = response.data;
      });
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
      .send(this.sendForm.controls.questionnaire_id.value, this.sendForm.controls.list.value)
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
