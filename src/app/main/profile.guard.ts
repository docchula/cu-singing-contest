import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObjectSnapshot('profile').pipe(
      map(profile => {
        if (profile.payload.exists()) {
          return true;
        } else {
          this.router.navigate(['/main', '2_profile']);
          return false;
        }
      })
    );
  }
}
