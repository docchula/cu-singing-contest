import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowBoardComponent } from './show-board.component';

describe('ShowBoardComponent', () => {
  let component: ShowBoardComponent;
  let fixture: ComponentFixture<ShowBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
