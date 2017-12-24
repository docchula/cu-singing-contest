import { AdminService } from '../admin.service';
import { StatusPipe } from '../status.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipCheckComponent } from './slip-check.component';

class MockAdminService { }

describe('SlipCheckComponent', () => {
  let component: SlipCheckComponent;
  let fixture: ComponentFixture<SlipCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlipCheckComponent, StatusPipe ],
      providers: [
        {
          provide: AdminService,
          useClass: MockAdminService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
