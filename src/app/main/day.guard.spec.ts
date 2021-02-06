import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { DayGuard } from './day.guard';

describe('DayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayGuard]
    });
  });

  it('should ...', inject([DayGuard], (guard: DayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
