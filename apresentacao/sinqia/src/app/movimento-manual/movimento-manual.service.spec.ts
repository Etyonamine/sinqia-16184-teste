import { TestBed } from '@angular/core/testing';

import { MovimentoManualService } from './movimento-manual.service';

describe('MovimentoManualService', () => {
  let service: MovimentoManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimentoManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
