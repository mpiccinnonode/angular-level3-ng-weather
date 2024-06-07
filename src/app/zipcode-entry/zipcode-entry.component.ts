import { Component } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {
    zipcode: string;
    constructor(private locationService: LocationService) {}

    addLocation() {
        this.locationService.addLocation(this.zipcode);
    }
}
