import {Component, Input, OnInit} from '@angular/core';
import {WeatherData} from "../../../../core/models/weather-data";

@Component({
  selector: 'app-weather-summery-card',
  templateUrl: './weather-summery-card.component.html',
  styleUrls: ['./weather-summery-card.component.scss']
})
export class WeatherSummeryCardComponent implements OnInit {

  @Input() weatherData!: WeatherData | null;

  constructor() { }

  ngOnInit(): void {
  }

}
