import { TestBed, inject } from '@angular/core/testing';

import { CunetService } from './cunet.service';
import {CoreModule} from '../core.module';

describe('CunetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [CunetService]
    });
  });

  it('should be created', inject([CunetService], (service: CunetService) => {
    expect(service).toBeTruthy();
  }));
});
