import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, combineLatest, filter, map, Observable, of, switchMap, tap} from "rxjs";
import {AccuWeatherApiService} from "../../core/http/AccuWeather/accu-weather-api.service";
import {FullWeatherData} from "../../core/models/weather-data";
import {FavoritesService} from "../../core/services/favorites.service";

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit {

  /**
   * Whether to show a not found alert
   */
  notFound: boolean = false;

  /**
   * The current key from the URL
   */
  key: string = '';

  /**
   * The weather data (current & forecast) according to the "key" URL param.
   */
  weather$: Observable<FullWeatherData | null> = this.activatedRoute.params.pipe(
    // Get the key param
    map(params => params['key']),
    // Filter only a valid key. Set as not found if invalid
    filter(key => {
      const isValid = !!+key;
      this.notFound = !isValid;
      return isValid;
    }),
    // Use that key
    tap(key => {
      this.key = key;
      this.isFavorite$ = this.favoritesService.isFavorite(key);
    }),
    // Make API calls (current weather and 5 days forecast) + get the location's data
    switchMap(key => combineLatest([
      this.accuWeatherApi.getLocationData(key),
      this.accuWeatherApi.currentWeather(key),
      this.accuWeatherApi.forecast(key),
    ])),
    // Transform data to app class
    map(args => new FullWeatherData(...args)),
    // On API error - set as not found
    catchError(() => {
      this.notFound = true;
      return of(null);
    })
  );

  /**
   * Weather the current key is in the favorites list
   */
  isFavorite$?: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accuWeatherApi: AccuWeatherApiService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Switch to other place
   * @param key
   */
  redirectToLocation(key: string) {
    return this.router.navigate(['../', key], {relativeTo: this.activatedRoute})
  }

  toggleFavorite(toggle: boolean) {
    if (toggle) {
      this.favoritesService.addFavorite(this.key);
    } else {
      this.favoritesService.removeFavorite(this.key);
    }
  }

}
