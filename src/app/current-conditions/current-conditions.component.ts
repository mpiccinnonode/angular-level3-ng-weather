import { Component, inject, OnInit, Signal } from "@angular/core";
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";
import { ConditionsAndZip } from "../conditions-and-zip.type";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  showForecast(zipcode: string) {
    this.router.navigate(["/forecast", zipcode]);
  }

  removeLocation(event: MouseEvent, zipcode: string): void {
    // stopping event propagation to prevent it from triggering navigation
    event.stopPropagation();
    this.locationService.removeLocation(zipcode);
    this.weatherService.removeCurrentConditions(zipcode);
  }
}
