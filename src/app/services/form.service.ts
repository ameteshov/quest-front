import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public inputInvalid(form: FormGroup, control: string): boolean {
    return form.controls[control].invalid && (form.controls[control].dirty || form.controls[control].touched);
  }

  public hasError(form: FormGroup, control: string, error: string): boolean {
    return this.inputInvalid(form, control) && form.controls[control].errors[error];
  }

  public setFormErrors(response: HttpErrorResponse, form: FormGroup, errors: Object): void {
    _.forIn(response.error.errors, (value, key) => {
      if (form.controls[key]) {
        form.controls[key].setErrors({ 'apiError': true });
        errors[key] = value;
      }
    });
  }

  public markInvalid(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsTouched();
    });
  }

  public markArrayInvalid(form: FormArray): void {
    form.controls.forEach((elem) => {
      this.markInvalid(elem as FormGroup);
    });
  }

  public createRichMessage(response: HttpErrorResponse): string {
    let messages = [];

    _.each(response.error.errors, (value) => {
      messages = [...messages, ...value];
    });

    return messages.join('\n');
  }
}
