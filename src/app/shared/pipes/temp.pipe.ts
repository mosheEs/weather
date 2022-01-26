import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'temp',
})
export class TempPipe implements PipeTransform {

  constructor() {
  }

  transform(value: number): string {
    return value + '°';
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
