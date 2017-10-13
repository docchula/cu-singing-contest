import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../core/user/user.service';

@Injectable()
export class AcceptGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObject('accepted').map((v) => v.$value).map((accept) => {
      if (accept) {
        return true;
      } else {
        this.router.navigate(['/main', '1_accept']);
        return false;
      }
    });
  }
}
