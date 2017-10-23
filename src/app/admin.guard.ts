import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { first, map, switchMap } from 'rxjs/operators';

import { ConfigService } from './core/config/config.service';
import { UserService } from './core/user/user.service';

@Injectable()
export class AdminGuard implements CanLoad, CanActivate {

  constructor(private userService: UserService, private configService: ConfigService, private router: Router) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.authState.pipe(
      first(),
      switchMap((u) => {
        return this.configService.getConfigObjectSnapshot(`admins/${u.uid}`).pipe(
          map((snapshot) => {
            if (snapshot.payload.exists()) {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          }),
          first()
        );
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.authState.pipe(
      first(),
      switchMap((u) => {
        return this.configService.getConfigObjectSnapshot(`admins/${u.uid}`).pipe(
          map((snapshot) => {
            if (snapshot.payload.exists() && snapshot.payload.val() === route.params['token']) {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          })
        );
      })
    );
  }
}
