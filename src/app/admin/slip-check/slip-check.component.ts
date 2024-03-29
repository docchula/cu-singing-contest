import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin.service';

@Component({
  selector: 'cusc-slip-check',
  templateUrl: './slip-check.component.html',
  styleUrls: ['./slip-check.component.css']
})
export class SlipCheckComponent implements OnInit {
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.checked$ = this.adminService.userList.pipe(
      map(users => {
        return users.filter(user => {
          return !!user.payload.val().slipUrl;
        });
      }),
      map(users => {
        return users.sort((userA, userB) => {
          return (
            userA.payload.val().slipTimestamp -
            userB.payload.val().slipTimestamp
          );
        });
      })
    );
  }

  toggleStatus(uid: string) {
    this.adminService.toggleSlipStatus(uid).subscribe();
  }
}
