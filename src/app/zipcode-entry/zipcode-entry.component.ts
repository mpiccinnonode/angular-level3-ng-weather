import { Component, computed } from '@angular/core';
import { LocationService } from '../location.service';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {
    zipcode: string;

    loadingRequest = computed<boolean>(() => this.weatherService.loadingRequest());
    errors = computed<string[]>(() => this.weatherService.zipCodesErrorsMsg());

    constructor(
        private locationService: LocationService,
        private weatherService: WeatherService,
    ) {}

    addLocation() {
        this.locationService.addLocation(this.zipcode);
    }
}
