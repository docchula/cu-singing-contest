import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { ConfigService } from '../../core/config/config.service';
import { Day } from '../../shared/day';

@Component({
  selector: 'cusc-set-day-batch',
  templateUrl: './set-day-batch.component.html',
  styleUrls: ['./set-day-batch.component.css']
})
export class SetDayBatchComponent implements OnInit {
  userListInput: FormControl;
  days$: Observable<Day[]>;
  daySelect: FormControl;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.userListInput = this.fb.control(
      '',
      null,
      validateUserLists(this.admin)
    );
    this.days$ = this.configService.getConfigListValue<Day>('days');
    this.daySelect = this.fb.control('', Validators.required);
  }

  saveData() {
    if (this.userListInput.valid && this.daySelect.valid) {
      const userList = this.userListInput.value
        .split('\n')
        .map(s => s.trim())
        .filter(s => s !== '');
      const promises = [];
      for (const uid of userList) {
        promises.push(
          this.admin.setUserValue<Day>(
            uid,
            ref => ref.child('firstDay'),
            this.daySelect.value
          )
        );
      }
      Promise.all(promises).then(_ => {
        alert('บันทึกข้อมูลเรียบร้อย');
        this.userListInput.reset();
        this.daySelect.reset();
      });
    }
  }
}

const validateUserLists = (adm: AdminService) => {
  return (c: AbstractControl) => {
    const value = c.value as string;
    const userList = value
      .split('\n')
      .map(s => s.trim())
      .filter(s => s !== '');
    if (userList.length === 0) {
      return of(null);
    }
    const songStatuses = combineLatest(
      userList.map(uid => {
        return adm.getUserValue(uid, ref => ref.child('songChecked')).pipe(
          map(sc => {
            return { uid, isValid: !!sc };
          })
        );
      })
    );
    return songStatuses.pipe(
      map(statuses => {
        let valid = true;
        const out = [];
        for (const status of statuses) {
          if (!status.isValid) {
            valid = false;
            out.push(status.uid);
          }
        }
        if (valid) {
          return null;
        } else {
          return { song: out };
        }
      }),
      first()
    );
  };
};
