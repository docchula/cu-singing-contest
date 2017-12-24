import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoardComponent } from './show-board.component';

describe('ShowBoardComponent', () => {
  let component: ShowBoardComponent;
  let fixture: ComponentFixture<ShowBoardComponent>;

  beforeEach(async(() => {
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
