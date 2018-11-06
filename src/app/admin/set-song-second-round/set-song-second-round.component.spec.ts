import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSongSecondRoundComponent } from './set-song-second-round.component';

describe('SetSongSecondRoundComponent', () => {
  let component: SetSongSecondRoundComponent;
  let fixture: ComponentFixture<SetSongSecondRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
