import { TestBed, inject } from '@angular/core/testing';

import { LiveService } from './live.service';
import {CoreModule} from './core.module';

describe('LiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [LiveService]
    });
  });

  it('should be created', inject([LiveService], (service: LiveService) => {
    expect(service).toBeTruthy();
  }));
});
