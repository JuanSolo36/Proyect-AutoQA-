import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { uriDecoderGuard } from './uri-decoder.guard';

describe('uriDecoderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => uriDecoderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
