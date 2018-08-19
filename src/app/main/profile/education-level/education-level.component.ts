import { Component, forwardRef, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable ,  of } from 'rxjs';
import { combineAll, concat, map } from 'rxjs/operators';

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
  stringEducationLevelPresetEn = ['Bachelor Degree', 'Master Degree', 'Doctoral Degree'];
  stringEducationLevelPresetShow: string[];
  stringEducationLevelWithNumber = 'ปริญญาตรี';
  stringOtherEducationLevel = 'อื่น ๆ';
  stringOtherEducationLevelEn = 'Other';
  stringOtherEducationLevelShow: string;
  modeYear$: Observable<boolean>;
  modeOther$: Observable<boolean>;

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit() {
    this.educationLevel = new FormControl();
    this.otherEducationLevel = new FormControl();
    this.year = new FormControl();
    this.modeYear$ = this.educationLevel.valueChanges.pipe(
      map(v => {
        if (v === this.stringEducationLevelWithNumber) {
          return true;
        } else {
          return false;
        }
      })
    );
    this.modeOther$ = this.educationLevel.valueChanges.pipe(
      map(v => {
        if (v === this.stringOtherEducationLevel) {
          return true;
        } else {
          return false;
        }
      })
    );
    of(
      of('').pipe(concat(this.educationLevel.valueChanges)),
      of(0).pipe(concat(this.year.valueChanges)),
      of('').pipe(concat(this.otherEducationLevel.valueChanges))
    )
      .pipe(combineAll())
      .subscribe(([educationLevel, year, other]) => {
        if (this.onChange) {
          if (educationLevel === this.stringEducationLevelWithNumber) {
            if (year >= 1 && year <= 6) {
              this.onChange({
                educationLevel,
                year
              });
            } else {
              this.onChange(null);
            }
          } else if (this.stringEducationLevelPreset.includes(educationLevel)) {
            this.onChange({
              educationLevel
            });
          } else if (
            educationLevel === this.stringOtherEducationLevel &&
            other &&
            other.length > 0
          ) {
            this.onChange({
              educationLevel: other
            });
          } else {
            this.onChange(null);
          }
        }
      });
    this.stringEducationLevelPresetShow = this.localeId === 'th' ? this.stringEducationLevelPreset : this.stringEducationLevelPresetEn;
    this.stringOtherEducationLevelShow = this.localeId === 'th' ? this.stringOtherEducationLevel : this.stringOtherEducationLevelEn;
  }

  writeValue(obj: any): void {
    if (!obj || !(obj as Object).hasOwnProperty('educationLevel')) {
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
