import { Component } from '@angular/core';
import { LocationService } from './location.service';
import { WeatherService } from './weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(
        private locationService: LocationService,
        private weatherService: WeatherService,
    ) {
        this.locationService.locations().forEach((zipCode) => {
            this.weatherService.addCurrentConditions(zipCode);
        });
    }
}
