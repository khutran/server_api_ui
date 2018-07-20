import { TestBed, inject } from '@angular/core/testing';

import { ProcessStatusService } from './process-status.service';

describe('ProcessStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessStatusService]
    });
  });

  it('should be created', inject([ProcessStatusService], (service: ProcessStatusService) => {
    expect(service).toBeTruthy();
  }));
});
