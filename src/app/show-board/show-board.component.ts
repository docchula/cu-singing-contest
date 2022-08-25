import { map, switchMap } from 'rxjs/operators';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../core/config/config.service';
import { Observable } from 'rxjs';
import { LiveService } from '../core/live.service';

@Component({
  selector: 'cusc-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css']
})
export class ShowBoardComponent implements OnInit, OnDestroy {
  currentDay$: Observable<number>;
  contestantList$: Observable<any>;
  singing$: Observable<any>;

  constructor(
    private configService: ConfigService,
    private liveService: LiveService
  ) {}

  ngOnInit() {
    this.currentDay$ = this.configService.getConfigObjectValue<number>('liveDay');
    this.contestantList$ = this.configService.getConfigObjectValue<number>('liveDay').pipe(
      switchMap(day => this.liveService.getDayList(day)),
      map(users => users.filter(user => (user.payload.val() as any).liveStatus <= 3))
    );
    this.singing$ = this.contestantList$.pipe(
      map(users => users.filter(user => user.payload.val().liveStatus === 3)),
      map(singingUsers => (singingUsers.length === 0) ? null : singingUsers[0])
    );
    document.getElementsByTagName('body').item(0).style.backgroundColor = '#121212';
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    // Revert page background color to default
    document.getElementsByTagName('body').item(0).style.backgroundColor = '#FFFFFF';
  }
}
