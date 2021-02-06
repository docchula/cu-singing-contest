import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetDayBatchComponent } from './set-day-batch.component';

describe('SetDayBatchComponent', () => {
  let component: SetDayBatchComponent;
  let fixture: ComponentFixture<SetDayBatchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDayBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDayBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
