import { TestBed, inject } from '@angular/core/testing';

import { ProfileGuard } from './profile.guard';
import {UserService} from '../core/user/user.service';
import {of} from 'rxjs';

describe('ProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileGuard, {
        provide: UserService,
        useValue: MockUserService
      }]
    });
  });

  it('should ...', inject([ProfileGuard], (guard: ProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});

class MockUserService {
  getUserObjectSnapshot(key: string) {
    return of({});
  }
}
