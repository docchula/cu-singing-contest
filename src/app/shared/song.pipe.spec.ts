import { SongPipe } from './song.pipe';

describe('SongPipe', () => {
  it('create an instance', () => {
    const pipeTH = new SongPipe('th');
    expect(pipeTH).toBeTruthy();
  });
});
