import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowBoardComponent } from './show-board.component';
import {CoreModule} from '../core/core.module';

describe('ShowBoardComponent', () => {
  let component: ShowBoardComponent;
  let fixture: ComponentFixture<ShowBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ ShowBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
