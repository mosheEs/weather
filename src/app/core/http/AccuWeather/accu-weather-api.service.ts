import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {AW_Current, AW_LocationData, AW_Forecast} from "./models/accuWeatherModels";

@Injectable({
  providedIn: 'root'
})
export class AccuWeatherApiService {

  private readonly DOAMIN = 'http://dataservice.accuweather.com';

  private readonly MOCK_PATH = './assets/mocks/accuWeatherApi';

  private readonly API_KEY = 'kOCZvsbUrY12IBGGc2GnAAbxb4VeKarN';

  /**
   * Whether to use mock responses instead of live API calls
   * @private
   */
  private readonly useMock: boolean = true;  // <-- CHANGE THIS

  private get isMock() {
    // Make sure not to use mock in production
    return this.useMock && isDevMode();
  }

  /**
   * A collection of locations' data, to reduce unnecessary API calls
   * @private
   */
  private locationsMap = new Map<string, AW_LocationData>();

  constructor(
    private http: HttpClient,
  ) {
    // Show mock confirmation alert
    if (this.useMock) {
      this.useMock = !confirm('Using mock!\nDo you want to switch to live API?');
    }
  }

  /**
   * Find the nearest location according to the given coords.
   * Save the response in the collection
   * @param lat
   * @param lng
   */
  findLocationByCoords(lat: number, lng: number): Observable<string> {
    const url = this.isMock
      ? `${this.MOCK_PATH}/findLocation.json`
      : `${this.DOAMIN}/locations/v1/cities/geoposition/search`;
    const q = `${lat},${lng}`;
    const params = this.setParams().set('q', q);
    return this.http.get<AW_LocationData>(url, {params}).pipe(
      map(resp => {
        this.addLocationData(resp);
        return resp.Key;
      })
    );
  }

  /**
   * Call location auto complete request.
   * Save all responses in the collection
   * @param q
   */
  locationAutoComplete(q: string): Observable<AW_LocationData[]> {
    const url = this.isMock
      ? `${this.MOCK_PATH}/autoComplete.json`
      : `${this.DOAMIN}/locations/v1/cities/autocomplete`;
    const params = this.setParams().set('q', q);
    return this.http.get<AW_LocationData[]>(url, {params}).pipe(
      tap(r => r.forEach(loc => this.addLocationData(loc)))
    );
  }

  /**
   * Get location data by key. If the data is not already exist in the collection, get it from the API (and add it to the collection)
   * @param locationKey
   */
  getLocationData(locationKey: string): Observable<AW_LocationData> {
    const data = this.locationsMap.get(locationKey);
    if (data) {
      return of(data);
    }
    const url = this.isMock
      ? `${this.MOCK_PATH}/findLocation.json`
      : `${this.DOAMIN}/locations/v1/${locationKey}`;
    const params = this.setParams();
    return this.http.get<AW_LocationData>(url, {params}).pipe(
      tap(r => this.addLocationData(r))
    );
  }

  /**
   * Call current weather request for the given location
   * @param locationKey
   */
  currentWeather(locationKey: string): Observable<AW_Current> {
    const url = this.isMock
      ? `${this.MOCK_PATH}/currentWeather.json`
      : `${this.DOAMIN}/currentconditions/v1/${locationKey}`;
    const params = this.setParams();
    return this.http.get<[AW_Current]>(url, {params}).pipe(
      map(r => r[0])
    );
  }

  /**
   * Call 5 days forecast request for the given location
   * @param locationKey
   */
  forecast(locationKey: string): Observable<AW_Forecast> {
    const url = this.isMock
      ? `${this.MOCK_PATH}/forecast.json`
      : `${this.DOAMIN}/forecasts/v1/daily/5day/${locationKey}`;
    const params = this.setParams().set('metric', true);
    return this.http.get<AW_Forecast>(url, {params});
  }

  /**
   * Create query params object with the API key.
   * (For mock - override the "toString" method to ignore the params)
   * @private
   */
  private setParams(): HttpParams {
    const httpParams = new HttpParams();
    if (this.isMock) {
      httpParams.toString = () => '';
    }
    return httpParams
      .set('apikey', this.API_KEY);
  }

  /**
   * Add location data to the collection
   * @param data
   * @private
   */
  private addLocationData(data: AW_LocationData) {
    this.locationsMap.set(data.Key, data);
  }

}
