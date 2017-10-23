import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { first, map } from 'rxjs/operators';

import { UserService } from '../../core/user/user.service';
import { SelectedSong } from '../../shared/selected-song';

@Component({
  selector: 'cusc-select-song',
  templateUrl: './select-song.component.html',
  styleUrls: ['./select-song.component.css']
})
export class SelectSongComponent implements OnInit {
  songForm: FormGroup;
  currentSelectedSong$: Observable<any>;
  disableSubmit = false;
  selected$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.songForm = new FormGroup(
      {
        mode: new FormControl('', Validators.required),
        song: new FormControl({})
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

  customValidate(c: FormGroup) {
    if (c.get('mode').value === 'standard') {
      if ((c.get('song').value as Object).hasOwnProperty('name')) {
        return {};
      } else {
        return { song: 'missing' };
      }
    } else if (c.get('mode').value === 'custom') {
      return {};
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
}
