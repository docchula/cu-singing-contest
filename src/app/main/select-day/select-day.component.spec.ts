import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectDayComponent } from './select-day.component';
import {CoreModule} from '../../core/core.module';
import {UserService} from '../../core/user/user.service';
import {of} from 'rxjs';
import {ConfigService} from '../../core/config/config.service';

describe('SelectDayComponent', () => {
  let component: SelectDayComponent;
  let fixture: ComponentFixture<SelectDayComponent>;
  let configServiceSpy: jasmine.Spy;
  let userServiceSpy: jasmine.Spy;
  let userServiceSnapshotSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ SelectDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDayComponent);
    component = fixture.componentInstance;
    configServiceSpy = spyOn(fixture.debugElement.injector.get(ConfigService), 'getConfigListValue').and.returnValue(of([]));
    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectValue').and.returnValue(of({}));
    userServiceSnapshotSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectSnapshot').and.returnValue(of({prevKey: null, key: null, type: null, payload: null}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
