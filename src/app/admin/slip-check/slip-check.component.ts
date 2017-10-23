import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin.service';

@Component({
  selector: 'cusc-slip-check',
  templateUrl: './slip-check.component.html',
  styleUrls: ['./slip-check.component.css']
})
export class SlipCheckComponent implements OnInit {

  notChecked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.notChecked$ = this.adminService.userList.pipe(
      map((users) => {
        return users.filter((user) => {
          if (!!user.payload.val().slipUrl && !user.payload.val().slipChecked) {
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
          if (!!user.payload.val().slipUrl && !!user.payload.val().slipChecked) {
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
