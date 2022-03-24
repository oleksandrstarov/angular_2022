import { TestBed } from '@angular/core/testing';

import { DayTimeService } from './day-time.service';

describe('DayTimeService', () => {
  let service: DayTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
