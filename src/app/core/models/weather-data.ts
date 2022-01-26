import {AW_Current, AW_Forecast, AW_LocationData} from "../http/AccuWeather/models/accuWeatherModels";

export interface DailyTemp {
  date: number;
  minTemp: number;
  maxTemp: number;
}

export class WeatherData {

  readonly locationKey: string;
  readonly locationName: string;

  readonly current: {
    temp: number;
    text: string;
    icon: number;
  };

  link: string;
  mobileLink: string;

  constructor(
    location: AW_LocationData,
    current: AW_Current,
  ) {
    this.locationKey = location.Key;
    this.locationName = location.LocalizedName;
    this.current = {
      temp: current.Temperature.Metric.Value,
      text: current.WeatherText,
      icon: current.WeatherIcon,
    } as const;
    this.link = current.Link;
    this.mobileLink = current.MobileLink;
  }

}

export class FullWeatherData extends WeatherData {

  readonly forecast: DailyTemp[];

  constructor(
    location: AW_LocationData,
    current: AW_Current,
    forecast: AW_Forecast,
  ) {
    super(location, current);
    this.forecast = forecast.DailyForecasts.map(day => ({
      date: day.EpochDate * 1000,
      minTemp: day.Temperature.Minimum.Value,
      maxTemp: day.Temperature.Maximum.Value,
    }) as const);
  }

}
