import { TestBed, inject } from '@angular/core/testing';

import { ProcessTransitionService } from './process-transition.service';

describe('ProcessTransitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessTransitionService]
    });
  });

  it('should be created', inject([ProcessTransitionService], (service: ProcessTransitionService) => {
    expect(service).toBeTruthy();
  }));
});
