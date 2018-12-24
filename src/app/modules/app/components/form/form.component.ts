import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { QuestionnaireApiService } from '../../../../services/questionnaire-api.service';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public qustionnaire: IQuestionnaire;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private questionnarieService: QuestionnaireApiService,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.activeRoute
      .paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.questionnarieService.getByHash(params.get('hash'));
        })
      )
      .subscribe((result: any) => {
        this.qustionnaire = result;
      });
  }

  public onSubmit(): void {}

}
