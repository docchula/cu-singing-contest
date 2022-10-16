import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcceptComponent } from './accept.component';
import {CoreModule} from '../../core/core.module';
import {UserService} from '../../core/user/user.service';
import {of} from 'rxjs';

describe('AcceptComponent', () => {
  let component: AcceptComponent;
  let fixture: ComponentFixture<AcceptComponent>;
  let userServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ AcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptComponent);
    component = fixture.componentInstance;
    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectValue').and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
