import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContestantListComponent } from './contestant-list.component';
import {AdminModule} from '../admin.module';
import {CoreModule} from '../../core/core.module';

describe('ContestantListComponent', () => {
  let component: ContestantListComponent;
  let fixture: ComponentFixture<ContestantListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, CoreModule],
      declarations: [ ContestantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
