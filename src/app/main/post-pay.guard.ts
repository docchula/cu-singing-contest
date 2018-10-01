import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { ConfigService } from '../core/config/config.service';
import { first, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostPayGuard implements CanActivate {
  constructor(
    @Inject(LOCALE_ID) private locale_id: string,
    private router: Router,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.configService.getConfigObjectValue<boolean>('allowPay').pipe(
      first(),
      switchMap(allow => {
        if (allow) {
          return of(true);
        } else {
          return this.userService.getUserObjectSnapshot('slipUrl').pipe(
            first(),
            map(snap => {
              if (snap.payload.exists()) {
                this.router.navigate(['/main', '4_selectDay']);
              } else {
                this.userService.signOut().subscribe();
                this.router.navigate(['/']);
                if (this.locale_id === 'th') {
                  alert(
                    'ไม่สามารถเข้าสู่ระบบได้ เนื่องจากหมดเขตชำระค่าสมัครแล้ว'
                  );
                } else {
                  alert(
                    'You are not allowed to register, since the payment period has lapsed.'
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
