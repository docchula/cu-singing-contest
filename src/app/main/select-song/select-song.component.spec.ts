import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectSongComponent } from './select-song.component';

describe('SelectSongComponent', () => {
  let component: SelectSongComponent;
  let fixture: ComponentFixture<SelectSongComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
