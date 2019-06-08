import { TestBed } from '@angular/core/testing';

import { ColorBlindService } from './color-blind.service';

describe('ColorBlindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorBlindService = TestBed.get(ColorBlindService);
    expect(service).toBeTruthy();
  });
});
