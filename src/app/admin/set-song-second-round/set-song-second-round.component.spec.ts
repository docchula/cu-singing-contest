import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetSongSecondRoundComponent } from './set-song-second-round.component';
import {AdminModule} from '../admin.module';
import {CoreModule} from '../../core/core.module';

describe('SetSongSecondRoundComponent', () => {
  let component: SetSongSecondRoundComponent;
  let fixture: ComponentFixture<SetSongSecondRoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, CoreModule],
      declarations: [ SetSongSecondRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSongSecondRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
