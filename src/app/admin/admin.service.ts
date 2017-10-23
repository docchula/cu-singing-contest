import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user';

@Injectable()
export class AdminService {

  userList = this.afd.list<User>('data/users').snapshotChanges();

  constructor(private afd: AngularFireDatabase) { }

  toggleSlipStatus(uid: string) {
    console.log('asdf');
    return fromPromise(this.afd.database.ref(`data/users/${uid}/slipChecked`).transaction((value) => {
      console.log('compare');
      return !(value || false);
    }));
  }

  toggleSongStatus(uid: string) {
    return fromPromise(this.afd.database.ref(`data/users/${uid}/songChecked`).transaction((value) => {
      return !(value || false);
    }));
  }

}
