import {Component, Input, OnInit} from '@angular/core';
import {DailyTemp} from "../../../../core/models/weather-data";

@Component({
  selector: 'app-daily-temp-card',
  templateUrl: './daily-temp-card.component.html',
  styleUrls: ['./daily-temp-card.component.scss']
})
export class DailyTempCardComponent implements OnInit {

  @Input() dailyTemp!: DailyTemp;

  constructor() { }

  ngOnInit(): void {
  }

}
