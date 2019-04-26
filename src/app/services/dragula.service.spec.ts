import { TestBed } from '@angular/core/testing';

import { DragulaService } from './dragula.service';

describe('DragulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragulaService = TestBed.get(DragulaService);
    expect(service).toBeTruthy();
  });
});
