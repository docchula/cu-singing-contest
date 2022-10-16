import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDayComponent } from './change-day.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {CoreModule} from '../../core/core.module';

describe('ChangeDayComponent', () => {
  let component: ChangeDayComponent;
  let fixture: ComponentFixture<ChangeDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CoreModule, AdminModule],
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
