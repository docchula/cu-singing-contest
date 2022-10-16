import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { Song } from './song';

@Pipe({
  name: 'song'
})
export class SongPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private localeId: string) { }

  transform(value: Song, args?: any): any {
    if ((value as Object)?.hasOwnProperty('name')) {
      return `${value.artist} - ${value.name}`;
    } else {
      if (this.localeId === 'th') {
        return 'ยังไม่ได้เลือกเพลง';
      } else if (this.localeId === 'en') {
        return 'No song selected';
      }
    }
  }

}
