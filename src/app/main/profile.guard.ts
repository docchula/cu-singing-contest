import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';

@Injectable()
export class ProfileGuard  {
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
