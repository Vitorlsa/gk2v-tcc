import { TestBed } from '@angular/core/testing';

import { CadastroServiceService } from './cadastro-service.service';

describe('CadastroServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroServiceService = TestBed.get(CadastroServiceService);
    expect(service).toBeTruthy();
  });
});
