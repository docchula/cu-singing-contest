import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostPayGuard } from './post-pay.guard';

describe('PostPayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostPayGuard]
    });
  });

  it('should ...', inject([PostPayGuard], (guard: PostPayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
