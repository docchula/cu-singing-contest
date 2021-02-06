import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongSearcherComponent } from './song-searcher.component';

describe('SongSearcherComponent', () => {
  let component: SongSearcherComponent;
  let fixture: ComponentFixture<SongSearcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SongSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
