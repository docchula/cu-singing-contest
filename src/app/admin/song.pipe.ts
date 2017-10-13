import { SelectedSong } from '../shared/selected-song';
import { Pipe, PipeTransform } from '@angular/core';
import { SongPipe as UserSongPipe } from '../shared/song.pipe';

@Pipe({
  name: 'admin_song'
})
export class SongPipe implements PipeTransform {

  transform(value: SelectedSong, args?: any): any {
    if (value.mode === 'standard') {
      return new UserSongPipe().transform(value.song);
    } else {
      return 'ผู้เข้าแข่งขันเตรียมเพลงเอง';
    }
  }

}
