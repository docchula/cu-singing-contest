import {Component, OnInit, forwardRef, OnDestroy, Inject, LOCALE_ID, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Song } from '../../../shared/song';
import {Observable, Subscription} from 'rxjs';

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
  @Input() mode: string;
  _onChange: (value: Song) => void;
  _onTouch: () => void;
  songForm: FormGroup;
  sub: Subscription;
  instrument: FormControl;
  otherInstrument: FormControl;
  stringOtherInstrument = 'เอาเครื่องดนตรีอื่น ๆ มาเอง';
  stringOtherInstrumentEn = 'Your other instrument';
  stringInstrumentPreset = [
    'ใช้เครื่องดนตรีของงาน “กีต้าร์โปร่งไฟฟ้า”',
    'ใช้เครื่องดนตรีของงาน “คีย์บอร์ด Roland Juno-Di 61 คีย์”',
    'เอาเครื่องดนตรีมาเอง “กีต้าร์โปร่งไฟฟ้า (มีช่องเสียบแจ็ค)”',
    'เอาเครื่องดนตรีมาเอง “คีย์บอร์ด/เปียโนไฟฟ้า”',
    this.stringOtherInstrument
  ];
  stringInstrumentPresetEn = [
    'Provided acoustic electric guitar',
    'Provided keyboard (Roland JUNO-Di 61-Key Synthesizer)',
    'Your acoustic electric guitar (with audio jack)',
    'Your keyboard',
    this.stringOtherInstrumentEn
  ];
  stringInstrumentPresetShow: string[];
  modeOther$: Observable<boolean>;

  constructor(private fb: FormBuilder, @Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit() {
    this.songForm = this.fb.group({
      name: this.fb.control(''),
      artist: this.fb.control(''),
      instrument: this.fb.control('')
    });
    this.sub = this.songForm.valueChanges.subscribe(v => {
      this.onChange(v);
    });
    this.instrument = new FormControl(this.stringInstrumentPreset.includes(this.songForm.value.instrument)
      ? this.songForm.value.instrument : this.stringOtherInstrument);
    this.otherInstrument = new FormControl(this.stringInstrumentPreset.includes(this.songForm.value.instrument)
      ? '' : this.songForm.value.instrument);
    this.stringInstrumentPresetShow = (this.localeId === 'th') ? this.stringInstrumentPreset : this.stringInstrumentPresetEn;
  }

  writeValue(obj: any): void {
    this.songForm.setValue({name: '', artist: '', instrument: '', ...obj});
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

  onInstrumentSelectChange (value) {
    if (value !== this.stringOtherInstrument) {
      this.songForm.patchValue({instrument: value});
    }
    console.log(this.songForm.value);
  }

  onInstrumentSpecifyChange (value) {
    if (this.instrument.value === this.stringOtherInstrument) {
      this.songForm.patchValue({instrument: value});
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
