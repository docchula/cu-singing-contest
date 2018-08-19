import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../core/user/user.service';


@Injectable()
export class AcceptGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserObjectValue<boolean>('accepted').pipe(
      map((accept) => {
        if (accept) {
          return true;
        } else {
          this.router.navigate(['/main', '1_accept']);
          return false;
        }
      })
    );
  }
}
