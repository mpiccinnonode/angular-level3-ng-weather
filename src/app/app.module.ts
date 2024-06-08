import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { WeatherIconPipe } from './core/pipes/weather-icon.pipe';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TabItemComponent } from './shared/tab-view/tab-item/tab-item.component';
import { TabViewComponent } from './shared/tab-view/tab-view.component';
import { WeatherService } from './weather.service';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { cacheInterceptor } from './core/http/cache.interceptor';
import { CacheDurationSelectorComponent } from './cache-duration-selector/cache-duration-selector.component';

@NgModule({
    declarations: [AppComponent, ZipcodeEntryComponent, ForecastsListComponent, CurrentConditionsComponent, MainPageComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production,
        }),
        WeatherIconPipe,
        TabViewComponent,
        TabItemComponent,
        CacheDurationSelectorComponent,
    ],
    providers: [WeatherService, provideHttpClient(withInterceptors([cacheInterceptor]))],
    bootstrap: [AppComponent],
})
export class AppModule {}
