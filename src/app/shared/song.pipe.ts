import { Pipe, PipeTransform } from '@angular/core';

import { Song } from './song';

@Pipe({
  name: 'song'
})
export class SongPipe implements PipeTransform {

  transform(value: Song, args?: any): any {
    if ((value as Object).hasOwnProperty('name')) {
      return `${value.artist} - ${value.name}`;
    } else {
      return 'ยังไม่ได้เลือกเพลง';
    }
  }

}
