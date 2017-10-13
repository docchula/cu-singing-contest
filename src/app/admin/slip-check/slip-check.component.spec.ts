import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipCheckComponent } from './slip-check.component';

describe('SlipCheckComponent', () => {
  let component: SlipCheckComponent;
  let fixture: ComponentFixture<SlipCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlipCheckComponent ]
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
