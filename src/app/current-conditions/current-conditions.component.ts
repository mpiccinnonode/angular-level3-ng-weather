import { Component, inject, Signal } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';
import { TabRemovedEvent } from '../shared/tab-view/models/tab-removed-event.model';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent {
    private weatherService = inject(WeatherService);
    private router = inject(Router);
    protected locationService = inject(LocationService);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode]);
    }

    removeLocationTab(event: TabRemovedEvent): void {
        const { removedIndex } = event;
        const location = this.currentConditionsByZip()[removedIndex];
        this._removeLocation(location.zip);
    }

    private _removeLocation(zipcode: string): void {
        this.locationService.removeLocation(zipcode);
        this.weatherService.removeCurrentConditions(zipcode);
    }
}
