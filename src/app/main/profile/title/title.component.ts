import { Component, forwardRef, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable ,  combineLatest ,  of } from 'rxjs';
import { concat, map } from 'rxjs/operators';

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
  stringPresetTitle: string[];
  stringPresetTitleTh: string[] = ['นาย', 'นางสาว', 'นาง'];
  stringPresetTitleEn: string[] = ['Mr.', 'Ms.', 'Mrs.'];
  stringOtherTitle: string;
  stringOtherTitleTh = 'อื่น ๆ';
  stringOtherTitleEn = 'Other';
  onChange: (val: any) => void;
  onTouch: () => void;

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit() {
    this.stringOtherTitle = this.localeId === 'th' ? this.stringOtherTitleTh : this.stringOtherTitleEn;
    this.stringPresetTitle = this.localeId === 'th' ? this.stringPresetTitleTh : this.stringPresetTitleEn;
    this.title = new FormControl('');
    this.otherTitle = new FormControl('');
    this.modeOther$ = this.title.valueChanges.pipe(
      map((v, _) => {
        if (v === this.stringOtherTitle) {
          return true;
        } else {
          return false;
        }
      })
    );

    combineLatest(
      of('').pipe(concat(this.title.valueChanges)),
      of('').pipe(concat(this.otherTitle.valueChanges))
    ).subscribe(values => {
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
