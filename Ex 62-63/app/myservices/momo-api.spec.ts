import { TestBed } from '@angular/core/testing';

import { MomoApi } from './momo-api';

describe('MomoApi', () => {
  let service: MomoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
