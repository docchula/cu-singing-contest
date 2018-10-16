import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ConfigService } from '../../../core/config/config.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'cusc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uid: FormControl;

  constructor(
    private configService: ConfigService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.uid = new FormControl('', Validators.required);
  }

  register() {
    if (this.uid.valid) {
      this.configService
        .getConfigObjectValue<number>('liveDay')
        .pipe(
          first(),
          switchMap(day => {
            return this.adminService.getUser(this.uid.value).pipe(
              map(user => {
                if (day === user.firstDay.id || (day === 6 && user.allowRound2)) {
                  return true;
                } else {
                  return false;
                }
              })
            );
          }),
          first()
        )
        .subscribe(thisDay => {
          if (thisDay) {
            this.router.navigate(['./', this.uid.value], {
              relativeTo: this.activatedRoute
            });
          } else {
            alert('ผู้เข้าแข่งขันไม่ได้ลงทะเบียนแข่งขันในวันนี้');
            this.uid.reset();
          }
        });
    }
  }
}
