import { TestBed, inject } from '@angular/core/testing';

import { PreferedShopsService } from './preferedShops.service';

describe('PrefredShopsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferedShopsService]
    });
  });

  it('should be created', inject([PreferedShopsService], (service: PreferedShopsService) => {
    expect(service).toBeTruthy();
  }));
});
