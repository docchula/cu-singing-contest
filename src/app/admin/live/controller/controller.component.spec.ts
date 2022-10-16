import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ControllerComponent } from './controller.component';
import {CoreModule} from '../../../core/core.module';
import {ConfigService} from '../../../core/config/config.service';
import {DebugElement} from '@angular/core';
import {of} from 'rxjs';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let fixture: ComponentFixture<ControllerComponent>;
  let configService: ConfigService;
  let configServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ ControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerComponent);
    component = fixture.componentInstance;

    configService = fixture.debugElement.injector.get(ConfigService);
    configServiceSpy = spyOn(configService, 'getConfigObjectValue').and.returnValue(of(1));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
