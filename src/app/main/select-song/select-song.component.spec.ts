import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectSongComponent } from './select-song.component';
import {CoreModule} from '../../core/core.module';
import {UserService} from '../../core/user/user.service';
import {of} from 'rxjs';
import {SharedModule} from '../../shared/shared.module';

describe('SelectSongComponent', () => {
  let component: SelectSongComponent;
  let fixture: ComponentFixture<SelectSongComponent>;
  let userServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule],
      declarations: [ SelectSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSongComponent);
    component = fixture.componentInstance;
    userServiceSpy = spyOn(fixture.debugElement.injector.get(UserService), 'getUserObjectValue').and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
