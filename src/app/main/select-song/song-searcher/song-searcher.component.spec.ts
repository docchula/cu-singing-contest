import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearcherComponent } from './song-searcher.component';

describe('SongSearcherComponent', () => {
  let component: SongSearcherComponent;
  let fixture: ComponentFixture<SongSearcherComponent>;

  beforeEach(async(() => {
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
