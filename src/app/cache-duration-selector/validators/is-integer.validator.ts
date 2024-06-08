import { AbstractControl, ValidatorFn } from '@angular/forms';

export const isIntegerValidator: ValidatorFn = (control: AbstractControl<number>) => {
    if (control.value) {
        return Number.isInteger(control.value)
            ? null
            : {
                  notInteger: true,
              };
    } else {
        return null;
    }
};
