import { TestBed, inject } from '@angular/core/testing';

import { FrameworkService } from './framework.service';

describe('FrameworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrameworkService]
    });
  });

  it('should be created', inject([FrameworkService], (service: FrameworkService) => {
    expect(service).toBeTruthy();
  }));
});
