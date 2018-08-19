import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { ConfigService } from '../../../core/config/config.service';
import { Song } from '../../../shared/song';

@Component({
  selector: 'cusc-song-searcher',
  templateUrl: './song-searcher.component.html',
  styleUrls: ['./song-searcher.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SongSearcherComponent),
      multi: true
    }
  ]
})
export class SongSearcherComponent implements OnInit, ControlValueAccessor {
  selected: Song;
  _onChange: (value: Song) => void;
  _onTouch: () => void;
  searchBox: FormControl;
  searchResult$: Observable<Song[]>;
  disabled = false;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.searchBox = new FormControl('');
    this.searchResult$ = this.searchBox.valueChanges.pipe(
      debounceTime(1000),
      switchMap(v => {
        return this.configService.getConfigListValue<Song>('songs', (ref) => {
          return ref.orderByChild('name').startAt(v).limitToFirst(20);
        });
      }),
      map(songs => {
        return songs.filter(s => {
          return s.name.startsWith(this.searchBox.value);
        });
      })
    );
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(value: Song) {
    if (this._onChange) {
      this._onChange(value);
    }
  }

  onTouch() {
    if (this._onTouch) {
      this._onTouch();
    }
  }

  selectSong(song: Song) {
    this.selected = song;
    this.onChange(song);
  }
}
