import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from '../../core/user/user.service';
import { SelectedSong } from '../../shared/selected-song';

@Component({
  selector: 'cusc-select-song',
  templateUrl: './select-song.component.html',
  styleUrls: ['./select-song.component.css']
})
export class SelectSongComponent implements OnInit {
  songForm: UntypedFormGroup;
  currentSelectedSong$: Observable<SelectedSong>;
  disableSubmit = false;
  selected$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.songForm = new UntypedFormGroup(
      {
        mode: new UntypedFormControl('', Validators.required),
        song: new UntypedFormControl({})
      },
      this.customValidate
    );
    this.currentSelectedSong$ = this.userService.getUserObjectValue<SelectedSong>(
      'selectedSong'
    );
    this.currentSelectedSong$.pipe(first()).subscribe(ss => {
      if (ss) {
        this.songForm.setValue(ss);
      }
    });
    this.selected$ = this.currentSelectedSong$.pipe(map(ss => !!ss));
  }

  customValidate(c: UntypedFormGroup) {
    if (c.get('mode').value) {
      if ((c.get('song').value as Object).hasOwnProperty('name')) {
        return {};
      } else {
        return { song: 'missing' };
      }
    } else {
      return { mode: 'missing' };
    }
  }

  submit() {
    if (this.songForm.valid) {
      this.disableSubmit = true;
      this.userService
        .setUserObject('selectedSong', this.songForm.value)
        .subscribe(() => {
          this.userService.setUserObject('songChecked', false).subscribe(() => {
            this.disableSubmit = false;
          });
        });
    }
  }

  setStandardMode() {
    this.songForm.setValue({mode: 'standard', song: {name: '', artist: ''}});
  }
}
