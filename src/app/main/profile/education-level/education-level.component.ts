import 'rxjs/add/observable/of';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';

import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cusc-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EducationLevelComponent),
      multi: true
    }
  ]
})
export class EducationLevelComponent implements OnInit, ControlValueAccessor {


  educationLevel: FormControl;
  otherEducationLevel: FormControl;
  year: FormControl;
  _onTouch: () => void;
  onChange: (value: any) => void;
  stringEducationLevelPreset = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'];
  stringEducationLevelWithNumber = 'ปริญญาตรี';
  stringOtherEducationLevel = 'อื่น ๆ';
  modeYear$: Observable<boolean>;
  modeOther$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    this.educationLevel = new FormControl();
    this.otherEducationLevel = new FormControl();
    this.year = new FormControl();
    this.modeYear$ = this.educationLevel.valueChanges.map((v) => {
      if (v === this.stringEducationLevelWithNumber) {
        return true;
      } else {
        return false;
      }
    });
    this.modeOther$ = this.educationLevel.valueChanges.map((v) => {
      if (v === this.stringOtherEducationLevel) {
        return true;
      } else {
        return false;
      }
    });
    Observable.of(
      Observable.of('').concat(this.educationLevel.valueChanges),
      Observable.of(0).concat(this.year.valueChanges),
      Observable.of('').concat(this.otherEducationLevel.valueChanges)
    ).combineAll().subscribe(([educationLevel, year, other]) => {
      if (this.onChange) {
        if (educationLevel === this.stringEducationLevelWithNumber) {
          if (year >= 1 && year <= 6) {
            this.onChange({
              educationLevel, year
            });
          } else {
            this.onChange(null);
          }
        } else if (this.stringEducationLevelPreset.includes(educationLevel)) {
          this.onChange({
            educationLevel
          });
        } else if (educationLevel === this.stringOtherEducationLevel && other && other.length > 0) {
          this.onChange({
            educationLevel: other
          });
        } else {
          this.onChange(null);
        }
      }
    });
  }

  writeValue(obj: any): void {
    if (!obj || !((obj as Object).hasOwnProperty('educationLevel'))) {
      this.educationLevel.setValue('');
      return;
    }
    if (this.stringEducationLevelPreset.includes(obj.educationLevel)) {
      this.educationLevel.setValue(obj.educationLevel);
      if (obj.educationLevel === this.stringEducationLevelWithNumber) {
        this.year.setValue(obj.year);
      }
    } else if (obj.educationLevel === '' || !obj.educationLevel) {
      this.educationLevel.setValue(obj.educationLevel);
    } else {
      this.educationLevel.setValue(this.stringOtherEducationLevel);
      this.otherEducationLevel.setValue(obj.educationLevel);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.year.disable();
      this.educationLevel.disable();
      this.otherEducationLevel.disable();
    } else {
      this.year.enable();
      this.educationLevel.enable();
      this.otherEducationLevel.enable();
    }
  }
  onTouch() {
    if (this._onTouch) {
      this._onTouch();
    }
  }

}
