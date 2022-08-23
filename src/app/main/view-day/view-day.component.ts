import { UntypedFormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from '../../core/user/user.service';
import { Day } from '../../shared/day';
import { Observable } from 'rxjs';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ConfigService } from '../../core/config/config.service';

@Component({
  selector: 'cusc-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.css']
})
export class ViewDayComponent implements OnInit {
  firstDay: Observable<string>;
  textKey: string;
  acceptBox: UntypedFormControl;
  accepted: Observable<boolean>;
  allowViewDay: Observable<boolean>;

  constructor(
    private userService: UserService,
    @Inject(LOCALE_ID) private localeId: string,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.textKey = this.localeId === 'th' ? 'text' : 'textEn';
    this.firstDay = this.userService
      .getUserObjectValue<Day>('firstDay')
      .pipe(map(u => u[this.textKey]));
    this.acceptBox = new UntypedFormControl(false, Validators.requiredTrue);
    this.accepted = this.userService
      .getUserObjectValue<boolean>('viewedDay')
      .pipe(map(a => !!a));
    this.allowViewDay = this.configService.getConfigObjectValue('allowViewDay');
  }

  accept() {
    this.userService.setUserObject('viewedDay', true).subscribe();
  }
}
