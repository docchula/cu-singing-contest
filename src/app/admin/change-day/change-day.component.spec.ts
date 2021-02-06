import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDayComponent } from './change-day.component';

describe('ChangeDayComponent', () => {
  let component: ChangeDayComponent;
  let fixture: ComponentFixture<ChangeDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
