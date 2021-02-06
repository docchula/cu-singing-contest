import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostRegisterGuard } from './post-register.guard';

describe('PostRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostRegisterGuard]
    });
  });

  it('should ...', inject([PostRegisterGuard], (guard: PostRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
