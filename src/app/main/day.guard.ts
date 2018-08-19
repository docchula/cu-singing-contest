import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';

@Injectable()
export class DayGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObjectSnapshot('days').pipe(
      map(days => {
        if (days.payload.exists()) {
          return true;
        } else {
          this.router.navigate(['/main', '3_selectDay']);
          return false;
        }
      })
    );
  }
}
