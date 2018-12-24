import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
}
