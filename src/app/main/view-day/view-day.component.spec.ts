import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewDayComponent } from './view-day.component';

describe('ViewDayComponent', () => {
  let component: ViewDayComponent;
  let fixture: ComponentFixture<ViewDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
