import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongCheckComponent } from './song-check.component';

describe('SongCheckComponent', () => {
  let component: SongCheckComponent;
  let fixture: ComponentFixture<SongCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SongCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
