import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterCheckComponent } from './register-check.component';
import {CoreModule} from '../../../core/core.module';
import {AdminModule} from '../../admin.module';
import {RouterModule} from '@angular/router';

describe('RegisterCheckComponent', () => {
  let component: RegisterCheckComponent;
  let fixture: ComponentFixture<RegisterCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, CoreModule, RouterModule.forRoot([])],
      declarations: [ RegisterCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
