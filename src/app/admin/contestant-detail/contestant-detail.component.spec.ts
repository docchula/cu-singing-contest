import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContestantDetailComponent } from './contestant-detail.component';

describe('ContestantDetailComponent', () => {
  let component: ContestantDetailComponent;
  let fixture: ComponentFixture<ContestantDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
