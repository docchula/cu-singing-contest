import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';

@Injectable()
export class ConfigService {

  constructor(private afd: AngularFireDatabase) { }

  getConfigObject<T = any>(path: string | null = null): FirebaseObjectObservable<T> {
    if (path) {
      return this.afd.object(this.afd.database.ref('config').child(path));
    } else {
      return this.afd.object('config');
    }
  }

  getConfigList<T = any>(path: string, options: FirebaseListFactoryOpts = {}): FirebaseListObservable<T[]> {
    return this.afd.list(this.afd.database.ref('config').child(path), options);
  }

}
