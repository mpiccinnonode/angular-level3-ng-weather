import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validator that checks if a number-type control's value is an integer
 * @param control
 */
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
