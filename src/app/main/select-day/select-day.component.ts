import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
  currentDays$: Observable<{d1: Day, d2: Day, d3: Day, $exists: () => boolean}>;
  daysDone$: Observable<boolean>;
  daysForm: FormGroup;
  disableSubmit = false;

  constructor(private configService: ConfigService, private userService: UserService) { }

  ngOnInit() {
    this.days$ = this.configService.getConfigList<Day>('days');
    this.currentDays$ = this.userService.getUserObject('days');
    this.daysDone$ = this.userService.getUserObject('days').map((d) => d.$exists());
    this.daysForm = new FormGroup({
      d1: new FormControl('', Validators.required),
      d2: new FormControl('', Validators.required),
      d3: new FormControl('', Validators.required)
    }, this.validateDays);
    this.currentDays$.first().subscribe((days) => {
      if (days.$exists()) {
        this.daysForm.setValue(days);
      }
    });
  }

  validateDays(c: FormGroup) {
    if ([c.get('d1'), c.get('d2'), c.get('d3')]
      .map((_c) => _c.value).map((v: Day) => v.id).filter((v, pos, a) => a.indexOf(v) === pos).length === 3) {
      return {};
    } else {
      return { days: 'duplicate' };
    }
  }

  submit() {
    if (this.daysForm.valid) {
      this.disableSubmit = true;
      this.userService.setUserObject('days', this.daysForm.value).subscribe(() => {
        this.disableSubmit = false;
      });
    }
  }

}
