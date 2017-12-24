import { of } from 'rxjs/observable/of';
import { ConfigService } from '../../core/config/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPagesComponent } from './admin-pages.component';
import { UserService } from '../../core/user/user.service';

const mockUserServiceFactory = (uid: string) => {
  return {
    authState: of({ uid })
  };
};

class MockConfigService {
  getConfigObjectValue(path: string) {
    if (path === 'admins/cusc-mock') {
      return of('token');
    } else {
      return of(null);
    }
  }
}

describe('AdminPagesComponent', () => {
  let component: AdminPagesComponent;
  let fixture: ComponentFixture<AdminPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPagesComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {
          provide: UserService,
          useValue: mockUserServiceFactory('cusc-mock')
        },
        {
          provide: ConfigService,
          useClass: MockConfigService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct token', () => {
    component.token$.subscribe((s) => {
      expect(s).toBe('token');
    });
  });

  it('should have link back to admin page', () => {
    expect(fixture.nativeElement.querySelector('a').href).toMatch(/\/token$/);
  });
});
