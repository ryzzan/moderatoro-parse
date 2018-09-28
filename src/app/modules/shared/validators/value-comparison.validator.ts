import {
  AbstractControl
} from '@angular/forms';

export function ValidateValueComparison(controlToCompare: AbstractControl, errorMessage: string) {
  let flagFirst = true;
  return (control: AbstractControl) => {
    if (flagFirst) {
        flagFirst = false;
        controlToCompare.valueChanges.subscribe(res => {
            control.patchValue(control.value);
        });
    }
    if (control.value !== controlToCompare.value) {
      return {
        validate: false,
        message: errorMessage
      };
    }
    return null;
  };
}
