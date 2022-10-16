import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { DayGuard } from './day.guard';
import {CoreModule} from '../core/core.module';

describe('DayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [DayGuard]
    });
  });

  it('should ...', inject([DayGuard], (guard: DayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
