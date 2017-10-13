import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';

import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cusc-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TitleComponent),
      multi: true
    }
  ]
})
export class TitleComponent implements OnInit, ControlValueAccessor {

  title: FormControl;
  otherTitle: FormControl;

  modeOther$: Observable<boolean>;
  stringPresetTitle: string[] = ['นาย', 'นางสาว', 'นาง'];
  stringOtherTitle = 'อื่น ๆ';
  onChange: (val: any) => void;
  onTouch: () => void;

  constructor() { }

  ngOnInit() {
    this.title = new FormControl('');
    this.otherTitle = new FormControl('');
    this.modeOther$ = this.title.valueChanges.map((v, _) => {
      if (v === this.stringOtherTitle) {
        return true;
      } else {
        return false;
      }
    });

    Observable.combineLatest(
      Observable.of('').concat(this.title.valueChanges),
      Observable.of('').concat(this.otherTitle.valueChanges))
      .subscribe((values) => {
        if (this.onChange) {
          if (values[0] === this.stringOtherTitle) {
            this.onChange(values[1]);
          } else if (this.stringPresetTitle.includes(values[0])) {
            this.onChange(values[0]);
          } else {
            this.onChange(null);
          }
        }
      });
  }

  public writeValue(obj: any): void {
    if (this.stringPresetTitle.includes(obj)) {
      this.title.setValue(obj);
    } else if (obj === '') {
      this.title.setValue(obj);
    } else {
      this.title.setValue(this.stringOtherTitle);
      this.otherTitle.setValue(obj);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.title.disable();
      this.otherTitle.disable();
    } else {
      this.title.enable();
      this.otherTitle.enable();
    }
  }
}
