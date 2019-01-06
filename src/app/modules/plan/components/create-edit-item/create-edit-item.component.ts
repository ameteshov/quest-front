import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IPlan } from '../../../../interfaces/IPlan';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanApiService } from '../../../../services/plan-api.service';
import { filter, switchMap } from 'rxjs/operators';
import { Plan } from '../../../../models/Plan';
import { environment } from '../../../../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-edit-item',
  templateUrl: './create-edit-item.component.html',
  styleUrls: ['./create-edit-item.component.css']
})
export class CreateEditItemComponent implements OnInit {
  public form: FormGroup;
  public plan: IPlan;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private planService: PlanApiService
  ) {
    this.plan = new Plan({});

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      points: ['', [Validators.required]],
      is_active: ['', [Validators.required]],
      description: this.fb.array(this.getDescription())
    });
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(
        filter((params) => {
          return params.id;
        }),
        switchMap((params) => {
          return this.planService.read(params.id);
        })
      )
      .subscribe((response) => this.fillForm(response));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      let req = new Observable<HttpResponse<any>>();

      if (this.plan.id) {
        req = this.planService
          .update(this.plan.id, this.form.value);
      } else {
        req = this.planService
          .create(this.form.value);
      }

      req.subscribe(() => {
        swal('Plan', 'Plan was successfully saved', 'success')
          .then(() => { this.router.navigate(['plans']); });
      });
    }
  }

  public onCancel(): void {
    this.router.navigate(['plans']);
  }

  public get description(): FormArray {
    return this.form.get('description') as FormArray;
  }

  protected fillForm(data: IPlan): void {
    this.plan = new Plan(data);

    this.form.controls.name.patchValue(this.plan.name);
    this.form.controls.price.patchValue(this.plan.price);
    this.form.controls.points.patchValue(this.plan.points);
    this.form.controls.is_active.patchValue(this.plan.is_active);

    for (let i = 0; i < environment.planDescriptionLength; i++) {
      const control = this.description.controls[i] as FormGroup;

      control.controls.text.patchValue(this.plan.description[i].text);
    }
  }

  protected getDescription(): Array<FormGroup> {
    const result = [];

    for (let i = 0; i < environment.planDescriptionLength; i++) {
      result.push(this.fb.group({
        text: ['', [Validators.required]]
      }));
    }

    return result;
  }

}
