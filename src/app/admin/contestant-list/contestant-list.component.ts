import { ConfigService } from '../../core/config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
import { Component, OnInit } from '@angular/core';
import { Day } from '../../shared/day';

@Component({
  selector: 'cusc-contestant-list',
  templateUrl: './contestant-list.component.html',
  styleUrls: ['./contestant-list.component.css']
})
export class ContestantListComponent implements OnInit {

  paidUsers: Observable<any[]>;

  usersByDay: Observable<any[]>[] = [];

  days: Observable<Day[]>;

  constructor(private adminService: AdminService, private configService: ConfigService) { }

  ngOnInit() {
    this.paidUsers = this.adminService.userList.pipe(
      map((snaps) => {
        return snaps.filter((snap) => {
          if (snap.payload.val().slipChecked) {
            return true;
          } else {
            return false;
          }
        });
      })
    );

    [0, 1, 2, 3, 4].forEach((i) => {
      this.usersByDay[i] = this.paidUsers.pipe(
        map((snaps) => {
          return snaps.filter((snap) => {
            const val = snap.payload.val();
            if (val.firstDay && val.firstDay.id === i + 1) {
              return true;
            } else {
              return false;
            }
          });
        })
      );
    });
    this.days = this.configService.getConfigListValue<Day>('days');
  }

}
