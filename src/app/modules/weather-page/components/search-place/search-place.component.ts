import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AccuWeatherApiService} from "../../../../core/http/AccuWeather/accu-weather-api.service";
import {debounceTime, map, Observable, switchMap} from "rxjs";
import {AW_LocationData} from "../../../../core/http/AccuWeather/models/accuWeatherModels";

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss']
})
export class SearchPlaceComponent implements OnInit {

  /**
   * Emits when a place is being selected from the list
   */
  @Output() placeSelected = new EventEmitter<string>();

  /**
   * The form which connected to the text input
   */
  searchForm = new FormControl();

  private results?: AW_LocationData[];

  /**
   * Get the corresponded places according to the input, with debounce
   */
  filteredOptions$: Observable<string[]> = this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    switchMap(value => this.accuWeatherApi.locationAutoComplete(value)),
    map(values => {
      this.results = values;
      return values.map(v => v.LocalizedName)
    })
  );

  constructor(
    private accuWeatherApi: AccuWeatherApiService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Emit the key of the selected place name
   * @param name
   */
  selectPlace(name: string) {
    const place = this.results?.find(place => place.LocalizedName === name);
    if (place) {
      this.placeSelected.emit(place.Key);
    }
  }

}
