import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AdminGuard } from './admin.guard';
import { ConfigService } from './core/config/config.service';
import { UserService } from './core/user/user.service';

function mockUserServiceFactory(uid: string) {
  return {
    authState: of({uid})
  };
}

class MockConfigService {
  getConfigObjectSnapshot(key: string) {
    if (key === 'admins/cusc-mock') {
      return of({
        payload: {
          exists: () => true,
          val: () => 'token'
        }
      });
    } else {
      return of({
        payload: {
          exists: () => false
        }
      });
    }
  }
}

class MockRouter {
  navigate(url: string) { }
}

describe('AdminGuard - with admin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, {
        provide: UserService,
        useValue: mockUserServiceFactory('cusc-mock')
      }, {
        provide: ConfigService,
        useClass: MockConfigService
      }, {
        provide: Router,
        useClass: MockRouter
      }]
    });
  });

  it('should create instance', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should allow admin to load', inject([AdminGuard, Router], (guard: AdminGuard, router: Router) => {
    spyOn(router, 'navigate');
    (guard.canLoad(null) as Observable<boolean>).subscribe((result) => {
      expect(result).toBe(true);
      expect(router.navigate).toHaveBeenCalledTimes(0);
    });
  }));

  it('should allow admin to activate', inject([AdminGuard, Router], (guard: AdminGuard, router: Router) => {
    spyOn(router, 'navigate');
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.params = { token: 'token' };
    (guard.canActivate(activatedRouteSnapshot, null) as Observable<boolean>).subscribe((result) => {
      expect(result).toBe(true);
      expect(router.navigate).toHaveBeenCalledTimes(0);
    });
  }));

  it('should not allow admin with wrong token to activate', inject([AdminGuard, Router], (guard: AdminGuard, router: Router) => {
    spyOn(router, 'navigate');
    const activatedRouteSnapshot = new ActivatedRouteSnapshot();
    activatedRouteSnapshot.params = { token: 'wrongToken' };
    (guard.canActivate(activatedRouteSnapshot, null) as Observable<boolean>).subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  }));
});

describe('AdminGuard - without admin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, {
        provide: UserService,
        useValue: mockUserServiceFactory('not-admin')
      }, {
        provide: ConfigService,
        useClass: MockConfigService
      }, {
        provide: Router,
        useClass: MockRouter
      }]
    });
  });

  it('should not allow ordinary user to load', inject([AdminGuard, Router], (guard: AdminGuard, router: Router) => {
    spyOn(router, 'navigate');
    (guard.canLoad(null) as Observable<boolean>).subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  }));

  it('should not allow ordinary user to activate', inject([AdminGuard, Router], (guard: AdminGuard, router: Router) => {
    spyOn(router, 'navigate');
    (guard.canActivate(null, null) as Observable<boolean>).subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  }));
})
