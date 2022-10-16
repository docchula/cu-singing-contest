import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {CoreModule} from '../../core/core.module';
import {UserService} from '../../core/user/user.service';
import {of} from 'rxjs';
import {ConfigService} from '../../core/config/config.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let configServiceSpy: jasmine.Spy;
  let userServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    configServiceSpy = spyOn(fixture.debugElement.injector.get(ConfigService), 'getConfigListValue').and.returnValue(of([]));
    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectValue').and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
