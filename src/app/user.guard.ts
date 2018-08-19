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

import { UserService } from './core/user/user.service';

@Injectable()
export class UserGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLoggedIn();
  }

  isLoggedIn(): Observable<boolean> {
    return this.userService.authState.pipe(
      first(),
      map(u => {
        if (u) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
