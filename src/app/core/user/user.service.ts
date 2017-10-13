import 'firebase/storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  authState: Observable<firebase.User>;

  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private fba: FirebaseApp) {
    this.authState = this.afa.authState;
  }

  signIn(token: string) {
    return Observable.fromPromise(this.afa.auth.signInWithCustomToken(token));
  }

  signOut() {
    return Observable.fromPromise(this.afa.auth.signOut());
  }

  getUserObject<T = any>(path: string | null = null): FirebaseObjectObservable<T> {
    return this.authState.first().switchMap((u) => {
      if (path) {
        return this.afd.object(this.afd.database.ref(`data/users/${u.uid}`).child(path));
      } else {
        return this.afd.object(`data/users/${u.uid}`);
      }
    }) as FirebaseObjectObservable<T>;
  }

  setUserObject(path: string, value: any) {
    return this.authState.first().switchMap((u) => {
      return Observable.fromPromise(this.afd.database.ref(`data/users/${u.uid}`).child(path).set(value));
    });
  }

  getUserList<T = any>(path: string): FirebaseListObservable<T[]> {
    return this.authState.first().switchMap((u) => {
      return this.afd.list(this.afd.database.ref(`data/users/${u.uid}`).child(path));
    }) as FirebaseListObservable<T[]>;
  }

  uploadSlip(file: any) {
    return this.authState.first().switchMap((u) => {
      return Observable.fromPromise(this.fba.storage().ref('slip').child(u.uid).put(file));
    });
  }

}
