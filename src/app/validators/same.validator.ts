import { ValidatorFn, AbstractControl } from '@angular/forms';

export function sameValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.parent && control.parent.controls[controlName].value !== control.value) {
      return {'same': {value: control.value}};
    }

    return null;
  };
}
