import { TestBed, async, inject } from '@angular/core/testing';

import { AcceptGuard } from './accept.guard';

describe('AcceptGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcceptGuard]
    });
  });

  it('should ...', inject([AcceptGuard], (guard: AcceptGuard) => {
    expect(guard).toBeTruthy();
  }));
});
