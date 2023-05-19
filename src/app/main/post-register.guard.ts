import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ConfigService } from '../core/config/config.service';
import { UserService } from '../core/user/user.service';

@Injectable()
export class PostRegisterGuard  {
  constructor(
    private router: Router,
    private configService: ConfigService,
    private userService: UserService,
    @Inject(LOCALE_ID) private locale_id: string
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.configService
      .getConfigObjectValue<boolean>('allowRegister')
      .pipe(
        first(),
        switchMap(allow => {
          if (allow) {
            return of(true);
          } else {
            return this.userService.getUserObjectSnapshot('profile').pipe(
              first(),
              map(snap => {
                if (snap.payload.exists()) {
                  this.router.navigate(['/main', '3_pay']);
                } else {
                  this.userService.signOut().subscribe();
                  this.router.navigate(['/']);
                  if (this.locale_id === 'th') {
                    alert(
                      'ไม่สามารถเข้าสู่ระบบได้ เนื่องจากหมดเขตรับสมัครแล้ว'
                    );
                  } else {
                    alert(
                      'You are not allowed to register, since the registration period has lapsed.'
                    );
                  }
                }
                return false;
              })
            );
          }
        })
      );
  }
}
