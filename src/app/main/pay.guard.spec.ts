import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PayGuard } from './pay.guard';
import {CoreModule} from '../core/core.module';

describe('PayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [PayGuard]
    });
  });

  it('should ...', inject([PayGuard], (guard: PayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
