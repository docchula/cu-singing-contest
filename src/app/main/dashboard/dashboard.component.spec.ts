import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {CoreModule} from '../../core/core.module';
import {UserService} from '../../core/user/user.service';
import {of} from 'rxjs';
import {SnapshotAction} from '@angular/fire/compat/database/interfaces';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectSnapshot').and.returnValue(of({prevKey: null, key: null, type: null, payload: null}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
