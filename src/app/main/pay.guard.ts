import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';

@Injectable()
export class PayGuard  {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObjectValue<boolean>('slipChecked').pipe(
      map(slipChecked => {
        if (slipChecked) {
          return true;
        } else {
          this.router.navigate(['/main', '3_pay']);
          return false;
        }
      })
    );
  }
}
