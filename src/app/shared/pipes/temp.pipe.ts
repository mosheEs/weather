import {Pipe, PipeTransform} from '@angular/core';
import {UserSettingsService} from "../../core/services/user-settings.service";
import {formatNumber} from "@angular/common";
import {TemperatureUnit} from "../../core/models/temperature";

/**
 * An impure pipe that shows the temperature according to the unit of the user's settings.
 * The input value should be given in celsius
 */
@Pipe({
  name: 'temp',
  pure: false,
})
export class TempPipe implements PipeTransform {

  private lastValue?: number;
  private lastUnit?: TemperatureUnit;
  private lastString: string = '';

  constructor(private userSettings: UserSettingsService) {
  }

  transform(celsiusValue: number): string {
    const unit = this.userSettings.tempUnit;
    // Make a new calc only if the value or the unit have been changed (*Because the pipe is impure)
    if (celsiusValue !== this.lastValue || unit !== this.lastUnit) {
      const value = unit === "F"
        ? this.toFahrenheit(celsiusValue)
        : celsiusValue;
      this.lastValue = celsiusValue;
      this.lastUnit = unit;
      this.lastString = `${formatNumber(value, 'en-US', '1.0-0')}°${unit}`;
    }
    return this.lastString;
  }

  /**
   * Convert Celsius to Fahrenheit
   * @param celsius
   * @private
   */
  private toFahrenheit(celsius: number): number {
    return celsius * 1.8 + 32;
  }

}
