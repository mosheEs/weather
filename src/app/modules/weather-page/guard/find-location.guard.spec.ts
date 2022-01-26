import { TestBed } from '@angular/core/testing';

import { FindLocationGuard } from './find-location.guard';

describe('FindLocationGuard', () => {
  let guard: FindLocationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FindLocationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
