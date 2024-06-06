import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { LocationService } from '../location.service';
import { TabRemovedEvent } from '../shared/tab-view/models/tab-removed-event.model';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent implements OnInit {
    private weatherService = inject(WeatherService);
    private router = inject(Router);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    constructor(
        private locationService: LocationService,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.locationService.locations$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((locations) => {
            this.weatherService.alignConditionsToLocations(locations);
        });
    }

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode]);
    }

    removeLocationTab(event: TabRemovedEvent): void {
        const { removedIndex } = event;
        const location = this.currentConditionsByZip()[removedIndex];
        this.locationService.removeLocation(location.zip);
    }
}
