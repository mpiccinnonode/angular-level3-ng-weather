import { FormControl } from '@angular/forms';

export interface DurationForm {
    hours: FormControl<number>;
    minutes: FormControl<number>;
    seconds: FormControl<number>;
}
