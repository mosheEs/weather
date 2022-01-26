import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullWeatherData} from "../../../../core/models/weather-data";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() weatherData!: FullWeatherData;

  @Input() isFavorite: boolean = false;

  @Output() favoriteToggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleFavorite() {
    this.favoriteToggled.emit(!this.isFavorite);
  }

}
