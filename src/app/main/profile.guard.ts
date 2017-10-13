import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../core/user/user.service';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObject('profile').map((profile) => {
      if (profile.$exists()) {
        return true;
      } else {
        this.router.navigate(['/main', '2_profile']);
        return false;
      }
    });
  }
}
