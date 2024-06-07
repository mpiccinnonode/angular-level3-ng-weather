import { Injectable, Signal, signal } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { Forecast } from './forecasts-list/forecast.type';

@Injectable()
export class WeatherService {
    static URL = 'https://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
    private currentConditions = signal<ConditionsAndZip[]>([]);

    constructor(private http: HttpClient) {}

    /**
     * Syncs the currentConditions signal with the received locations array
     * @param locations
     */
    syncConditions(locations: string[]): void {
        let conditions = this.currentConditions();
        // removes deleted locations from conditions array
        conditions = conditions.filter(({ zip }) => locations.includes(zip));
        this.currentConditions.set(conditions);
        /**
         * gets locations not included in conditions array
         */
        const locationsToFetch = locations.filter((item) => !conditions.some(({ zip }) => item === zip));
        /**
         * fetches data for missing locations
         */
        this._fetchLocations(locationsToFetch);
    }

    getCurrentConditions(): Signal<ConditionsAndZip[]> {
        return this.currentConditions.asReadonly();
    }

    getForecast(zipcode: string): Observable<Forecast> {
        // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
        return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
    }

    getWeatherIcon(id): string {
        if (id >= 200 && id <= 232) {
            return WeatherService.ICON_URL + 'art_storm.png';
        } else if (id >= 501 && id <= 511) {
            return WeatherService.ICON_URL + 'art_rain.png';
        } else if (id === 500 || (id >= 520 && id <= 531)) {
            return WeatherService.ICON_URL + 'art_light_rain.png';
        } else if (id >= 600 && id <= 622) {
            return WeatherService.ICON_URL + 'art_snow.png';
        } else if (id >= 801 && id <= 804) {
            return WeatherService.ICON_URL + 'art_clouds.png';
        } else if (id === 741 || id === 761) {
            return WeatherService.ICON_URL + 'art_fog.png';
        } else {
            return WeatherService.ICON_URL + 'art_clear.png';
        }
    }

    private _fetchLocations(locationsToFetch: string[]): void {
        const zipCodesAndData: ConditionsAndZip[] = [];
        const apiCalls = locationsToFetch.map((zipcode) => {
            return this._addCurrentConditions(zipcode).pipe(
                tap((data) => {
                    zipCodesAndData.push({ zip: zipcode, data });
                }),
            );
        });
        if (apiCalls.length) {
            forkJoin(apiCalls).subscribe(() => {
                /**
                 * updates conditions signal with received data
                 */
                this.currentConditions.update((value) => [...value, ...zipCodesAndData]);
            });
        }
    }

    private _addCurrentConditions(zipcode: string): Observable<CurrentConditions> {
        // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
        return this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`);
    }
}
