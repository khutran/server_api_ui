import { TestBed, inject } from '@angular/core/testing';

import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticService]
    });
  });

  it('should be created', inject([AnalyticService], (service: AnalyticService) => {
    expect(service).toBeTruthy();
  }));
});
