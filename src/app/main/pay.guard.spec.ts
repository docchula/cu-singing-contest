import { TestBed, async, inject } from '@angular/core/testing';

import { PayGuard } from './pay.guard';

describe('PayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayGuard]
    });
  });

  it('should ...', inject([PayGuard], (guard: PayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
