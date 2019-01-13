import { ValidatorFn, AbstractControl } from '@angular/forms';

export function RfcEmailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const pattern = [
      '^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$'].join('');
    const regex = new RegExp(pattern);

    if (control.value) {
      return  regex.test(control.value) ? null : {'rfc-email': {value: control.value}};
    }

    return null;
  };
}
