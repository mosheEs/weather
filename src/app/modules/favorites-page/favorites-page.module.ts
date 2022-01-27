import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FavoritesPageRoutingModule} from './favorites-page-routing.module';
import {FavoritesPageComponent} from './favorites-page.component';
import {WeatherSummeryCardComponent} from './components/weather-summery-card/weather-summery-card.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    FavoritesPageComponent,
    WeatherSummeryCardComponent
  ],
  imports: [
    CommonModule,
    FavoritesPageRoutingModule,
    SharedModule
  ]
})
export class FavoritesPageModule {
}
