import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from '../core/services/cache.service';
import { DurationForm } from './models/duration-form.model';

@Component({
    selector: 'app-cache-duration-selector',
    standalone: true,
    imports: [],
    templateUrl: './cache-duration-selector.component.html',
    styleUrl: './cache-duration-selector.component.css',
})
export class CacheDurationSelectorComponent {
    durationForm: FormGroup<DurationForm>;

    constructor(
        private fb: FormBuilder,
        private cacheService: CacheService,
    ) {}

    private _initForm(): void {
        this.durationForm = this.fb.group<DurationForm>({
            hours: this.fb.control<number>(undefined, [Validators.min(0)]),
            minutes: this.fb.control<number>(undefined, [Validators.min(0)]),
            seconds: this.fb.control<number>(undefined, [Validators.min(0)]),
        });
    }
}
