import {Injectable, Signal, signal} from '@angular/core';
import { WeatherService } from "./weather.service";
import {BehaviorSubject, Observable} from 'rxjs';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  // refactoring locations into a signal to allow reactive updates notifications
  private _locations = signal<string[]>(this._initLocations());

  // allows readonly access to locations signal
  get locations(): Signal<string[]> {
    return this._locations.asReadonly();
  }

  addLocation(zipcode: string): void {
    this._locations.update((value) => {
      value.push(zipcode);
      return value;
    });
    this._cacheLocations();
  }

  removeLocation(zipcode: string): void {
    this._locations.update((value) => {
      const index = value.indexOf(zipcode);
      if (index !== -1) {
        value.splice(index, 1);
      }
      return value;
    });
    this._cacheLocations();
  }

  private _initLocations(): string[] {
    let locString = localStorage.getItem(LOCATIONS);
    return locString ? JSON.parse(locString) : [];
  }

  private _cacheLocations(): void {
    localStorage.setItem(LOCATIONS, JSON.stringify(this._locations()));
  }
}
