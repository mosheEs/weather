import { Component, OnInit } from '@angular/core';
import {FavoritesService} from "../../core/services/favorites.service";
import {Observable, switchMap, combineLatest, map, catchError, of} from "rxjs";
import {WeatherData} from "../../core/models/weather-data";
import {AccuWeatherApiService} from "../../core/http/AccuWeather/accu-weather-api.service";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  /**
   * The weather data of each favorite
   */
  favorites$: Observable<(WeatherData | null)[]> = this.favoritesService.favorites$.pipe(
    switchMap(keys => {
      const allWeathers = keys.map(k => this.getWeatherData(k));
      return combineLatest(allWeathers);
    })
  );

  constructor(
    private favoritesService: FavoritesService,
    private accuWeatherApi: AccuWeatherApiService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Get an observable of the current weather data by key. Null value for error
   * @param key
   * @private
   */
  private getWeatherData(key: string): Observable<WeatherData | null> {
    return combineLatest([
      this.accuWeatherApi.getLocationData(key),
      this.accuWeatherApi.currentWeather(key),
    ]).pipe(
      map(args => new WeatherData(...args)),
      catchError((e) => {
        console.error(e);
        return of(null);
      })
    );
  }

}
