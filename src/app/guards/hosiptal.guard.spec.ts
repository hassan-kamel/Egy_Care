import { TestBed } from '@angular/core/testing';

import { HosiptalGuard } from './hosiptal.guard';

describe('HosiptalGuard', () => {
  let guard: HosiptalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HosiptalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
