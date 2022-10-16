import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewDayComponent } from './view-day.component';
import {CoreModule} from '../../core/core.module';
import {ConfigService} from '../../core/config/config.service';
import {of} from 'rxjs';
import {UserService} from '../../core/user/user.service';

describe('ViewDayComponent', () => {
  let component: ViewDayComponent;
  let fixture: ComponentFixture<ViewDayComponent>;
  let userServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ ViewDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDayComponent);
    component = fixture.componentInstance;

    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectValue').and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
