import { TestBed, inject } from '@angular/core/testing';

import { DestinationTypeService } from './destination-type.service';

describe('DestinationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationTypeService]
    });
  });

  it('should be created', inject([DestinationTypeService], (service: DestinationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
