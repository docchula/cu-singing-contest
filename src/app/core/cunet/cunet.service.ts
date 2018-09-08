import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
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

  getTokenFromTicket(ticket: string) {
    const fn = this.fba.functions().httpsCallable('chulaSso');
    return from(fn({ ticket })).pipe(map(r => r.data as CunetResult));
  }
}
