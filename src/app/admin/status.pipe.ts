import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return 'ตรวจสอบแล้ว';
    } else {
      return 'ยังไม่ได้ตรวจสอบ';
    }
  }

}
