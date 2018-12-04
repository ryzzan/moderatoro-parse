import { TestBed, inject } from '@angular/core/testing';

import { StringService } from './string.service';

describe('StringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringService]
    });
  });

  it('should be created', inject([StringService], (service: StringService) => {
    expect(service).toBeTruthy();
  }));
});
