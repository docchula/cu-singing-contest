import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ConfigService } from '../../core/config/config.service';
import { UserService } from '../../core/user/user.service';
import { Day } from '../../shared/day';

@Component({
  selector: 'cusc-select-day',
  templateUrl: './select-day.component.html',
  styleUrls: ['./select-day.component.css']
})
export class SelectDayComponent implements OnInit {
  days$: Observable<Day[]>;
  currentDays$: Observable<{
    d1: Day;
    d2: Day;
    d3: Day;
    d4: Day;
    d5: Day;
    $exists: () => boolean;
  }>;
  daysDone$: Observable<boolean>;
  daysForm: UntypedFormGroup;
  disableSubmit = false;
  daysTextKey: string;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(LOCALE_ID) private localeId: string
  ) {}

  ngOnInit() {
    this.days$ = this.configService.getConfigListValue<Day>('days');
    this.currentDays$ = this.userService.getUserObjectValue('days');
    this.daysDone$ = this.userService
      .getUserObjectSnapshot('days')
      .pipe(map(d => d.payload.exists()));
    this.daysForm = new UntypedFormGroup(
      {
        d1: new UntypedFormControl('', Validators.required),
        d2: new UntypedFormControl('', Validators.required),
        d3: new UntypedFormControl('', Validators.required),
        d4: new UntypedFormControl('', Validators.required),
        d5: new UntypedFormControl('', Validators.required)
      },
      this.validateDays
    );
    this.currentDays$.pipe(first()).subscribe(days => {
      if (days) {
        this.daysForm.setValue(days);
      }
    });
    this.daysTextKey = this.localeId === 'th' ? 'text' : 'textEn';
  }

  validateDays(c: UntypedFormGroup) {
    if (
      [c.get('d1'), c.get('d2'), c.get('d3'), c.get('d4'), c.get('d5')]
        .map(_c => _c.value)
        .map((v: Day) => v.id)
        .filter((v, pos, a) => a.indexOf(v) === pos).length === 5
    ) {
      return {};
    } else {
      return { days: 'duplicate' };
    }
  }

  submit() {
    if (this.daysForm.valid) {
      this.disableSubmit = true;
      this.userService
        .setUserObject('days', this.daysForm.value)
        .subscribe(() => {
          this.disableSubmit = false;
        });
    }
  }
}
