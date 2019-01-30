import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export function requiredWithValidator(withControlName: string, withValue: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.parent && control.parent.controls[withControlName].value === withValue) {
      if (typeof control.value === 'undefined' || control.value === null || control.value === '') {
        return {'required_with': { value: withControlName }};
      } else {
        return null;
      }
    }

    return null;
  };
}
