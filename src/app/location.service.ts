import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const LOCATIONS: string = 'locations';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    // refactoring locations into an Observable to allow reactive updates notifications
    private _locationsSubject = new BehaviorSubject<string[]>(this._initLocations());
    locations$ = this._locationsSubject.asObservable();

    get locations(): string[] {
        return this._locationsSubject.value;
    }

    set locations(value: string[]) {
        this._locationsSubject.next(value);
    }

    addLocation(zipcode: string): void {
        const current = [...this.locations];
        current.push(zipcode);
        this.locations = [...current];
        this._cacheLocations();
    }

    removeLocation(zipcode: string): void {
        const current = [...this.locations];
        const index = current.indexOf(zipcode);
        if (index !== -1) {
            current.splice(index, 1);
        }
        this.locations = [...current];
        this._cacheLocations();
    }

    private _initLocations(): string[] {
        let locString = localStorage.getItem(LOCATIONS);
        return locString ? JSON.parse(locString) : [];
    }

    private _cacheLocations(): void {
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    }
}
