import { Component, OnInit } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'cusc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  step1Done: Observable<boolean>;
  step2Done: Observable<boolean>;
  step3Done: Observable<boolean>;
  step4Done: Observable<boolean>;
  step5Done: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.step1Done = this.userService.getUserObjectSnapshot<boolean>('accepted').pipe(
      map(v => {
        if (v.payload.exists()) {
          return v.payload.val();
        } else {
          return false;
        }
      })
    );
    this.step2Done = this.userService.getUserObjectSnapshot<any>('profile').pipe(
      map(v => {
        if (v.payload.exists()) {
          return !!(v.payload.val());
        } else {
          return false;
        }
      })
    );
    this.step3Done = this.userService.getUserObjectSnapshot<any>('slipChecked').pipe(
      map(v => {
        if (v.payload.exists()) {
          return true;
        } else {
          return false;
        }
      })
    );
    this.step4Done = this.userService.getUserObjectSnapshot<boolean>('days').pipe(
      map(v => {
        if (v.payload.exists()) {
          return v.payload.val();
        } else {
          return false;
        }
      })
    );
  }
}
