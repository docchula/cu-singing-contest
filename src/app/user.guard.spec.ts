import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {CoreModule} from './core/core.module';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [UserGuard]
    });
  });

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
