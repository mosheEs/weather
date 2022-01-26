import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TemperatureUnit} from "../models/temperature";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private _tempUnit = new BehaviorSubject<TemperatureUnit>("C");
  public tempUnit = this._tempUnit.asObservable();

  constructor() { }

  changeTempUnit(unit: TemperatureUnit) {
    this._tempUnit.next(unit);
  }

}
