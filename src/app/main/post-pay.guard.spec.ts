import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostPayGuard } from './post-pay.guard';
import {CoreModule} from '../core/core.module';

describe('PostPayGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [PostPayGuard]
    });
  });

  it('should ...', inject([PostPayGuard], (guard: PostPayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
