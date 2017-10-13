import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../core/user/user.service';

@Injectable()
export class PayGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.userService.getUserObject('slipChecked').map((v) => v.$value).map((slipChecked) => {
        if (slipChecked) {
          return true;
        } else {
          this.router.navigate(['/main', '4_pay']);
          return false;
        }
      });
    }
}
