import { TestBed, inject } from '@angular/core/testing';

import { CustomerGroupService } from './customer-group.service';

describe('CustomerGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGroupService]
    });
  });

  it('should be created', inject([CustomerGroupService], (service: CustomerGroupService) => {
    expect(service).toBeTruthy();
  }));
});
