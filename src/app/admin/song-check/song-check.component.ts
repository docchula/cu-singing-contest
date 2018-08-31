import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin.service';

@Component({
  selector: 'cusc-song-check',
  templateUrl: './song-check.component.html',
  styleUrls: ['./song-check.component.css']
})
export class SongCheckComponent implements OnInit {
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.checked$ = this.adminService.userList.pipe(
      map(users => {
        return users.filter(user => {
          return !!user.payload.val().selectedSong;
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
    this.adminService.toggleSongStatus(uid).subscribe();
  }
}
