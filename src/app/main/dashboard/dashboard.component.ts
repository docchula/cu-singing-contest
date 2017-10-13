import 'rxjs/add/observable/of';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.step1Done = this.userService.getUserObject('accepted').map((v) => {
      if (v.$exists()) {
        return v.$value;
      } else {
        return false;
      }
    });
    this.step2Done = this.userService.getUserObject('profile').map((v) => {
      if (v.$exists()) {
        return !!v;
      } else {
        return false;
      }
    });
    this.step3Done = this.userService.getUserObject('days').map((v) => {
      if (v.$exists()) {
        return true;
      } else {
        return false;
      }
    });
    this.step4Done = this.userService.getUserObject('slipChecked').map((v) => {
      if (v.$exists()) {
        return true;
      } else {
        return false;
      }
    });
    this.step5Done = Observable.of(false);
  }

}
