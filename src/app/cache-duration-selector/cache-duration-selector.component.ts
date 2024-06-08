import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CacheService } from '../core/services/cache.service';
import { DurationForm } from './models/duration-form.model';
import { isIntegerValidator } from './validators/is-integer.validator';
import { NgTemplateOutlet } from '@angular/common';
import { TimeInfo } from '../shared/models/time-info.model';
import { TimeUtils } from '../shared/helpers/time-utils';

@Component({
    selector: 'app-cache-duration-selector',
    standalone: true,
    imports: [ReactiveFormsModule, NgTemplateOutlet],
    templateUrl: './cache-duration-selector.component.html',
    styleUrl: './cache-duration-selector.component.css',
})
export class CacheDurationSelectorComponent implements OnInit {
    durationForm: FormGroup<DurationForm>;

    private _ttlValue = computed<number>(() => this.cacheService.timeToLiveInMillis());

    constructor(
        private fb: FormBuilder,
        private cacheService: CacheService,
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    submitDuration(): void {
        const timeOutput = this.durationForm.value as TimeInfo;
        this.cacheService.setTimeToLive(TimeUtils.timeInfoToMillis(timeOutput));
    }

    private _initForm(): void {
        const validators = [Validators.required, Validators.min(0), isIntegerValidator];
        this.durationForm = this.fb.group<DurationForm>({
            hours: this.fb.control<number>(0, validators),
            minutes: this.fb.control<number>(0, validators),
            seconds: this.fb.control<number>(0, validators),
        });
    }
}
