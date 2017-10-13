import { map } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/user';

@Component({
  selector: 'cusc-slip-check',
  templateUrl: './slip-check.component.html',
  styleUrls: ['./slip-check.component.css']
})
export class SlipCheckComponent implements OnInit {

  notChecked$: Observable<User[]>;
  checked$: Observable<User[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.notChecked$ = this.adminService.userList.pipe(
      map((users) => {
        return users.filter((user) => {
          if (!!user.slipUrl && !user.slipChecked) {
            return true;
          } else {
            return false;
          }
        });
      })
    );
    this.checked$ = this.adminService.userList.pipe(
      map((users) => {
        return users.filter((user) => {
          if (!!user.slipUrl && !!user.slipChecked) {
            return true;
          } else {
            return false;
          }
        });
      })
    );
  }

  toggleStatus(uid: string) {
    this.adminService.toggleSlipStatus(uid).subscribe();
  }

}
