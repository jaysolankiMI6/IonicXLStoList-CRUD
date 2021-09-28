import { TestBed } from '@angular/core/testing';

import { FileCrudService } from './file-crud.service';

describe('FileCrudService', () => {
  let service: FileCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
