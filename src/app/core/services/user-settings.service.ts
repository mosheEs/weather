import {Injectable} from '@angular/core';
import {TemperatureUnit} from "../models/temperature";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private readonly LS_TEMP_UNIT = 'tempUnit';

  private _tempUnit = localStorage.getItem(this.LS_TEMP_UNIT);

  get tempUnit(): TemperatureUnit {
    return this._tempUnit === "F" ? "F" : "C";
  }

  set tempUnit(unit: TemperatureUnit) {
    this._tempUnit = unit;
    localStorage.setItem(this.LS_TEMP_UNIT, unit);
  }

  constructor() { }

}
