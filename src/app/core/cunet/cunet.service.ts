import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/functions';

interface CunetResult {
  success: boolean;
  token?: string;
}

@Injectable()
export class CunetService {
  constructor(private http: HttpClient, private fba: FirebaseApp) {}

  getToken(username: string, password: string) {
    const fn = this.fba.functions().httpsCallable('authenticate');
    return from(fn({ username, password })).pipe(map(r => r.data as CunetResult));
  }
}
