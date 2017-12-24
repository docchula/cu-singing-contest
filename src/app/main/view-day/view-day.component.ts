import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserService } from '../../core/user/user.service';
import { Day } from '../../shared/day';
import { Observable } from 'rxjs/Observable';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'cusc-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['./view-day.component.css']
})
export class ViewDayComponent implements OnInit {
  firstDay: Observable<string>;
  textKey: string;
  acceptBox: FormControl;
  accepted: Observable<boolean>;

  constructor(private userService: UserService, @Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit() {
    this.textKey = this.localeId === 'th' ? 'text' : 'textEn';
    this.firstDay = this.userService
      .getUserObjectValue<{
        preference: number;
        day: Day;
      }>('firstDay')
      .pipe(map(u => u.day[this.textKey]));
    this.acceptBox = new FormControl(false, Validators.requiredTrue);
    this.accepted = this.userService
      .getUserObjectValue<boolean>('viewedDay')
      .pipe(
        map(a => !!a)
      );
  }

  accept() {
    this.userService.setUserObject('viewedDay', true).subscribe();
  }
}
