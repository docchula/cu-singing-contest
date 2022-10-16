import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SetDayBatchComponent } from './set-day-batch.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {CoreModule} from '../../core/core.module';

describe('SetDayBatchComponent', () => {
  let component: SetDayBatchComponent;
  let fixture: ComponentFixture<SetDayBatchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminModule, CoreModule],
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
