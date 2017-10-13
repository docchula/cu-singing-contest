import { TestBed, async, inject } from '@angular/core/testing';

import { ModeGuard } from './mode.guard';

describe('ModeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeGuard]
    });
  });

  it('should ...', inject([ModeGuard], (guard: ModeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
