import { map } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/user';

@Component({
  selector: 'cusc-song-check',
  templateUrl: './song-check.component.html',
  styleUrls: ['./song-check.component.css']
})
export class SongCheckComponent implements OnInit {

  notChecked$: Observable<User[]>;
  checked$: Observable<User[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.notChecked$ = this.adminService.userList.pipe(
      map((users) => {
        return users.filter((user) => {
          if (!!user.selectedSong && !user.songChecked) {
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
          if (!!user.selectedSong && !!user.songChecked) {
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
