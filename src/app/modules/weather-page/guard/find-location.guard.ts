import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {AccuWeatherApiService} from "../../../core/http/AccuWeather/accu-weather-api.service";
import {AppPage} from "../../../app-routing.module";

/**
 * This guard checks the weather page "key" parameter.
 * If the key does not exist (or invalid), it redirects to the key of the user's location
 */
@Injectable({
  providedIn: 'root'
})
export class FindLocationGuard implements CanActivate {

  constructor(
    private router: Router,
    private accuWeatherApi: AccuWeatherApiService,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    // Check the key parameter - if it is a valid key (non-zero number), continue to the page
    const key = route.params['key'];
    const hasValidKey = !!+key;
    if (hasValidKey) {
      return true;
    }
    try {
      // Otherwise, get other key according to the user's location, and redirect with it
      const newKey = await this.findUserLocationKey();
      return this.router.createUrlTree([AppPage.WEATHER, newKey]);
    } catch {
      // If geolocation failed or key not found, continue to the page without a key
      return true;
    }
  }

  /**
   * Get a promise with the key of the user's current location.
   * The promise will be rejected if the geolocation or the API fails.
   * @private
   */
  private findUserLocationKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(async pos => {
        const req = this.accuWeatherApi.findLocationByCoords(pos.coords.latitude, pos.coords.longitude);
        const key = await lastValueFrom(req);
        resolve(key);
      }, (e) => {
        console.error(e);
        reject();
      });
    });
  }

}
