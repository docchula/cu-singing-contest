import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user';

@Injectable()
export class AdminService {

  userList: Observable<User[]>;

  constructor(private afd: AngularFireDatabase) {
    this.userList = this.afd.list('data/users');
  }

  toggleSlipStatus(uid: string) {
    return fromPromise(this.afd.database.ref(`data/users/${uid}/slipChecked`).transaction((value) => {
      return !(value || false);
    }));
  }

  toggleSongStatus(uid: string) {
    return fromPromise(this.afd.database.ref(`data/users/${uid}/songChecked`).transaction((value) => {
      return !(value || false);
    }));
  }

}
