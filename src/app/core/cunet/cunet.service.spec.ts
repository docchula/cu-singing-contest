import { TestBed, inject } from '@angular/core/testing';

import { CunetService } from './cunet.service';

describe('CunetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CunetService]
    });
  });

  it('should be created', inject([CunetService], (service: CunetService) => {
    expect(service).toBeTruthy();
  }));
});
