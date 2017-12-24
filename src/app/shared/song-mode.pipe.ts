import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songMode'
})
export class SongModePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value === 'standard') {
      return 'ฺBacking track ของคณะกรรมการ';
    } else if (value === 'custom') {
      return 'Backing track ของผู้เข้าแข่งขัน';
    } else if (value === 'live') {
      return 'เล่นดนตรีสด';
    } else {
      return 'เกิดข้อผิดพลาด';
    }
  }

}
