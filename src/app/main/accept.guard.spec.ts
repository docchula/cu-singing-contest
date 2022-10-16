import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AcceptGuard } from './accept.guard';
import {CoreModule} from '../core/core.module';

describe('AcceptGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [AcceptGuard]
    });
  });

  it('should ...', inject([AcceptGuard], (guard: AcceptGuard) => {
    expect(guard).toBeTruthy();
  }));
});
