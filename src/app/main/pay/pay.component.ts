import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'cusc-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  slipUrl$: Observable<string>;
  slipStatus$: Observable<string>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.slipUrl$ = this.userService
      .getUserObjectSnapshot<string>(
        'slipUrl'
      )
      .pipe(
        map(v => {
          if (v.payload.exists()) {
            return v.payload.val();
          } else {
            return null;
          }
        })
      );
    this.slipStatus$ = this.userService
      .getUserObjectSnapshot<boolean>(
        'slipChecked'
      )
      .pipe(
        map(v => {
          if (v.payload.exists()) {
            return v.payload.val();
          } else {
            return null;
          }
        })
      );
  }

  selectedFile(input: any) {
    const maxSize = 500 * 1024;
    if (input.files && input.files[0]) {
      const file = input.files[0] as File;
      if (file.size > maxSize) {
        alert(`กรุณาอัพโหลดไฟล์ที่มีขนาดต่ำกว่า ${maxSize / 1024} กิโลไบต์`);
        input.value = '';
      } else {
        this.userService.uploadSlip(file).subscribe(s => {
          this.userService.setUserObject('slipUrl', s.downloadURL).subscribe();
        });
      }
    }
  }
}
