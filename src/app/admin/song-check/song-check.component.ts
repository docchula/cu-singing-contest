import { Component, OnInit } from '@angular/core';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin.service';

@Component({
  selector: 'cusc-song-check',
  templateUrl: './song-check.component.html',
  styleUrls: ['./song-check.component.css']
})
export class SongCheckComponent implements OnInit {

  notChecked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.notChecked$ = this.adminService.userList.pipe(
      map((users) => {
        return users.filter((user) => {
          if (!!user.payload.val().selectedSong && !user.payload.val().songChecked) {
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
          if (!!user.payload.val().selectedSong && !!user.payload.val().songChecked) {
            return true;
          } else {
            return false;
          }
        });
      })
    );
  }

  toggleStatus(uid: string) {
    this.adminService.toggleSongStatus(uid).subscribe();
  }

}
