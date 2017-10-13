import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantDetailComponent } from './contestant-detail.component';

describe('ContestantDetailComponent', () => {
  let component: ContestantDetailComponent;
  let fixture: ComponentFixture<ContestantDetailComponent>;

  beforeEach(async(() => {
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
