import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherPageRoutingModule } from './weather-page-routing.module';
import { SearchPlaceComponent } from './components/search-place/search-place.component';
import { WeatherPageComponent } from './weather-page.component';
import {SharedModule} from "../../shared/shared.module";
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { DailyTempCardComponent } from './components/daily-temp-card/daily-temp-card.component';


@NgModule({
  declarations: [
    WeatherPageComponent,
    SearchPlaceComponent,
    WeatherCardComponent,
    DailyTempCardComponent,
  ],
  imports: [
    CommonModule,
    WeatherPageRoutingModule,
    SharedModule,
  ]
})
export class WeatherPageModule { }
