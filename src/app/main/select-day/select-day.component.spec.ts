import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectDayComponent } from './select-day.component';

describe('SelectDayComponent', () => {
  let component: SelectDayComponent;
  let fixture: ComponentFixture<SelectDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
