import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Song } from '../../../shared/song';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cusc-song-name-input',
  templateUrl: './song-name-input.component.html',
  styleUrls: ['./song-name-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SongNameInputComponent),
      multi: true
    }
  ]
})
export class SongNameInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  _onChange: (value: Song) => void;
  _onTouch: () => void;
  songForm: FormGroup;
  sub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.songForm = this.fb.group({
      name: this.fb.control(''),
      artist: this.fb.control('')
    });
    this.sub = this.songForm.valueChanges.subscribe(v => {
      this.onChange(v);
    });
  }

  writeValue(obj: any): void {
    this.songForm.setValue({name: '', artist: '', ...obj});
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.songForm.disable();
    } else {
      this.songForm.enable();
    }
  }

  onChange(value: Song) {
    if (this._onChange) {
      this._onChange(value);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
