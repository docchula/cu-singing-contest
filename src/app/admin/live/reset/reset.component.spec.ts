import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CoreModule],
      declarations: [ ResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
