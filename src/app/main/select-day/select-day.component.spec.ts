import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDayComponent } from './select-day.component';

describe('SelectDayComponent', () => {
  let component: SelectDayComponent;
  let fixture: ComponentFixture<SelectDayComponent>;

  beforeEach(async(() => {
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
