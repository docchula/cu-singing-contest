import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

interface CunetResult {
  success: boolean;
  token?: string;
}

@Injectable()
export class CunetService {
  constructor(private fns: AngularFireFunctions) {}

  getTokenFromTicket(ticket: string) {
    const fn = this.fns.httpsCallable('chulaSso');
    return from(fn({ ticket })).pipe(map(r => r.data as CunetResult));
  }
}
