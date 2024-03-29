import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { Observable ,  from as fromPromise } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {

  authState: Observable<firebase.User>;

  constructor(private afa: AngularFireAuth, private afd: AngularFireDatabase, private storage: AngularFireStorage) {
    this.authState = this.afa.authState;
  }

  signIn(token: string) {
    return fromPromise(this.afa.signInWithCustomToken(token));
  }

  signOut() {
    return fromPromise(this.afa.signOut());
  }

  _getUserObject<T = any>(path: string | null = null) {
    return this.authState.pipe(
      first(),
      map((u) => {
        if (path) {
          return this.afd.object<T>(this.afd.database.ref(`data/users/${u.uid}`).child(path));
        } else {
          return this.afd.object<T>(`data/users/${u.uid}`);
        }
      })
    );
  }

  getUserObjectValue<T = any>(path: string | null = null) {
    return this._getUserObject<T>(path).pipe(
      switchMap((s) => s.valueChanges())
    );
  }

  getUserObjectSnapshot<T = any>(path: string | null = null) {
    return this._getUserObject(path).pipe(
      switchMap((s) => s.snapshotChanges())
    );
  }

  setUserObject(path: string, value: any) {
    return this.authState.pipe(
      first(),
      switchMap((u) => {
        return fromPromise(this.afd.database.ref(`data/users/${u.uid}`).child(path).set(value));
      })
    );
  }

  _getUserList<T = any>(path: string) {
    return this.authState.pipe(
      first(),
      map((u) => {
        return this.afd.list<T>(this.afd.database.ref(`data/users/${u.uid}`).child(path));
      })
    );
  }

  getUserListValue<T = any>(path: string) {
    return this._getUserList<T>(path).pipe(
      switchMap((s) => s.valueChanges())
    );
  }

  getUserListSnapshot<T = any>(path: string) {
    return this._getUserList(path).pipe(
      switchMap((s) => s.snapshotChanges())
    );
  }

  uploadSlip(file: any) {
    return this.authState.pipe(
      first(),
      switchMap((u) => {
        return fromPromise(this.storage.ref('slip').child(u.uid).put(file));
      }),
      switchMap((ut) => {
        return fromPromise(ut.ref.getDownloadURL() as Promise<string>);
      })
    );
  }

}
