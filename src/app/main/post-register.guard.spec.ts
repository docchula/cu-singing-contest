import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostRegisterGuard } from './post-register.guard';
import {CoreModule} from '../core/core.module';

describe('PostRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [PostRegisterGuard]
    });
  });

  it('should ...', inject([PostRegisterGuard], (guard: PostRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
