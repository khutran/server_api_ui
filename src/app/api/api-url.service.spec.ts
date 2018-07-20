import { TestBed, inject } from '@angular/core/testing';

import { ApiUrl } from './api-url.service';

describe('ApiUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrl]
    });
  });

  it('should be created', inject([ApiUrl], (service: ApiUrl) => {
    expect(service).toBeTruthy();
  }));
});
