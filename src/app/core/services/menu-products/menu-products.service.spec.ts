import { TestBed } from '@angular/core/testing';

import { MenuProductsService } from './menu-products.service';

describe('MenuProductsService', () => {
  let service: MenuProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
