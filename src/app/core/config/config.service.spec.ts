import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {CoreModule} from '../core.module';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [ConfigService]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
