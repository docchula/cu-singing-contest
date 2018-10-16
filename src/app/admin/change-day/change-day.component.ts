import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { Day } from '../../shared/day';
import { AdminService } from '../admin.service';

@Component({
  selector: 'cusc-change-day',
  templateUrl: './change-day.component.html',
  styleUrls: ['./change-day.component.css']
})
export class ChangeDayComponent implements OnInit {
  userInput: FormControl;
  days$: Observable<Day[]>;
  daySelect: FormControl;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.userInput = this.fb.control('', null, validateUser(this.admin));
    this.days$ = this.configService.getConfigListValue<Day>('days');
    this.daySelect = this.fb.control('', Validators.required);
  }

  saveData() {
    if (this.userInput.valid && this.daySelect.valid) {
      const uid = (this.userInput.value as string).trim();
      this.admin
        .setUserValue<Day>(
          uid,
          ref => ref.child('firstDay'),
          this.daySelect.value
        )
        .then(_ => {
          alert('บันทึกข้อมูลเรียบร้อย');
          this.userInput.reset();
          this.daySelect.reset();
        });
    }
  }
}

const validateUser = (adm: AdminService) => {
  return (c: AbstractControl) => {
    const uid = c.value as string;
    const songStatus = adm
      .getUserValue(uid, ref => ref.child('songChecked'))
      .pipe(
        map(sc => {
          return !!sc;
        })
      );
    return songStatus.pipe(
      map(status => {
        if (status) {
          return null;
        } else {
          return { song: true };
        }
      }),
      first()
    );
  };
};
