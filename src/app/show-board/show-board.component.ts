import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/config/config.service';
import { Observable } from 'rxjs/Observable';
import { LiveService } from '../core/live.service';

@Component({
  selector: 'cusc-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css']
})
export class ShowBoardComponent implements OnInit {
  currentDay$: Observable<number>;
  contestantList$: Observable<any>;
  singing$: Observable<any>;

  constructor(
    private configService: ConfigService,
    private liveService: LiveService
  ) {}

  ngOnInit() {
    this.currentDay$ = this.configService.getConfigObjectValue<number>(
      'liveDay'
    );
    this.contestantList$ = this.currentDay$.pipe(
      switchMap(day => {
        return this.liveService.getDayList(day);
      }),
      map((users) => {
        return users.filter((user) => {
          if (user.payload.val().liveStatus > 3) {
            return false;
          } else {
            return true;
          }
        });
      })
    );
    this.singing$ = this.contestantList$.pipe(
      map((users) => {
        return users.filter((user) => {
          if (user.payload.val().liveStatus === 3) {
            return true;
          } else {
            return false;
          }
        });
      }),
      map((singingUsers) => {
        if (singingUsers.length === 0) {
          return null;
        } else {
          return singingUsers[0];
        }
      })
    );
  }
}
