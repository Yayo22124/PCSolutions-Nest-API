import { Test, TestingModule } from '@nestjs/testing';
import { CitasDaoService } from './citas.dao.service';

describe('CitasDaoService', () => {
  let service: CitasDaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitasDaoService],
    }).compile();

    service = module.get<CitasDaoService>(CitasDaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
