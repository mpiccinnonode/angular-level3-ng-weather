import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CacheService } from '../core/services/cache.service';
import { DurationForm } from './models/duration-form.model';
import { isIntegerValidator } from './validators/is-integer.validator';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-cache-duration-selector',
    standalone: true,
    imports: [ReactiveFormsModule, NgTemplateOutlet],
    templateUrl: './cache-duration-selector.component.html',
    styleUrl: './cache-duration-selector.component.css',
})
export class CacheDurationSelectorComponent implements OnInit {
    durationForm: FormGroup<DurationForm>;

    constructor(
        private fb: FormBuilder,
        private cacheService: CacheService,
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.durationForm = this.fb.group<DurationForm>({
            hours: this.fb.control<number>(undefined, [Validators.min(0), isIntegerValidator]),
            minutes: this.fb.control<number>(undefined, [Validators.min(0), isIntegerValidator]),
            seconds: this.fb.control<number>(undefined, [Validators.min(0), isIntegerValidator]),
        });
    }
}
