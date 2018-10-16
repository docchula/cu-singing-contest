import { from as fromPromise, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from '../shared/user';

@Injectable()
export class AdminService {
  userList = this.afd.list<User>('data/users').snapshotChanges();

  constructor(private afd: AngularFireDatabase) {}

  toggleSlipStatus(uid: string) {
    return fromPromise(
      this.afd.database
        .ref(`data/users/${uid}/slipChecked`)
        .transaction(value => {
          return !(value || false);
        })
    );
  }

  saveSongUrl(uid: string, url: string) {
    return fromPromise(this.afd.object(`data/users/${uid}/songUrl`).set(url));
  }

  toggleSongStatus(uid: string) {
    return fromPromise(
      this.afd.database
        .ref(`data/users/${uid}/songChecked`)
        .transaction(value => {
          return !(value || false);
        })
    );
  }

  getUser(uid: string) {
    return this.afd.object<User>(`data/users/${uid}`).valueChanges();
  }

  getUserValue<T = any>(
    uid: string,
    pathFn: (ref: firebase.database.Reference) => firebase.database.Reference
  ) {
    return this.afd
      .object<T>(pathFn(this.afd.database.ref(`data/users/${uid}`)))
      .valueChanges();
  }

  setUserValue<T = any>(
    uid: string,
    pathFn: (ref: firebase.database.Reference) => firebase.database.Reference,
    value: T
  ) {
    return this.afd
      .object<T>(pathFn(this.afd.database.ref(`data/users/${uid}`)))
      .set(value);
  }
}
