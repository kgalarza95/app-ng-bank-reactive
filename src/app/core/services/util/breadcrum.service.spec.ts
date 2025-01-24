import { TestBed } from '@angular/core/testing';

import { BreadcrumService } from './breadcrum.service';

describe('BreadcrumService', () => {
  let service: BreadcrumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
