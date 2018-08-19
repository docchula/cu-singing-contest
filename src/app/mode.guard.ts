import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { ConfigService } from './core/config/config.service';

@Injectable()
export class ModeGuard implements CanActivate, CanLoad {
  constructor(private configService: ConfigService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.modeGuard();
  }

  modeGuard() {
    return this.configService
      .getConfigObjectValue<'register' | 'post-register' | 'pre-register'>(
        environment.modeKey
      )
      .pipe(
        first(),
        map(v => {
          switch (v) {
            case 'register':
            case 'post-register':
              return true;
            case 'pre-register':
            default:
              this.router.navigate(['/']);
              return false;
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.modeGuard();
  }
}
