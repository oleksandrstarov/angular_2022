import { TestBed } from '@angular/core/testing';

import { DayForecastService } from './day-forecast.service';

describe('DayForecastService', () => {
  let service: DayForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
