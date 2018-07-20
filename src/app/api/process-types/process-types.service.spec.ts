import { TestBed, inject } from '@angular/core/testing';

import { ProcessTypesService } from './process-types.service';

describe('ProcessTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessTypesService]
    });
  });

  it('should be created', inject([ProcessTypesService], (service: ProcessTypesService) => {
    expect(service).toBeTruthy();
  }));
});
