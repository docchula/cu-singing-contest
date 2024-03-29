import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AngularFireAction } from '@angular/fire/compat/database';
import {
  UntypedFormControl,
  UntypedFormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { AdminService } from '../admin.service';
import { map, tap } from 'rxjs/operators';
import { Song } from '../../shared/song';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'cusc-set-song-second-round',
  templateUrl: './set-song-second-round.component.html',
  styleUrls: ['./set-song-second-round.component.css']
})
export class SetSongSecondRoundComponent implements OnInit {
  checked$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  urlInputs: { [key: string]: UntypedFormControl } = {};
  artistInputs: { [key: string]: UntypedFormControl } = {};
  songNameInputs: { [key: string]: UntypedFormControl } = {};
  songModeInputs: { [key: string]: UntypedFormControl } = {};

  constructor(private adminService: AdminService, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.checked$ = this.adminService.userList.pipe(
      map(users => {
        return users.filter(user => {
          return !!user.payload.val().registered;
        });
      }),
      map(users => {
        return users.sort((userA, userB) => {
          return (
            userA.payload.val().slipTimestamp -
            userB.payload.val().slipTimestamp
          );
        });
      }),
      tap(users => {
        for (const user of users) {
          if (!this.urlInputs[user.key]) {
            this.urlInputs[user.key] = this.fb.control('', checkUrlFormat);
          }
          if (!this.artistInputs[user.key]) {
            this.artistInputs[user.key] = this.fb.control(
              '',
              Validators.required
            );
          }
          if (!this.songNameInputs[user.key]) {
            this.songNameInputs[user.key] = this.fb.control(
              '',
              Validators.required
            );
          }
          if (!this.songModeInputs[user.key]) {
            this.songModeInputs[user.key] = this.fb.control(
              '',
              checkModeFormat
            );
          }
        }
      })
    );
  }

  saveStatus(uid: string) {
    const songUrlControl = this.urlInputs[uid];
    const songNameControl = this.songNameInputs[uid];
    const artistControl = this.artistInputs[uid];
    const modeControl = this.songModeInputs[uid];
    if (
      songUrlControl.valid &&
      songNameControl.valid &&
      artistControl.valid &&
      modeControl.valid
    ) {
      // convert link from https://drive.google.com/file/d/... to https://drive.google.com/open?id=...
      const songUrl = (songUrlControl.value as string);
      if (songUrl.match(/^https:\/\/drive\.google\.com\/file\/d\/.+$/)) {
        songUrlControl.setValue('https://drive.google.com/open?id=' + songUrl.substr(32, songUrl.substr(32).indexOf('/')));
      } else if (songUrl.match(/^https:\/\/drive\.google\.com\/a\/docchula\.com\/file\/d\/.+$/)) {
        songUrlControl.setValue('https://drive.google.com/open?id=' + songUrl.substr(47, songUrl.substr(47).indexOf('/')));
      }

      combineLatest(
        this.adminService.saveUserField<{ mode: string; song: Song }>(
          uid,
          ref => ref.child('selectedSong2'),
          {
            mode: modeControl.value,
            song: { name: songNameControl.value, artist: artistControl.value }
          }
        ),
        this.adminService.saveUserField<string>(
          uid,
          ref => ref.child('songUrl2'),
          songUrlControl.value
        )
      ).subscribe(_ => {
        this.adminService
          .toggleUserField(uid, ref => ref.child('allowRound2'))
          .subscribe(__ => {
            songUrlControl.reset();
            artistControl.reset();
            songNameControl.reset();
          });
      });
    }
  }

  deleteStatus(uid: string) {
    this.adminService
      .toggleUserField(uid, ref => ref.child('allowRound2'))
      .subscribe();
  }
}

const checkUrlFormat = (c: AbstractControl) => {
  const controlValue = c.value as string;
  if (controlValue.match(/^https:\/\/drive\.google\.com\/open\?id=.+$/)
    || controlValue.match(/^https:\/\/drive\.google\.com\/file\/d\/.+$/)
    || controlValue.match(/^https:\/\/drive\.google\.com\/a\/docchula\.com\/file\/d\/.+$/)) {
    return null;
  } else {
    return {format: true};
  }
};

const checkModeFormat = (c: AbstractControl) => {
  if (c.value === 'standard' || c.value === 'custom' || c.value === 'live') {
    return null;
  } else {
    return { mode: true };
  }
};
