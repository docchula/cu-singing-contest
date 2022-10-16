import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { ModeGuard } from './mode.guard';
import {CoreModule} from './core/core.module';

describe('ModeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [ModeGuard]
    });
  });

  it('should ...', inject([ModeGuard], (guard: ModeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
