import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongSearcherComponent } from './song-searcher.component';
import {CoreModule} from '../../../core/core.module';
import {SharedModule} from '../../../shared/shared.module';

describe('SongSearcherComponent', () => {
  let component: SongSearcherComponent;
  let fixture: ComponentFixture<SongSearcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule],
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
