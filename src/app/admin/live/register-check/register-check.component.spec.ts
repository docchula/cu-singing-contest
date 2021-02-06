import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterCheckComponent } from './register-check.component';

describe('RegisterCheckComponent', () => {
  let component: RegisterCheckComponent;
  let fixture: ComponentFixture<RegisterCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
