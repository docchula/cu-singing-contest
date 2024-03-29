import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
  QueryFn
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
  constructor(private afd: AngularFireDatabase) {}

  _getConfigObject<T = any>(path: string | null = null): AngularFireObject<T> {
    if (path) {
      return this.afd.object<T>(this.afd.database.ref('config').child(path));
    } else {
      return this.afd.object<T>('config');
    }
  }

  getConfigObjectValue<T = any>(path: string | null = null) {
    return this._getConfigObject<T>(path).valueChanges();
  }

  getConfigObjectSnapshot<T = any>(path: string | null = null) {
    return this._getConfigObject<T>(path).snapshotChanges();
  }

  _getConfigList<T = any>(
    path: string,
    queryFn: QueryFn = ref => ref
  ): AngularFireList<T> {
    return this.afd.list<T>(
      this.afd.database.ref('config').child(path),
      queryFn
    );
  }

  getConfigListValue<T = any>(
    path: string,
    queryFn: QueryFn = ref => ref
  ): Observable<T[]> {
    return this._getConfigList<T>(path, queryFn).valueChanges();
  }

  getConfigListSnapshot<T = any>(path: string, queryFn: QueryFn = ref => ref) {
    return this._getConfigList(path, queryFn).snapshotChanges();
  }
}
