import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SongCheckComponent } from './song-check.component';
import {AdminModule} from '../admin.module';
import {CoreModule} from '../../core/core.module';
import {ConfigService} from '../../core/config/config.service';
import {of} from 'rxjs';

describe('SongCheckComponent', () => {
  let component: SongCheckComponent;
  let fixture: ComponentFixture<SongCheckComponent>;
  let configService: ConfigService;
  let configServiceSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, CoreModule],
      declarations: [ SongCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongCheckComponent);
    component = fixture.componentInstance;

    configService = fixture.debugElement.injector.get(ConfigService);
    configServiceSpy = spyOn(configService, 'getConfigObjectValue').and.returnValue(of(1));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
