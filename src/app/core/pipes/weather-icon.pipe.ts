import { Pipe, PipeTransform } from "@angular/core";
import { WeatherService } from "../../weather.service";

@Pipe({
  name: "weatherIcon",
  standalone: true,
})
export class WeatherIconPipe implements PipeTransform {
  constructor(private weatherService: WeatherService) {}

  transform(id: number): string {
    return this.weatherService.getWeatherIcon(id);
  }
}
