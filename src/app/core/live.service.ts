import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class LiveService {
  constructor(private afd: AngularFireDatabase) {}

  getDayList(day: number) {
    return this.afd
      .list(
        firebase
          .database()
          .ref('data/live')
          .child(`day${day}`)
          .child('users'),
        ref => ref.orderByKey()
      )
      .snapshotChanges();
  }

  registerDetails(
    details: {
      nameReading: string;
      songMode: string;
      songName: string;
      songArtist: string;
    },
    uid: string,
    day: number
  ) {
    const selectedSongKey = day === 6 ? 'selectedSong2' : 'selectedSong';
    return fromPromise(
      Promise.all([
        firebase
          .database()
          .ref(`data/users/${uid}/profile/nameReading`)
          .set(details.nameReading),
        firebase
          .database()
          .ref(`data/users/${uid}/${selectedSongKey}/mode`)
          .set(details.songMode),
        firebase
          .database()
          .ref(`data/users/${uid}/${selectedSongKey}/song/name`)
          .set(details.songName),
        firebase
          .database()
          .ref(`data/users/${uid}/${selectedSongKey}/song/artist`)
          .set(details.songArtist),
        firebase
          .database()
          .ref(`data/users/${uid}/registered`)
          .set(true)
      ])
    );
  }

  shift(contestantId: string, day: number, shift: number) {
    return fromPromise(
      firebase
        .database()
        .ref(`data/live/day${day}/users/${contestantId}/liveStatus`)
        .transaction((val: number) => {
          if (val !== null) {
            const out = val + shift;
            if (out > 4) {
              return 4;
            } else if (out < 0) {
              return 0;
            } else {
              return out;
            }
          } else {
            return -1;
          }
        })
    );
  }

  trigger(contestantId: string, day: number, key: string) {
    return fromPromise(
      firebase
        .database()
        .ref(`data/live/day${day}/users/${contestantId}/${key}`)
        .transaction(val => {
          return !val;
        })
    );
  }
}
