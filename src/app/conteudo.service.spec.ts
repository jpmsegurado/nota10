import { TestBed, inject } from '@angular/core/testing';

import { ConteudoService } from './conteudo.service';

describe('ConteudoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConteudoService]
    });
  });

  it('should be created', inject([ConteudoService], (service: ConteudoService) => {
    expect(service).toBeTruthy();
  }));
});
