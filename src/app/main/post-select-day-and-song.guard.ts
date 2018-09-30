import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ConfigService } from '../core/config/config.service';
import { UserService } from '../core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostSelectDayAndSongGuard implements CanActivate {
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
    return this.configService
      .getConfigObjectValue<boolean>('allowSelectDayAndSong')
      .pipe(
        first(),
        switchMap(allow => {
          if (allow) {
            return of(true);
          } else {
            return this.userService.getUserObjectSnapshot('selectedSong').pipe(
              first(),
              map(snap => {
                if (snap.payload.exists()) {
                  this.router.navigate(['/main', '6_viewDay']);
                } else {
                  this.userService.signOut().subscribe();
                  this.router.navigate(['/']);
                  if (this.locale_id === 'th') {
                    alert(
                      'ไม่สามารถเข้าสู่ระบบได้ เนื่องจากหมดเขตเลือกวันและเพลงแล้ว'
                    );
                  } else {
                    alert(
                      'You are not allowed to register, since the date and song selection period has lapsed.'
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
