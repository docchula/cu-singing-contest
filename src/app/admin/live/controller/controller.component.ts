import { switchMap, map, first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { LiveService } from '../../../core/live.service';
import { ConfigService } from '../../../core/config/config.service';
import { Observable } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';

// TODO: Fix errors

@Component({
  selector: 'cusc-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  userList$: Observable<any[]>;
  filteredUserList$: Observable<any[]>;
  day$: Observable<number>;
  mode: UntypedFormControl;
  positions = [
    {
      name: 'Administrator',
      canSee: [0, 1, 2, 3, 4],
      canNext: [0, 1, 2, 3],
      canReverse: [1, 2, 3, 4],
      canTrigger: true
    },
    {
      name: 'Floor 2',
      canSee: [0, 1, 2],
      canNext: [0],
      canReverse: [1],
      canTrigger: false
    },
    {
      name: 'Back stage',
      canSee: [1, 2, 3, 4],
      canNext: [1, 2, 3],
      canReverse: [2, 3, 4],
      canTrigger: true
    },
    {
      name: 'MC',
      canSee: [0, 3],
      canNext: [],
      canReverse: [],
      canTrigger: false
    },
    {
      name: 'Light & Sound',
      canSee: [2, 3],
      canNext: [],
      canReverse: [],
      canTrigger: false
    }
  ];

  status = [
    {
      name: 'ลงทะเบียนแล้ว',
      next: 'เช็กชื่อชั้น 2',
      hasTrigger: false
    },
    {
      name: 'อยู่ที่ชั้น 2',
      next: 'เช็กชื่อ backstage',
      hasTrigger: false
    },
    {
      name: 'อยู่ที่ backstage',
      next: 'ขึ้นร้อง',
      hasTrigger: true
    },
    {
      name: 'กำลังร้อง',
      next: 'ร้องเสร็จ',
      hasTrigger: false
    },
    {
      name: 'ร้องเสร็จแล้ว',
      next: 'ไม่มี',
      hasTrigger: false
    }
  ];

  constructor(
    private liveService: LiveService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.mode = new UntypedFormControl(-1);
    this.filteredUserList$ = this.mode.valueChanges.pipe(
      switchMap(mode => {
        return this.configService.getConfigObjectValue<number>('liveDay').pipe(
          switchMap(day => {
            return this.liveService.getDayList(day);
          }),
          map(users => {
            return users.filter(user => {
              if (this.positions[mode].canSee.includes((user.payload.val() as any).liveStatus)) {
                return true;
              } else {
                return false;
              }
            });
          })
        );
      })
    );
    this.day$ = this.configService.getConfigObjectValue<number>('liveDay');
  }

  next(userId: string) {
    this.configService.getConfigObjectValue<number>('liveDay').pipe(
      first(),
      switchMap((day) => {
        return this.liveService.shift(userId, day, 1);
      })
    ).subscribe();
  }

  back(userId: string) {
    this.configService.getConfigObjectValue<number>('liveDay').pipe(
      first(),
      switchMap((day) => {
        return this.liveService.shift(userId, day, -1);
      })
    ).subscribe();
  }

  trigger(userId: string, key: string) {
    this.configService.getConfigObjectValue<number>('liveDay').pipe(
      first(),
      switchMap((day) => {
        return this.liveService.trigger(userId, day, key);
      })
    ).subscribe();
  }
}
