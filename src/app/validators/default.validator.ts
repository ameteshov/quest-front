import { ValidatorFn, AbstractControl } from '@angular/forms';

export function defaultValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (typeof control.value === 'undefined' || +control.value === 0 || control.value === 'default') {
      return {'default': {value: control.value}};
    }

    return null;
  };
}
