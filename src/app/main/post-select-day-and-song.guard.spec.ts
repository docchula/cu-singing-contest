import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PostSelectDayAndSongGuard } from './post-select-day-and-song.guard';

describe('PostSelectDayAndSongGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostSelectDayAndSongGuard]
    });
  });

  it('should ...', inject([PostSelectDayAndSongGuard], (guard: PostSelectDayAndSongGuard) => {
    expect(guard).toBeTruthy();
  }));
});
