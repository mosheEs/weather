import { TestBed } from '@angular/core/testing';

import { AccuWeatherApiService } from './accu-weather-api.service';

describe('AccuWeatherApiService', () => {
  let service: AccuWeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccuWeatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
