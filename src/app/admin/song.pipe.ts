import { SelectedSong } from '../shared/selected-song';
import { Pipe, PipeTransform } from '@angular/core';
import { SongPipe as UserSongPipe } from '../shared/song.pipe';
import { SongModePipe } from '../shared/song-mode.pipe';

@Pipe({
  name: 'admin_song'
})
export class SongPipe implements PipeTransform {

  transform(value: SelectedSong, args?: any): any {
    if (value) {
      return new SongModePipe().transform(value.mode)
        + ': '
        + new UserSongPipe('th').transform(value.song)
        + ((value.song as Object).hasOwnProperty('instrument') ? ` (${value.song.instrument})` : '');
    } else {
      return 'ยังไม่ได้เลือกเพลง';
    }
  }

}
