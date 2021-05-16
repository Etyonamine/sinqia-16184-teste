import { TestBed } from '@angular/core/testing';

import { MsgAlertService } from './msg-alert.service';

describe('MsgAlertService', () => {
  let service: MsgAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
