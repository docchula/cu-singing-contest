import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

interface CunetResult {
  success: boolean;
  token?: string;
}

@Injectable()
export class CunetService {

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string) {
    return this.http.post<CunetResult>(`${environment.functionsBase}/authenticate`, {
      username, password
    });
  }

}
