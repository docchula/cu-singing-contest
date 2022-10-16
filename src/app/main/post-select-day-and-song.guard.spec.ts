import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostSelectDayAndSongGuard } from './post-select-day-and-song.guard';
import {CoreModule} from '../core/core.module';

describe('PostSelectDayAndSongGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [PostSelectDayAndSongGuard]
    });
  });

  it('should ...', inject([PostSelectDayAndSongGuard], (guard: PostSelectDayAndSongGuard) => {
    expect(guard).toBeTruthy();
  }));
});
